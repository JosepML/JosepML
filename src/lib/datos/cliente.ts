// Lectura de la base de datos para la web pública. Solo en el servidor.
//
// - Cliente de Supabase con la clave pública y SIN sesión: la web pública ve exactamente lo que ve un
//   visitante (la RLS ya filtra lo publicado). El panel usará su propio cliente con la sesión de Josep.
// - Cada tabla se lee entera una vez (son tablas pequeñas) y se guarda en la caché de Next con dos
//   etiquetas: «contenido» (todo) y «tabla:<nombre>». Al publicar, revalidarContenido() las invalida.
//   Como red de seguridad, la caché caduca sola cada REVALIDAR segundos (por si se edita a mano en Supabase).
// - JM_DATOS_PRUEBA=<archivo.json> lee de un archivo en vez de Supabase ({ "tabla": [filas...] }). Sirve
//   para probar en un entorno sin acceso a supabase.co (el contenedor de Claude en la nube). Nunca en producción.
// - Vista previa (draftMode de Next, la activa Josep desde el panel o el editor): sin caché, con su sesión, y con
//   los borradores aplicados encima de lo publicado. Así ve la web entera tal como quedará al publicar.

import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { readFile } from "node:fs/promises";
import { cache } from "react";
import { esAdmin } from "@/lib/admin/sesion";
import { createClient as clienteConSesion } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/tipos";
export { urlBucket } from "./url";

export type NombreTabla = keyof Database["public"]["Tables"];
export type Fila<T extends NombreTabla> = Database["public"]["Tables"][T]["Row"];

/** Etiqueta de caché de todo el contenido */
export const ETIQUETA_CONTENIDO = "contenido";
/** Etiqueta de caché de una tabla */
export const etiquetaTabla = (tabla: NombreTabla) => `tabla:${tabla}`;

/** Segundos que dura la caché si nadie la invalida antes */
export const REVALIDAR = 60;

// Tablas con borrador y publicado: la RLS ya lo filtra, pero se pide explícitamente para que el resultado
// no dependa de quién lea (y para que el archivo de prueba se comporte igual)
const CON_ESTADO = new Set<NombreTabla>(["servicios", "proyectos", "articulos", "paginas", "clientes", "opiniones", "canales"]);

let supabase: ReturnType<typeof createClient<Database>> | null = null;

function cliente() {
  supabase ??= createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabase;
}

async function leer<T extends NombreTabla>(tabla: T): Promise<Fila<T>[]> {
  const prueba = process.env.JM_DATOS_PRUEBA;
  if (prueba) {
    const todo = JSON.parse(await readFile(prueba, "utf8")) as Record<string, Record<string, unknown>[]>;
    const lista = todo[tabla] ?? [];
    return (CON_ESTADO.has(tabla) ? lista.filter((f) => f.estado === "publicado") : lista) as Fila<T>[];
  }
  const consulta = cliente().from(tabla).select("*");
  const { data, error } = await (CON_ESTADO.has(tabla) ? consulta.eq("estado" as never, "publicado" as never) : consulta);
  // Un error no se guarda en caché: la próxima visita lo vuelve a intentar
  if (error) throw new Error(`No se pudo leer «${tabla}» de la base de datos: ${error.message}`);
  return (data ?? []) as unknown as Fila<T>[];
}

/** Todas las filas visibles para el público de una tabla, con caché. En vista previa, con los borradores encima. */
export async function filas<T extends NombreTabla>(tabla: T): Promise<Fila<T>[]> {
  if (await enVistaPrevia()) return (await leerVistaPrevia(tabla)) as Fila<T>[];
  return unstable_cache(() => leer(tabla), ["filas", tabla], {
    tags: [ETIQUETA_CONTENIDO, etiquetaTabla(tabla)],
    revalidate: REVALIDAR,
  })();
}

// ---- Vista previa ---------------------------------------------------------------------------------

/** Vista previa activada y quien mira es el administrador (si la cookie se queda sin sesión, se ve lo publicado) */
export const enVistaPrevia = cache(async () => {
  try {
    if (!(await draftMode()).isEnabled) return false;
  } catch {
    return false; // fuera de una petición (compilación)
  }
  return esAdmin();
});

type Generica = Record<string, unknown> & { id?: string };

/** Lectura de una tabla con la sesión de Josep, una vez por petición */
const leerConSesion = cache(async (tabla: NombreTabla): Promise<Generica[]> => {
  const supabase = await clienteConSesion();
  const { data, error } = await supabase.from(tabla).select("*");
  if (error) throw new Error(`No se pudo leer «${tabla}» para la vista previa: ${error.message}`);
  return (data ?? []) as unknown as Generica[];
});

const borradores = cache(async () => {
  const lista = (await leerConSesion("borradores")) as { tabla: string; fila_id: string; datos: Generica }[];
  return new Map(lista.map((b) => [`${b.tabla}:${b.fila_id}`, b.datos]));
});

/** Claves del borrador que no son columnas de la fila (viajan aparte) */
const EXTRAS = new Set(["servicios", "bloques"]);

async function leerVistaPrevia(tabla: NombreTabla): Promise<Generica[]> {
  const [filasTabla, cambios] = await Promise.all([leerConSesion(tabla), borradores()]);

  if (CON_ESTADO.has(tabla)) {
    return filasTabla
      // Lo oculto (se publicó y luego se ocultó) sigue oculto; lo nuevo que aún no se ha publicado, sí se ve
      .filter((f) => f.estado === "publicado" || f.publicado_en == null)
      .map((f) => {
        const b = cambios.get(`${tabla}:${f.id}`);
        if (!b) return f;
        return { ...f, ...Object.fromEntries(Object.entries(b).filter(([k]) => !EXTRAS.has(k))), estado: "publicado" };
      });
  }

  // Bloques de las páginas con borrador: la lista del borrador sustituye a la publicada
  if (tabla === "bloques") {
    const sustituidas = new Map<string, Generica[]>();
    for (const [clave, datos] of cambios) {
      if (!clave.startsWith("paginas:") || !Array.isArray(datos.bloques)) continue;
      const pagina = clave.slice(8);
      sustituidas.set(
        pagina,
        (datos.bloques as Generica[]).map((b, i) => ({ id: b.id, pagina_id: pagina, orden: i, tipo: b.tipo, visible: b.visible ?? true, datos: b.datos ?? {} })),
      );
    }
    return [...filasTabla.filter((b) => !sustituidas.has(String(b.pagina_id))), ...[...sustituidas.values()].flat()];
  }

  // Servicios de los proyectos con borrador: los del borrador (los que ya estaban conservan orden y destacado)
  if (tabla === "proyecto_servicios") {
    let resultado = filasTabla;
    for (const [clave, datos] of cambios) {
      if (!clave.startsWith("proyectos:") || !Array.isArray(datos.servicios)) continue;
      const proyecto = clave.slice(10);
      const ids = datos.servicios as string[];
      const actuales = resultado.filter((e) => e.proyecto_id === proyecto);
      resultado = [
        ...resultado.filter((e) => e.proyecto_id !== proyecto),
        ...ids.map((s) => actuales.find((e) => e.servicio_id === s) ?? { proyecto_id: proyecto, servicio_id: s, orden: 999, destacado: false }),
      ];
    }
    return resultado;
  }

  return filasTabla;
}
