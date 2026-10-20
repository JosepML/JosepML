"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Enlace } from "../../_comun/Enlace";
import { usePunteroFino } from "../../_comun/hooks";
import { proyectosDe, SERVICIOS, type Bloque, type ProyectoD } from "../datos";
import { Icono } from "../Iconos";
import { RAIZ } from "../rutas";
import { CURVA, Diapositivas, Revelar, Titular } from "../piezas";

const FILTROS = [{ slug: "todos", nombre: "Todos" }, ...SERVICIOS.map((s) => ({ slug: s.slug, nombre: s.nombre }))];

/**
 * Trabajos en un carrusel horizontal: flechas de cristal, arrastre con el ratón y con el dedo, y ajuste
 * a cada tarjeta. Cada filtro tiene su propia selección y orden (SELECCION en datos.ts).
 */
export function BloqueTrabajos({ bloque }: { bloque: Bloque }) {
  const [filtro, setFiltro] = useState("todos");
  const lista = proyectosDe(filtro);
  const pista = useRef<HTMLDivElement>(null);
  const [bordes, setBordes] = useState({ inicio: true, fin: false });
  // El avance va en un valor de Motion: moverlo no vuelve a pintar el carrusel en cada fotograma de scroll
  const avance = useMotionValue(0);
  const barra = useSpring(avance, { stiffness: 220, damping: 30 });
  const escalaBarra = useTransform(barra, (v) => Math.max(0.08, v));

  const medir = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    avance.set(max > 0 ? el.scrollLeft / max : 0);
    const inicio = el.scrollLeft < 8;
    const fin = el.scrollLeft > max - 8;
    setBordes((b) => (b.inicio === inicio && b.fin === fin ? b : { inicio, fin }));
  }, [avance]);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    el.scrollTo({ left: 0, behavior: "smooth" });
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [filtro, medir]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const tarjeta = el.querySelector<HTMLElement>("[data-tarjeta]");
    const paso = tarjeta ? tarjeta.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * paso, behavior: "smooth" });
  };

  const arrastre = useArrastre(pista);

  return (
    <section id={bloque.id === "trabajos" ? "trabajos" : undefined} className="py-24 sm:py-32">
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
                className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  filtro === f.slug ? "text-white" : "text-[var(--d-suave)] hover:text-[var(--d-texto)]"
                }`}
              >
                {filtro === f.slug && (
                  <motion.span
                    layoutId="d-filtro"
                    className="absolute inset-0 rounded-full bg-[var(--d-acento)] shadow-[0_6px_20px_-6px_rgba(229,9,20,0.7)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                  />
                )}
                <span className="relative">{f.nombre}</span>
              </button>
            ))}
          </div>
        </Revelar>
      </div>

      {/* Al cambiar de filtro, las tarjetas que siguen se deslizan a su nuevo sitio (layout) y las nuevas
          entran escalonadas con un muelle suave; las que sobran se encogen y desaparecen */}
      <motion.div
        ref={pista}
        layoutScroll
        onScroll={medir}
        {...arrastre}
        className="sin-barra mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2+2rem))] pb-2 [scroll-padding-inline:max(1rem,calc((100vw-80rem)/2+2rem))]"
      >
        <AnimatePresence mode="popLayout" initial={false}>
            {lista.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                data-tarjeta
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 22, delay: 0.05 + i * 0.06 } }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25, ease: CURVA } }}
                transition={{ layout: { type: "spring", stiffness: 200, damping: 28 } }}
                className="w-[78vw] max-w-[420px] shrink-0 snap-start sm:w-[min(46vw,560px)] sm:max-w-none"
              >
                <TarjetaProyecto proyecto={p} />
              </motion.div>
            ))}
            <motion.div
              key={`mas-${filtro}`}
              layout
              data-tarjeta
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: CURVA, delay: 0.1 + lista.length * 0.06 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="w-[60vw] max-w-[300px] shrink-0 snap-start sm:w-[300px]"
            >
              <div data-foco className="cristal flex h-full min-h-[300px] flex-col justify-between rounded-[32px] p-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-tenue)]">Hay más</span>
                {filtro === "todos" ? (
                  <div>
                    <p className="text-2xl font-bold leading-tight tracking-[-0.03em]">Explora por servicio</p>
                    <div className="mt-5 flex flex-col gap-2">
                      {SERVICIOS.map((s) => (
                        <Enlace
                          key={s.slug}
                          href={`${RAIZ}/servicios/${s.slug}`}
                          className="flex items-center justify-between rounded-2xl border border-[var(--d-borde)] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--d-cristal)]"
                        >
                          {s.nombre}
                          <Icono nombre="flecha" className="h-4 w-4" />
                        </Enlace>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-2xl font-bold leading-tight tracking-[-0.03em]">
                      Todo lo de {FILTROS.find((f) => f.slug === filtro)?.nombre.toLowerCase()}
                    </p>
                    <Enlace
                      href={`${RAIZ}/servicios/${filtro}`}
                      className="boton mt-6 border border-[var(--d-borde)] px-5 py-2.5 text-sm hover:bg-[var(--d-cristal)]"
                    >
                      Ver todos
                      <Icono nombre="flecha" className="h-4 w-4" />
                    </Enlace>
                  </div>
                )}
              </div>
            </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Flechas y avance */}
      <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <div className="h-[3px] w-40 overflow-hidden rounded-full bg-[var(--d-borde)]">
          <motion.div className="h-full origin-left rounded-full bg-[var(--d-acento)]" style={{ scaleX: escalaBarra }} />
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => {
            const apagada = dir === -1 ? bordes.inicio : bordes.fin;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => mover(dir)}
                disabled={apagada}
                aria-label={dir === -1 ? "Trabajos anteriores" : "Más trabajos"}
                className="cristal flex h-12 w-12 items-center justify-center rounded-full transition-[opacity,transform] duration-300 hover:scale-105 disabled:opacity-35 disabled:hover:scale-100"
              >
                <Icono nombre={dir === -1 ? "izquierda" : "derecha"} className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Arrastrar el carrusel con el ratón, con inercia al soltar (sigue un poco con la velocidad que llevaba
 * y luego se ajusta a la tarjeta más cercana). Si se ha arrastrado, el clic no abre la tarjeta.
 */
function useArrastre(pista: React.RefObject<HTMLDivElement | null>) {
  const fino = usePunteroFino();
  const estado = useRef({ x: 0, inicio: 0, activo: false, movido: false, ultimoX: 0, ultimoT: 0, velocidad: 0 });

  if (!fino) return {};
  return {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || !pista.current) return;
      const t = performance.now();
      estado.current = { x: e.clientX, inicio: pista.current.scrollLeft, activo: true, movido: false, ultimoX: e.clientX, ultimoT: t, velocidad: 0 };
    },
    onPointerMove: (e: React.PointerEvent) => {
      const s = estado.current;
      const el = pista.current;
      if (!s.activo || !el) return;
      const dx = e.clientX - s.x;
      if (!s.movido && Math.abs(dx) > 6) {
        s.movido = true;
        el.setPointerCapture(e.pointerId);
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
      }
      if (!s.movido) return;
      el.scrollLeft = s.inicio - dx;
      const t = performance.now();
      if (t > s.ultimoT) s.velocidad = (e.clientX - s.ultimoX) / (t - s.ultimoT);
      s.ultimoX = e.clientX;
      s.ultimoT = t;
    },
    onPointerUp: () => {
      const el = pista.current;
      const s = estado.current;
      s.activo = false;
      if (!el) return;
      el.style.scrollBehavior = "";
      // Inercia: un empujón proporcional a la velocidad del gesto, y después vuelve el ajuste a tarjeta
      const empuje = Math.max(-900, Math.min(900, -s.velocidad * 320));
      if (s.movido && Math.abs(empuje) > 30) el.scrollBy({ left: empuje, behavior: "smooth" });
      window.setTimeout(() => {
        el.style.scrollSnapType = "";
      }, s.movido ? 450 : 0);
    },
    onClickCapture: (e: React.MouseEvent) => {
      if (estado.current.movido) {
        e.preventDefault();
        e.stopPropagation();
        estado.current.movido = false;
      }
    },
  };
}

export function TarjetaProyecto({ proyecto: p }: { proyecto: ProyectoD }) {
  const fino = usePunteroFino();
  const [encima, setEncima] = useState(false);

  return (
    <Enlace
      href={`${RAIZ}/${p.slug}`}
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
      className="group block"
      aria-label={`Ver ${p.titulo}`}
      draggable={false}
    >
      <div
        data-radio
        data-foco
        className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:aspect-[3/2]"
      >
        <Diapositivas imagenes={p.fotogramas.length > 1 ? p.fotogramas : [p.poster]} activo={encima && fino} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

        {p.laurel && (
          <span className="absolute left-4 top-4 z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white">
            <Icono nombre="laurel" className="h-3.5 w-3.5 text-[#ffcf7a]" />
            {p.laurel.premio}
          </span>
        )}
        <span className="absolute right-4 top-4 z-[3] flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Icono nombre="flecha" className="h-4 w-4 -rotate-45" />
        </span>

        <div className="absolute inset-x-3 bottom-3 z-[3] rounded-[24px] border border-white/15 bg-black/60 p-4 text-white transition-transform duration-500 group-hover:-translate-y-1 sm:p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
            {p.tipo}
            {p.anio ? ` · ${p.anio}` : ""}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl">{p.titulo}</h3>
          <p className="mt-1 text-sm text-white/70">{p.papel}</p>
        </div>
      </div>
    </Enlace>
  );
}
