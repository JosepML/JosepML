"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { Enlace } from "../../_comun/Enlace";
import { usePantallaAncha, useReducir } from "../../_comun/hooks";
import { useClipHover } from "../../_comun/useClipHover";
import { VideoYouTube } from "../../_comun/VideoYouTube";
import { PROYECTOS, SERVICIOS, type Bloque, type ProyectoD } from "../datos";
import { Icono } from "../Iconos";
import { CURVA, Revelar, Titular } from "../piezas";

const FILTROS = [{ slug: "todos", nombre: "Todos" }, ...SERVICIOS.map((s) => ({ slug: s.slug, nombre: s.nombre }))];

/**
 * Trabajos en una galería horizontal: en ordenador la sección se queda fija y el scroll vertical
 * la desplaza de lado; en móvil es un carrusel que se desliza con el dedo.
 */
export function BloqueTrabajos({ bloque }: { bloque: Bloque }) {
  const [filtro, setFiltro] = useState("todos");
  const lista = filtro === "todos" ? PROYECTOS : PROYECTOS.filter((p) => p.servicios.includes(filtro));
  const ancha = usePantallaAncha();
  const reducir = useReducir();
  const fijar = ancha && !reducir;

  const seccion = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);
  const recorrido = useMotionValue(0);

  useLayoutEffect(() => {
    const el = pista.current;
    if (!el || !fijar) return;
    const medir = () => {
      const d = Math.max(0, el.scrollWidth - document.documentElement.clientWidth);
      setDistancia(d);
      recorrido.set(d);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [fijar, lista.length, recorrido]);

  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * recorrido.get());

  const cabecera = (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
      <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
      <Revelar retraso={0.15}>
        <div className="cristal sin-barra flex max-w-full gap-1 overflow-x-auto rounded-full p-1" role="tablist" aria-label="Filtrar por servicio">
          {FILTROS.map((f) => (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={filtro === f.slug}
              onClick={() => setFiltro(f.slug)}
              className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                filtro === f.slug ? "text-white" : "text-[var(--d-suave)] hover:text-[var(--d-texto)]"
              }`}
            >
              {filtro === f.slug && (
                <motion.span layoutId="d-filtro" className="absolute inset-0 rounded-full bg-[var(--d-acento)]" transition={{ duration: 0.5, ease: CURVA }} />
              )}
              <span className="relative">{f.nombre}</span>
            </button>
          ))}
        </div>
      </Revelar>
    </div>
  );

  const tarjetas = (
    <AnimatePresence mode="popLayout" initial={false}>
      {lista.map((p, i) => (
        <motion.div
          key={p.slug}
          layout
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.5, ease: CURVA, delay: i * 0.03 }}
          className={fijar ? "h-[min(54svh,560px)] shrink-0" : "w-[82vw] max-w-[420px] shrink-0 snap-center"}
          style={fijar ? { aspectRatio: "3 / 2" } : undefined}
        >
          <TarjetaProyecto proyecto={p} movil={!fijar} />
        </motion.div>
      ))}
      <motion.div key="todos" layout className={fijar ? "h-[min(54svh,560px)] w-[320px] shrink-0" : "w-[60vw] max-w-[300px] shrink-0 snap-center"}>
        <div data-foco className="cristal flex h-full min-h-[300px] flex-col justify-between rounded-[32px] p-7">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-tenue)]">Y muchos más</span>
          <div>
            <p className="text-3xl font-black tracking-[-0.04em]">18 proyectos</p>
            <p className="mt-2 text-sm text-[var(--d-suave)]">Cortos, videoclips, spots, conciertos, bodas, recreaciones...</p>
            <span className="boton mt-6 border border-[var(--d-borde)] px-5 py-2.5 text-sm">
              Ver todos
              <Icono nombre="flecha" className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  if (!fijar) {
    return (
      <section ref={seccion} id={bloque.id === "trabajos" ? "trabajos" : undefined} className="scroll-mt-24 py-24">
        {cabecera}
        <div className="sin-barra mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4">{tarjetas}</div>
      </section>
    );
  }

  return (
    <section
      ref={seccion}
      id={bloque.id === "trabajos" ? "trabajos" : undefined}
      className="relative"
      style={{ height: `calc(100svh + ${distancia}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden pt-20">
        {cabecera}
        <motion.div ref={pista} style={{ x }} className="flex w-max gap-5 px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {tarjetas}
        </motion.div>
        <div className="mx-auto h-[3px] w-40 overflow-hidden rounded-full bg-[var(--d-borde)]">
          <motion.div className="h-full origin-left rounded-full bg-[var(--d-acento)]" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

export function TarjetaProyecto({ proyecto: p, movil }: { proyecto: ProyectoD; movil?: boolean }) {
  const { activo, handlers } = useClipHover();

  return (
    <Enlace href={`/prototipos/d/${p.slug}`} {...handlers} className="group block h-full" aria-label={`Ver ${p.titulo}`}>
      <div
        data-radio
        data-foco
        className={`relative h-full overflow-hidden rounded-[32px] bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] ${movil ? "aspect-[4/5]" : ""}`}
      >
        <img
          data-transicion
          src={p.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <VideoYouTube id={p.youtubeId} inicio={p.inicioClip} activo={activo} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {p.laurel && (
          <span className="absolute left-4 top-4 z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white">
            <Icono nombre="laurel" className="h-3.5 w-3.5 text-[#ffcf7a]" />
            {p.laurel.premio}
          </span>
        )}
        <span className="absolute right-4 top-4 z-[3] flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Icono nombre="flecha" className="h-4 w-4 -rotate-45" />
        </span>

        <div className="absolute inset-x-3 bottom-3 z-[3] rounded-[24px] border border-white/15 bg-black/45 p-4 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
            {p.tipo}
            {p.anio ? ` · ${p.anio}` : ""}
          </p>
          <h3 className="mt-1 text-xl font-extrabold leading-tight tracking-[-0.03em] sm:text-2xl">{p.titulo}</h3>
          <p className="mt-1 text-sm text-white/70">{p.papel}</p>
        </div>
      </div>
    </Enlace>
  );
}
