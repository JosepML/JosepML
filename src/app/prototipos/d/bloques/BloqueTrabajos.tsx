"use client";

import { animate, AnimatePresence, motion, useMotionValue } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Enlace } from "../../_comun/Enlace";
import { usePunteroFino, useReducir } from "../../_comun/hooks";
import { proyectosDe, SERVICIOS, type Bloque, type ProyectoD } from "../datos";
import { Icono } from "../Iconos";
import { RAIZ } from "../rutas";
import { CURVA, Diapositivas, Revelar, Titular } from "../piezas";

const FILTROS = [{ slug: "todos", nombre: "Todos" }, ...SERVICIOS.map((s) => ({ slug: s.slug, nombre: s.nombre }))];
const MUELLE = { type: "spring", stiffness: 120, damping: 22, mass: 1 } as const;

/**
 * Trabajos: carrusel de tarjeta protagonista. La activa, centrada, grande y nítida; las vecinas más
 * pequeñas y atenuadas. Se avanza de una en una (flechas, arrastre o pulsando una vecina) con un muelle
 * suave, y el fondo de la sección se funde con el fotograma de la tarjeta activa. Todo con transform y
 * opacidad. Al cambiar de filtro no hay animaciones de layout: altura fija, la lista se funde y la nueva
 * entra escalonada desde la primera tarjeta.
 */
