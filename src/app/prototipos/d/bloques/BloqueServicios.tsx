"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePantallaAncha, usePunteroFino, useReducir } from "../../_comun/hooks";
import { VideoYouTube } from "../../_comun/VideoYouTube";
import { SERVICIOS, type Bloque, type ServicioD } from "../datos";
import { Icono } from "../Iconos";
import { CURVA, elegirServicio, Revelar, Titular } from "../piezas";

const ICONOS: Record<string, string> = { "direccion-de-fotografia": "camara", filmmaker: "claqueta", edicion: "ritmo" };

/**
 * Servicios como tarjetas que se abren: la elegida crece y enseña lo que aporto, para quién es
 * y el botón para hablar de tu proyecto. Al pasar el ratón arranca un clip del trabajo.
 */
export function BloqueServicios({ bloque }: { bloque: Bloque }) {
  const ancha = usePantallaAncha();
  const [activo, setActivo] = useState(0);

  return (
    <section id={bloque.id === "servicios" ? "servicios" : undefined} className="scroll-mt-24 px-4 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />

        <Revelar retraso={0.1} className="mt-14">
          {ancha ? (
            <div className="flex h-[600px] gap-3">
              {SERVICIOS.map((s, i) => (
                <Tarjeta key={s.slug} servicio={s} abierta={activo === i} alActivar={() => setActivo(i)} ancha />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {SERVICIOS.map((s, i) => (
                <Tarjeta key={s.slug} servicio={s} abierta={activo === i} alActivar={() => setActivo(i)} />
              ))}
            </div>
          )}
        </Revelar>
      </div>
    </section>
  );
}

function Tarjeta({ servicio, abierta, alActivar, ancha }: { servicio: ServicioD; abierta: boolean; alActivar: () => void; ancha?: boolean }) {
  const fino = usePunteroFino();
  const reducir = useReducir();
  const [clip, setClip] = useState(false);
  const espera = useRef(0);
  const intencion = useRef(0);

  // El clip arranca un momento después de abrirse, solo con ratón
  useEffect(() => {
    window.clearTimeout(espera.current);
    if (abierta && fino && !reducir && ancha) espera.current = window.setTimeout(() => setClip(true), 500);
    else setClip(false);
    return () => window.clearTimeout(espera.current);
  }, [abierta, fino, reducir, ancha]);

  return (
    <motion.article
      data-foco
      // Se abre si el ratón se queda un instante: cruzar las tarjetas no dispara tres aperturas seguidas
      onPointerEnter={() => {
        if (fino) intencion.current = window.setTimeout(alActivar, 160);
      }}
      onPointerLeave={() => window.clearTimeout(intencion.current)}
      onClick={alActivar}
      className="cristal group relative cursor-pointer overflow-hidden rounded-[36px] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={ancha ? { flexGrow: abierta ? 3.2 : 1, flexBasis: 0, minWidth: 0 } : undefined}
    >
      {/* Imagen y clip de fondo */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${abierta ? "opacity-100" : "opacity-40"}`}>
        <img src={servicio.imagen} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1.6s] group-hover:scale-110" />
        <VideoYouTube id={servicio.youtubeId} inicio={servicio.inicioClip} activo={clip} retraso={700} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      </div>

      <div className={`relative z-[3] flex h-full flex-col justify-between p-6 text-white sm:p-8 ${ancha ? "" : abierta ? "min-h-[520px]" : "min-h-[150px]"}`}>
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
            <Icono nombre={ICONOS[servicio.slug]} className="h-6 w-6" />
          </span>
          <motion.span
            animate={{ rotate: abierta ? 45 : 0 }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15"
          >
            <Icono nombre="mas" className="h-4 w-4" />
          </motion.span>
        </div>

        <div>
          <h3
            className={`font-black tracking-[-0.04em] transition-all duration-700 ${
              abierta ? "text-4xl sm:text-5xl" : ancha ? "text-2xl" : "text-3xl"
            } ${ancha && !abierta ? "[writing-mode:vertical-rl] rotate-180 self-start" : ""}`}
          >
            {servicio.nombre}
          </h3>

          <AnimatePresence initial={false}>
            {abierta && (
              <motion.div
                key="detalle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: ancha ? 0.3 : 0.1, duration: 0.6, ease: CURVA } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="min-w-[280px] max-w-xl"
              >
                <p className="d-serif mt-2 text-2xl text-[#ffb36b] sm:text-3xl">{servicio.frase}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75">{servicio.resumen}</p>
                <ul className="mt-5 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
                  {servicio.aporto.map((a, i) => (
                    <motion.li
                      key={a}
                      className="flex gap-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (ancha ? 0.45 : 0.2) + i * 0.06 }}
                    >
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-acento)]" />
                      {a}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/55">Ideal para</span>
                  {servicio.paraQuien.map((q) => (
                    <span key={q} className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs">
                      {q}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    elegirServicio(servicio.nombre);
                  }}
                  className="boton boton-acento mt-7 px-6 py-3 text-sm"
                >
                  Hablemos de tu proyecto
                  <Icono nombre="flecha" className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
