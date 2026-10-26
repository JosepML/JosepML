"use client";

// Página JUNO Media desde el panel: todas sus secciones (fotos, textos y qué proyectos salen y en qué orden) en un
// solo sitio, sin pasar por «Editar página». Escribe en el mismo borrador que ese modo, así que lo uno se ve en lo otro,
// y nada llega a la web hasta Publicar.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Campos, ProveedorOpciones } from "@/components/admin/campos/Campos";
import { ProveedorMedios } from "@/components/admin/campos/medios";
import { uuidsEn, type Campo, type Opcion } from "@/components/admin/campos/tipos";
import { useDialogos } from "@/components/admin/Dialogos";
import { textoGuardado, useAutoguardado } from "@/components/admin/useAutoguardado";
import { CATALOGO } from "@/components/edicion/catalogo";
import { Icono } from "@/components/Iconos";
import { descartar, publicar, type ParaEditar } from "@/lib/admin/contenido";
import type { TipoBloque } from "@/lib/datos/tipos";

type BloqueEditable = { id: string; tipo: TipoBloque; visible: boolean; datos: Record<string, unknown> };
type Datos = Record<string, unknown>;

const json = (x: unknown) => JSON.stringify(x);

/** Nombre y ayuda de cada sección de la página, según su tipo (y su parte, en la colaboración) */
function infoSeccion(b: BloqueEditable): { nombre: string; ayuda: string } {
  if (b.tipo === "colaboracion") {
    switch (b.datos.parte) {
      case "relacion":
        return { nombre: "Lo que nos une", ayuda: "Las tres facetas, cada una con su texto y su foto." };
      case "valor":
        return { nombre: "Para tu proyecto", ayuda: "La foto grande y las dos formas de trabajar juntos." };
      case "productora":
        return { nombre: "La productora", ayuda: "Su marca, su lema y su web. Las marcas son los clientes marcados «con JUNO Media», en Clientes." };
      default:
        return { nombre: "Apertura", ayuda: "El titular y las tres fotos de arriba. Sin fotos elegidas, salen las portadas de proyectos hechos con JUNO Media." };
    }
  }
  if (b.tipo === "trabajos") return { nombre: "Proyectos hechos juntos", ayuda: "Elige qué proyectos salen y en qué orden: el primero sale en grande. Si no eliges ninguno, salen los marcados «Hecho con JUNO Media»." };
  return { nombre: CATALOGO[b.tipo]?.nombre ?? b.tipo, ayuda: CATALOGO[b.tipo]?.descripcion ?? "" };
}

/** Campos de cada sección; en los proyectos, solo lo que se decide aquí (no el origen ni los tipos) */
function camposDe(b: BloqueEditable): Campo[] {
  if (b.tipo === "trabajos") {
    const todos = CATALOGO.trabajos.campos;
    return todos.filter((c) => ["antetitulo", "titulo", "proyectos"].includes(c.clave)).map((c) => (c.clave === "proyectos" ? { ...c, etiqueta: "Proyectos que salen", ayuda: undefined } : c));
  }
  return (CATALOGO[b.tipo]?.campos ?? []).filter((c) => c.tipo !== "nota");
}

const GOOGLE: Campo[] = [
  { tipo: "texto", clave: "titulo", etiqueta: "Nombre de la página", ayuda: "El que sale en la pestaña del navegador si no hay título para Google" },
  { tipo: "texto", clave: "seo_titulo", etiqueta: "Título en Google", ayuda: "Unos 60 caracteres" },
  { tipo: "largo", clave: "seo_descripcion", etiqueta: "Descripción en Google", filas: 3, ayuda: "Unos 155 caracteres: qué va a encontrar quien entre" },
];

const CLAVES_PAGINA = ["titulo", "seo_titulo", "seo_descripcion"] as const;

