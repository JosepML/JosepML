"use client";

// Orden de las secciones de una página de bloques (Inicio, Sobre mí) desde el panel: arrastrar, subir, bajar y
// ocultar. Escribe en el mismo borrador que el modo «Editar página» (la lista entera de bloques, en orden), así
// que lo que se mueve aquí se ve allí y al revés, y nada llega a la web hasta Publicar.

import { Reorder, useDragControls } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useDialogos } from "@/components/admin/Dialogos";
import { Insignia } from "@/components/admin/ListaContenido";
import { textoGuardado, useAutoguardado } from "@/components/admin/useAutoguardado";
import { CATALOGO } from "@/components/edicion/catalogo";
import { Icono } from "@/components/Iconos";
import { descartar, publicar, type ParaEditar } from "@/lib/admin/contenido";
import type { TipoBloque } from "@/lib/datos/tipos";

type BloqueEditable = { id: string; tipo: TipoBloque; visible: boolean; datos: Record<string, unknown> };

const json = (x: unknown) => JSON.stringify(x);

/** El título de la sección tal como se lee (sin los asteriscos que marcan la palabra de acento) */
function tituloDe(b: BloqueEditable) {
  const t = typeof b.datos.titulo === "string" ? b.datos.titulo : "";
  return t.replace(/\*/g, "").trim();
}

export function OrdenSecciones({ id, titulo, ruta, inicial }: { id: string; titulo: string; ruta: string; inicial: ParaEditar }) {
  const router = useRouter();
  const { confirmar, avisar } = useDialogos();
  const [publicados, setPublicados] = useState(() => (inicial.extras.bloques as BloqueEditable[]) ?? []);
  // Lo demás que lleve el borrador (textos de la página, título, SEO) se respeta tal cual
  const [otros, setOtros] = useState(() => Object.fromEntries(Object.entries(inicial.borrador ?? {}).filter(([k]) => k !== "bloques")));
  const [bloques, setBloques] = useState<BloqueEditable[]>(() => (inicial.borrador?.bloques as BloqueEditable[] | undefined) ?? publicados);
  const [publicando, setPublicando] = useState(false);

  const cambios = useMemo(() => (json(bloques) === json(publicados) ? { ...otros } : { ...otros, bloques }), [bloques, otros, publicados]);
  const [cambiosIniciales, setCambiosIniciales] = useState<Record<string, unknown>>(() => inicial.borrador ?? {});
  const guardado = useAutoguardado("paginas", id, cambios, cambiosIniciales);
  const hayCambios = Object.keys(cambios).length > 0;

  // Cambios hechos en la web que no son de orden ni de ocultar: al publicar salen también
  const porId = new Map(publicados.map((b) => [b.id, b]));
  const otrosCambios = Object.keys(otros).length > 0 || bloques.some((b) => !porId.has(b.id) || json(porId.get(b.id)!.datos) !== json(b.datos)) || publicados.some((b) => !bloques.some((x) => x.id === b.id));

  const mover = (i: number, paso: number) => {
    const j = i + paso;
    if (j < 0 || j >= bloques.length) return;
    const lista = [...bloques];
    [lista[i], lista[j]] = [lista[j], lista[i]];
    setBloques(lista);
  };
  const alternar = (bid: string) => setBloques((l) => l.map((b) => (b.id === bid ? { ...b, visible: !b.visible } : b)));

  const alPublicar = async () => {
    setPublicando(true);
    if (await guardado.guardarYa()) {
      const r = await publicar("paginas", id);
      if (r.ok) {
        avisar("Publicado. Ya se ve en la web.");
        setPublicados(bloques);
        setOtros({});
        setCambiosIniciales({});
        router.refresh();
      } else avisar(r.error, "error");
    }
    setPublicando(false);
  };

  const alDescartar = async () => {
    const si = await confirmar({
      titulo: "¿Descartar los cambios?",
      texto: otrosCambios
        ? "La página vuelve a ser la que se ve en la web, también los cambios de textos o fotos que hiciste en ella sin publicar."
        : "Las secciones vuelven al orden que se ve en la web.",
      aceptar: "Descartar",
      peligro: true,
    });
    if (!si) return;
    await guardado.guardarYa();
    const r = await descartar("paginas", id);
    if (!r.ok) return avisar(r.error, "error");
    setOtros({});
    setCambiosIniciales({});
    setBloques(publicados);
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
            <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-xl">Secciones de {titulo}</h1>
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
        Arrastra las secciones para cambiar el orden en que salen en la página, o usa las flechas. El ojo la oculta sin borrarla. Nada cambia en la web hasta que pulsas Publicar.
      </p>
      {otrosCambios && (
        <p className="mt-4 rounded-[20px] bg-[var(--jm-calido)]/10 px-4 py-3 text-sm text-[var(--jm-calido)]">
          Esta página tiene además cambios de textos o fotos hechos en la web sin publicar. Al publicar aquí, salen también.
        </p>
      )}

      <Reorder.Group axis="y" values={bloques} onReorder={setBloques} className="mt-6 flex flex-col gap-2">
        {bloques.map((b, i) => (
          <Fila key={b.id} b={b} n={i + 1} nueva={!porId.has(b.id)} primera={i === 0} ultima={i === bloques.length - 1} alSubir={() => mover(i, -1)} alBajar={() => mover(i, 1)} alVisible={() => alternar(b.id)} />
        ))}
      </Reorder.Group>

      <p className="mt-6 text-sm text-[var(--jm-tenue)]">
        Para cambiar textos, fotos o añadir secciones,{" "}
        <Link href={`${ruta}?editar=1`} className="font-semibold text-[var(--jm-texto)] underline-offset-4 hover:underline">
          edita la página en la web
        </Link>
        .
      </p>
    </div>
  );
}