export function BloqueTrabajos({ bloque }: { bloque: Bloque }) {
  const [filtro, setFiltro] = useState("todos");
  const [fondo, setFondo] = useState<string | null>(null);

  return (
    <section id={bloque.id === "trabajos" ? "trabajos" : undefined} className="relative overflow-hidden py-20 sm:py-24">
      {/* Fondo: fotograma de la tarjeta activa, muy oscuro y difuminado, con fundido al cambiar */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <AnimatePresence initial={false}>
          {fondo && (
            <motion.img
              key={fondo}
              src={fondo}
              alt=""
              className="absolute inset-0 h-full w-full scale-125 object-cover blur-[50px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.28 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: CURVA }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--d-fondo)] via-transparent to-[var(--d-fondo)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
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

      <AnimatePresence mode="wait" initial={false}>
        <Carrusel key={filtro} proyectos={proyectosDe(filtro)} alCambiar={setFondo} />
      </AnimatePresence>

      <div className="relative mx-auto mt-2 flex max-w-7xl justify-center px-4 sm:px-8">
        <Enlace
          href={filtro === "todos" ? `${RAIZ}/servicios/${SERVICIOS[0].slug}` : `${RAIZ}/servicios/${filtro}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--d-suave)] transition-colors hover:text-[var(--d-texto)]"
        >
          {filtro === "todos" ? "Ver los trabajos por servicio" : `Todo lo de ${FILTROS.find((f) => f.slug === filtro)?.nombre.toLowerCase()}`}
          <Icono nombre="flecha" className="h-4 w-4" />
        </Enlace>
      </div>
    </section>
  );
}

function useAncho(ref: React.RefObject<HTMLElement | null>) {
  const [ancho, setAncho] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => setAncho(el.clientWidth);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return ancho;
}

function Carrusel({ proyectos, alCambiar }: { proyectos: ProyectoD[]; alCambiar: (poster: string) => void }) {
  const caja = useRef<HTMLDivElement>(null);
  const ancho = useAncho(caja);
  const reducir = useReducir();
  const movil = ancho > 0 && ancho < 640;
  // En ordenador la tarjeta cabe en la pantalla junto al titular: como mucho la mitad del alto visible
  const altoVentana = typeof window === "undefined" ? 900 : window.innerHeight;
  const W = movil ? ancho * 0.84 : Math.min(ancho * 0.56, 820, altoVentana * 0.46 * (16 / 9));
  const gap = movil ? 14 : 28;
  const paso = W + gap;
  const alto = W * (movil ? 5 / 4 : 9 / 16);

  const [activa, setActiva] = useState(0);
  const x = useMotionValue(0);
  const arrastrando = useRef(false);

  const centrar = useCallback((n: number) => ancho / 2 - W / 2 - n * paso, [ancho, W, paso]);

  const ir = useCallback(
    (n: number) => {
      const destino = Math.max(0, Math.min(proyectos.length - 1, n));
      setActiva(destino);
      animate(x, centrar(destino), reducir ? { duration: 0 } : MUELLE);
    },
    [proyectos.length, x, centrar, reducir],
  );

  // Al medir (o cambiar el tamaño de la ventana) se coloca sin animación
  useLayoutEffect(() => {
    if (ancho) x.set(centrar(activa));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ancho]);

  useEffect(() => {
    if (proyectos[activa]) alCambiar(proyectos[activa].poster);
  }, [activa, proyectos, alCambiar]);

  return (
    <motion.div
      ref={caja}
      className="relative mt-12 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.22 } }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ir(activa + 1);
        if (e.key === "ArrowLeft") ir(activa - 1);
      }}
    >
      {/* Altura fija: nada se recoloca al cambiar de filtro */}
      <div className="relative overflow-hidden" style={{ height: alto ? alto + 8 : undefined }}>
        <motion.div
          className="absolute left-0 top-0 flex cursor-grab active:cursor-grabbing"
          style={{ x, gap, touchAction: "pan-y" }}
          drag="x"
          dragElastic={0.14}
          dragMomentum={false}
          dragConstraints={{ left: centrar(proyectos.length - 1) - 80, right: centrar(0) + 80 }}
          onDragStart={() => {
            arrastrando.current = true;
          }}
          onDragEnd={(_, info) => {
            const avance = -(info.offset.x + info.velocity.x * 0.25) / paso;
            ir(Math.round(activa + Math.max(-2, Math.min(2, avance))));
            window.setTimeout(() => (arrastrando.current = false), 50);
          }}
        >
          {proyectos.map((p, j) => (
            <motion.div
              key={p.slug}
              className="shrink-0"
              style={{ width: W, height: alto }}
              animate={{ scale: j === activa ? 1 : 0.86, opacity: j === activa ? 1 : 0.42 }}
              transition={MUELLE}
              onClickCapture={(e) => {
                // Pulsar una vecina la trae al centro; solo la activa abre el proyecto
                if (arrastrando.current || j !== activa) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!arrastrando.current) ir(j);
                }
              }}
            >
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: CURVA, delay: 0.08 + Math.min(j, 4) * 0.07 }}
              >
                <TarjetaCarrusel proyecto={p} activa={j === activa} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicador y flechas */}
      <div className="relative mx-auto mt-8 flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Proyectos">
          {proyectos.map((p, j) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => ir(j)}
              aria-label={p.titulo}
              aria-selected={j === activa}
              role="tab"
              className="relative h-2 py-3 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: j === activa ? 28 : 8 }}
            >
              <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--d-borde)]" />
              {j === activa && (
                <motion.span layoutId="d-punto" className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--d-acento)]" transition={MUELLE} />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((dir) => {
            const apagada = dir === -1 ? activa === 0 : activa === proyectos.length - 1;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => ir(activa + dir)}
                disabled={apagada}
                aria-label={dir === -1 ? "Trabajo anterior" : "Trabajo siguiente"}
                className="cristal flex h-12 w-12 items-center justify-center rounded-full transition-[opacity,transform] duration-300 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
              >
                <Icono nombre={dir === -1 ? "izquierda" : "derecha"} className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function TarjetaCarrusel({ proyecto: p, activa }: { proyecto: ProyectoD; activa: boolean }) {
  const fino = usePunteroFino();
  const [encima, setEncima] = useState(false);

  return (
    <Enlace
      href={`${RAIZ}/${p.slug}`}
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
      className="group block h-full"
      aria-label={`Ver ${p.titulo}`}
      draggable={false}
      tabIndex={activa ? 0 : -1}
    >
      <div data-radio className="relative h-full overflow-hidden rounded-[32px] bg-black shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
        <Diapositivas imagenes={p.fotogramas.length > 1 ? p.fotogramas : [p.poster]} activo={activa && encima && fino} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        {p.laurel && (
          <span className="absolute left-5 top-5 z-[3] inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white">
            <Icono nombre="laurel" className="h-3.5 w-3.5 text-[#ffcf7a]" />
            {p.laurel.premio}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-4 p-6 text-white sm:p-8">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
              {p.tipo}
              {p.anio ? ` · ${p.anio}` : ""} · {p.papel}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight tracking-[-0.025em] sm:text-4xl">{p.titulo}</h3>
          </div>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 transition-[opacity,transform] duration-500 group-hover:scale-110"
            style={{ opacity: activa ? 1 : 0 }}
          >
            <Icono nombre="flecha" className="h-5 w-5 -rotate-45" />
          </span>
        </div>
      </div>
    </Enlace>
  );
}

/** Tarjeta de proyecto para rejillas (páginas de servicio). */
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
