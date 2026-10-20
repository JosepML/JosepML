"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePantallaAncha, usePunteroFino } from "../../_comun/hooks";
import { imagenesDe, SERVICIOS, type Bloque, type ServicioD } from "../datos";
import { Icono } from "../Iconos";
import { RAIZ } from "../rutas";
import { CURVA, Diapositivas, elegirServicio, Revelar, Titular } from "../piezas";

export const ICONOS_SERVICIO: Record<string, string> = { "direccion-de-fotografia": "camara", filmmaker: "claqueta", edicion: "ritmo" };

/**
 * Servicios como tarjetas que se abren: la elegida se ensancha con calma y enseña lo que aporto,
 * para quién es, y los botones para ver sus proyectos o hablar de tu proyecto.
 */
export function BloqueServicios({ bloque }: { bloque: Bloque }) {
  const ancha = usePantallaAncha();
  const [activo, setActivo] = useState(0);

  return (
    <section id={bloque.id === "servicios" ? "servicios" : undefined} className="px-4 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />

        <Revelar retraso={0.1} className="mt-14">
          <div className={ancha ? "flex h-[580px] gap-3" : "flex flex-col gap-3"}>
            {SERVICIOS.map((s, i) => (
              <Tarjeta key={s.slug} servicio={s} abierta={activo === i} alActivar={() => setActivo(i)} ancha={ancha} />
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  );
}

function Tarjeta({ servicio, abierta, alActivar, ancha }: { servicio: ServicioD; abierta: boolean; alActivar: () => void; ancha: boolean }) {
  const fino = usePunteroFino();
  const intencion = useRef(0);
  const [encima, setEncima] = useState(false);

  return (
    <article
      data-foco
      // Se abre si el ratón se queda un instante: cruzar las tarjetas no dispara tres aperturas seguidas
      onPointerEnter={() => {
        setEncima(true);
        if (fino) intencion.current = window.setTimeout(alActivar, 180);
      }}
      onPointerLeave={() => {
        setEncima(false);
        window.clearTimeout(intencion.current);
      }}
      onClick={alActivar}
      className={`cristal group relative cursor-pointer overflow-hidden rounded-[36px] transition-[flex-grow,min-height] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        ancha ? "" : abierta ? "min-h-[540px]" : "min-h-[150px]"
      }`}
      style={ancha ? { flexGrow: abierta ? 2.6 : 1, flexBasis: 0, minWidth: 0 } : undefined}
    >
      {/* Fotogramas de fondo de sus proyectos */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${abierta ? "opacity-100" : "opacity-50"}`}>
        <Diapositivas imagenes={imagenesDe(servicio.slug)} activo={abierta && (encima || !fino)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      </div>

      <div className="relative z-[3] flex h-full flex-col justify-between p-6 text-white sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
            <Icono nombre={ICONOS_SERVICIO[servicio.slug]} className="h-6 w-6" />
          </span>
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 transition-transform duration-700"
            style={{ transform: abierta ? "rotate(45deg)" : "none" }}
          >
            <Icono nombre="mas" className="h-4 w-4" />
          </span>
        </div>

        <div>
          <h3 className="text-[28px] font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">{servicio.nombre}</h3>

          <AnimatePresence initial={false}>
            {abierta && (
              <motion.div
                key="detalle"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: ancha ? 0.35 : 0.15, duration: 0.8, ease: CURVA } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                // Ancho mínimo fijo: el texto no se recoloca mientras la tarjeta se ensancha
                className={`max-w-xl ${ancha ? "min-w-[440px]" : ""}`}
              >
                <p className="mt-2 text-lg font-medium text-[#ffb36b]">{servicio.frase}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/75 [text-wrap:pretty]">{servicio.resumen}</p>
                <ul className="mt-5 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
                  {servicio.aporto.slice(0, 4).map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--d-acento)]" />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/55">Ideal para</span>
                  {servicio.paraQuien.map((q) => (
                    <span key={q} className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs">
                      {q}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={`${RAIZ}/servicios/${servicio.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="boton border border-white/25 bg-white/15 px-5 py-3 text-sm hover:bg-white/25"
                  >
                    Ver proyectos y detalles
                    <Icono nombre="flecha" className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      elegirServicio(servicio.nombre);
                    }}
                    className="boton boton-acento px-5 py-3 text-sm"
                  >
                    Hablemos de tu proyecto
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