function Fila({ b, n, nueva, primera, ultima, alSubir, alBajar, alVisible }: { b: BloqueEditable; n: number; nueva: boolean; primera: boolean; ultima: boolean; alSubir: () => void; alBajar: () => void; alVisible: () => void }) {
  const controles = useDragControls();
  const info = CATALOGO[b.tipo];
  const t = tituloDe(b);
  return (
    <Reorder.Item
      value={b}
      dragListener={false}
      dragControls={controles}
      className="cristal flex items-center gap-3 rounded-[24px] p-2 pr-3"
      whileDrag={{ scale: 1.02, boxShadow: "0 24px 50px -16px rgba(0,0,0,0.6)", zIndex: 10 }}
    >
      <button type="button" onPointerDown={(e) => controles.start(e)} className="flex h-10 w-6 shrink-0 cursor-grab touch-none items-center justify-center text-[var(--jm-tenue)] active:cursor-grabbing" aria-label="Arrastrar para ordenar">
        <Icono nombre="asa" className="h-4 w-4" />
      </button>
      <span className="w-5 shrink-0 text-center text-xs font-semibold tabular-nums text-[var(--jm-tenue)]">{n}</span>
      <span className={`min-w-0 flex-1 py-1.5 ${b.visible ? "" : "opacity-50"}`}>
        <span className="block font-semibold leading-snug">{info?.nombre ?? b.tipo}</span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--jm-tenue)]">
          {t && <span className="line-clamp-1">{t}</span>}
          {nueva && <Insignia color="bg-white/15 text-[var(--jm-suave)]">Nueva</Insignia>}
          {!b.visible && <Insignia color="bg-[#ff9f0a]/15 text-[#ffb340]">Oculta</Insignia>}
        </span>
      </span>
      <div className="-mr-1 flex shrink-0 items-center">
        <button type="button" onClick={alSubir} disabled={primera} className="boton-icono disabled:opacity-25" aria-label="Subir" title="Subir">
          <Icono nombre="arriba" className="h-[18px] w-[18px]" />
        </button>
        <button type="button" onClick={alBajar} disabled={ultima} className="boton-icono disabled:opacity-25" aria-label="Bajar" title="Bajar">
          <Icono nombre="abajo" className="h-[18px] w-[18px]" />
        </button>
        <button type="button" onClick={alVisible} className="boton-icono" aria-label={b.visible ? "Ocultar sección" : "Mostrar sección"} title={b.visible ? "Ocultar sección" : "Mostrar sección"}>
          <Icono nombre={b.visible ? "ojo" : "ojo-no"} className="h-[18px] w-[18px]" />
        </button>
      </div>
    </Reorder.Item>
  );
}
