"use client";

import { motion, useReducedMotion } from "motion/react";
import { CursorVisor } from "../_comun/CursorVisor";
import { fichaTecnica, PROYECTOS, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { formatoTimecode } from "../_comun/hooks";
import { Reproductor } from "../_comun/Reproductor";
import { MenuC, ROJO } from "./PortadaC";

export function FichaC({ proyecto }: { proyecto: ProyectoProto }) {
  const reducir = useReducedMotion();
  const siguiente = PROYECTOS[(PROYECTOS.findIndex((p) => p.slug === proyecto.slug) + 1) % PROYECTOS.length];

  return (
    <div className="min-h-svh bg-black text-white">
      <CursorVisor variante="c" />
      <MenuC />

      <header className="relative h-svh overflow-hidden">
        {/* Entra en blanco y negro y "revela" el color */}
        <motion.img
          src={proyecto.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ filter: reducir ? "grayscale(0)" : "grayscale(1) contrast(1.25)" }}
          animate={{ filter: "grayscale(0) contrast(1)" }}
          transition={{ delay: 0.4, duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
          <p className="proto-c-mono text-[11px] uppercase tracking-[0.2em]">
            {proyecto.tipo}
            {proyecto.anio ? ` · ${proyecto.anio}` : ""} · {proyecto.papel}
          </p>
          <h1 className="proto-c-display mt-2 text-[16vw] uppercase leading-[0.82] sm:text-[10vw]">{proyecto.titulo}</h1>
        </div>
      </header>

      <section className="grid gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
        <dl className="proto-c-mono grid grid-cols-2 gap-px self-start bg-white/20 text-[12px]">
          {fichaTecnica(proyecto).map(([k, v]) => (
            <div key={k} className="bg-black p-4">
              <dt className="text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</dt>
              <dd className={`mt-1 ${v === "Pendiente" ? "text-white/40" : ""}`}>{v}</dd>
            </div>
          ))}
          {proyecto.laurel && (
            <div className="col-span-2 p-4 text-black" style={{ background: ROJO }}>
              <dt className="text-[10px] uppercase tracking-[0.2em]">Premio</dt>
              <dd className="proto-c-display mt-1 text-2xl uppercase">
                {proyecto.laurel.premio} · {proyecto.laurel.festival}
              </dd>
            </div>
          )}
        </dl>
        <div>
          <p className="text-2xl leading-snug sm:text-3xl">{proyecto.frase}</p>
          <Reproductor id={proyecto.youtubeId} poster={proyecto.poster} titulo={proyecto.titulo} className="mt-10" />
        </div>
      </section>

      {/* Fotogramas en tira horizontal, como la línea de tiempo del montaje */}
      <section className="border-t border-white/20 py-12">
        <p className="proto-c-mono px-5 text-[11px] uppercase tracking-[0.2em] text-white/60 sm:px-8">Fotogramas</p>
        <div className="mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-4 sm:px-8">
          {proyecto.fotogramas.map((src, i) => (
            <figure key={src} className="w-[80vw] shrink-0 snap-start sm:w-[45vw]">
              <img src={src} alt={`Fotograma ${i + 1} de ${proyecto.titulo}`} className="aspect-video w-full object-cover" />
              <figcaption className="proto-c-mono mt-2 text-[10px] tracking-[0.2em] text-white/50">
                {formatoTimecode((proyecto.inicioClip + i * 17) * 24)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Enlace
        href={`/prototipos/c/${siguiente.slug}`}
        estilo="corte"
        rotulo={siguiente.titulo}
        className="group relative block h-[50svh] overflow-hidden border-t border-white/20"
        data-visor="Siguiente"
      >
        <img src={siguiente.poster} alt="" className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-end p-5 pb-20 sm:p-8 sm:pb-20">
          <span className="proto-c-mono text-[11px] uppercase tracking-[0.2em]">Siguiente clip →</span>
          <span className="proto-c-display mt-2 text-[12vw] uppercase leading-[0.85] sm:text-[7vw]">{siguiente.titulo}</span>
        </div>
      </Enlace>
    </div>
  );
}
