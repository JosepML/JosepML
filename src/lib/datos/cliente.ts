// Lectura de la base de datos para la web pública. Solo en el servidor.
//
// - Cliente de Supabase con la clave pública y SIN sesión: la web pública ve exactamente lo que ve un
//   visitante (la RLS ya filtra lo publicado). El panel usará su propio cliente con la sesión de Josep.
// - Cada tabla se lee entera una vez (son tablas pequeñas) y se guarda en la caché de Next con dos
//   etiquetas: «contenido» (todo) y «tabla:<nombre>». Al publicar, revalidarContenido() las invalida.
//   Como red de seguridad, la caché caduca sola cada REVALIDAR segundos (por si se edita a mano en Supabase).
// - JM_DATOS_PRUEBA=<archivo.json> lee de un archivo en vez de Supabase ({ "tabla": [filas...] }). Sirve
//   para probar en un entorno sin acceso a supabase.co (el contenedor de Claude en la nube). Nunca en producción.

import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { readFile } from "node:fs/promises";
import type { Database } from "@/lib/supabase/tipos";

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

/** Todas las filas visibles para el público de una tabla, con caché. */
export function filas<T extends NombreTabla>(tabla: T): Promise<Fila<T>[]> {
  return unstable_cache(() => leer(tabla), ["filas", tabla], {
    tags: [ETIQUETA_CONTENIDO, etiquetaTabla(tabla)],
    revalidate: REVALIDAR,
  })();
}

/** URL pública de un archivo del bucket `medios` */
export function urlBucket(ruta: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medios/${ruta.split("/").map(encodeURIComponent).join("/")}`;
}