export function EditorJuno({ id, slug, ruta, inicial, proyectos }: { id: string; slug: string; ruta: string; inicial: ParaEditar; proyectos: Opcion[] }) {
  const router = useRouter();
  const { confirmar, avisar } = useDialogos();
  const filaPublicada = useMemo(() => Object.fromEntries(CLAVES_PAGINA.map((k) => [k, String(inicial.fila[k] ?? "")])), [inicial.fila]);
  const [publicados, setPublicados] = useState(() => ({ bloques: (inicial.extras.bloques as BloqueEditable[]) ?? [], pagina: filaPublicada }));
  const [bloques, setBloques] = useState<BloqueEditable[]>(() => (inicial.borrador?.bloques as BloqueEditable[] | undefined) ?? publicados.bloques);
  const [pagina, setPagina] = useState<Datos>(() => ({ ...filaPublicada, ...Object.fromEntries(CLAVES_PAGINA.filter((k) => inicial.borrador && k in inicial.borrador).map((k) => [k, inicial.borrador![k]])) }));
  const [publicando, setPublicando] = useState(false);
  const [cambiosIniciales, setCambiosIniciales] = useState<Record<string, unknown>>(() => inicial.borrador ?? {});

  const cambios = useMemo(() => {
    const c: Record<string, unknown> = {};
    if (json(bloques) !== json(publicados.bloques)) c.bloques = bloques;
    for (const k of CLAVES_PAGINA) if (pagina[k] !== publicados.pagina[k]) c[k] = pagina[k];
    return c;
  }, [bloques, pagina, publicados]);
  const guardado = useAutoguardado("paginas", id, cambios, cambiosIniciales);
  const hayCambios = Object.keys(cambios).length > 0;

  const cambiarBloque = (bid: string, clave: string, valor: unknown) =>
    setBloques((l) => l.map((b) => (b.id === bid ? { ...b, datos: { ...b.datos, [clave]: valor } } : b)));
  const ids = useMemo(() => [...uuidsEn(bloques)], [bloques]);

  const alPublicar = async () => {
    setPublicando(true);
    if (await guardado.guardarYa()) {
      const r = await publicar("paginas", id);
      if (r.ok) {
        avisar("Publicado. Ya se ve en la web.");
        setPublicados({ bloques, pagina: { ...publicados.pagina, ...Object.fromEntries(CLAVES_PAGINA.map((k) => [k, String(pagina[k] ?? "")])) } });
        setCambiosIniciales({});
        router.refresh();
      } else avisar(r.error, "error");
    }
    setPublicando(false);
  };

  const alDescartar = async () => {
    if (!(await confirmar({ titulo: "¿Descartar los cambios?", texto: "La página vuelve a ser la que se ve en la web.", aceptar: "Descartar", peligro: true }))) return;
    await guardado.guardarYa();
    const r = await descartar("paginas", id);
    if (!r.ok) return avisar(r.error, "error");
    setBloques(publicados.bloques);
    setPagina(publicados.pagina);
    setCambiosIniciales({});
    avisar("Cambios descartados");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="sticky top-16 z-30 -mx-2 mb-6 lg:top-4">
        <div className="cristal cristal-fuerte flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[28px] px-5 py-3.5">
          <Link href="/admin/paginas" className="boton-icono -ml-2" aria-label="Volver a Páginas" title="Volver a Páginas">
            <Icono nombre="izquierda" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-xl">{String(publicados.pagina.titulo || slug)}</h1>
            <p className={`text-xs ${guardado.estado === "error" ? "text-[#ff6b6b]" : "text-[var(--jm-tenue)]"}`} aria-live="polite">
              {textoGuardado(guardado.estado, hayCambios, guardado.error)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <a href={`/admin/vista-previa?ruta=${encodeURIComponent(ruta)}`} target="_blank" rel="noreferrer" className="boton boton-suave px-4 py-2 text-sm" title="Abre la página con tus cambios sin publicar">
              <Icono nombre="ojo" className="h-4 w-4" />
              Vista previa
            </a>
            {hayCambios && (
              <button type="button" onClick={alDescartar} className="boton px-4 py-2 text-sm text-[var(--jm-suave)] hover:bg-[var(--jm-cristal)]">
                Descartar
              </button>
            )}
            <button type="button" onClick={alPublicar} disabled={publicando || !hayCambios} className="boton boton-acento px-5 py-2 text-sm disabled:opacity-40">
              {publicando ? "Publicando…" : "Publicar cambios"}
            </button>
          </div>
        </div>
      </div>

      <p className="max-w-xl text-[var(--jm-suave)]">
        Todo lo de la página de JUNO Media en un solo sitio: las fotos, los textos y qué proyectos salen y en qué orden. Los cambios se guardan solos y llegan a la web al pulsar «Publicar cambios».
      </p>

      <ProveedorMedios ids={ids}>
        <ProveedorOpciones opciones={{ proyectos }}>
          {bloques.map((b) => {
            const info = infoSeccion(b);
            return (
              <section key={b.id} className="cristal mt-6 rounded-[32px] p-5 sm:p-8">
                <h2 className="text-lg font-extrabold tracking-tight">{info.nombre}</h2>
                {info.ayuda && <p className="mt-1 max-w-xl text-sm text-[var(--jm-suave)]">{info.ayuda}</p>}
                <div className="mt-6">
                  <Campos campos={camposDe(b)} datos={b.datos} cambiar={(clave, valor) => cambiarBloque(b.id, clave, valor)} />
                </div>
              </section>
            );
          })}
        </ProveedorOpciones>
      </ProveedorMedios>

      <section className="cristal mt-4 rounded-[32px] p-5 sm:p-8">
        <h2 className="text-lg font-extrabold tracking-tight">Google</h2>
        <div className="mt-6">
          <Campos campos={GOOGLE} datos={pagina} cambiar={(clave, valor) => setPagina((p) => ({ ...p, [clave]: valor }))} />
        </div>
      </section>
    </div>
  );
}
