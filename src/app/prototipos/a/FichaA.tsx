"use client";

import { motion, useReducedMotion } from "motion/react";
import { CursorVisor } from "../_comun/CursorVisor";
import { fichaTecnica, PROYECTOS, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { Laurel } from "../_comun/Laurel";
import { Reproductor } from "../_comun/Reproductor";
import { ALTO_CABECERA } from "../_comun/Transicion";
import { MenuA } from "./PortadaA";

const CURVA = [0.22, 1, 0.36, 1] as const;

export function FichaA({ proyecto }: { proyecto: ProyectoProto }) {
  const reducir = useReducedMotion();
  const siguiente = PROYECTOS[(PROYECTOS.findIndex((p) => p.slug === proyecto.slug) + 1) % PROYECTOS.length];
  const entrar = (retraso: number) => ({
    initial: { opacity: 0, y: reducir ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: retraso, duration: 0.8, ease: CURVA },
  });

  return (
    <div className="grano min-h-svh bg-[#0d0b09] text-[#efe8dd]">
      <CursorVisor variante="a" />
      <MenuA />

      {/* La imagen de la tarjeta aterriza exactamente aquí */}
      <header className="vineta relative w-full overflow-hidden" style={{ height: `${ALTO_CABECERA * 100}svh` }}>
        <img src={proyecto.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 sm:px-10">
          <motion.p {...entrar(0.3)} className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b]">
            {proyecto.tipo}
            {proyecto.anio ? ` · ${proyecto.anio}` : ""}
          </motion.p>
          <motion.h1 {...entrar(0.4)} className="mt-3 font-display text-5xl leading-none sm:text-8xl">
            {proyecto.titulo}
          </motion.h1>
        </div>
      </header>

      <section className="grid gap-12 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_2fr]">
        <motion.dl {...entrar(0.55)} className="grid grid-cols-2 gap-x-6 gap-y-5 self-start border-t border-[#efe8dd]/15 pt-6 text-sm">
          {fichaTecnica(proyecto).map(([k, v]) => (
            <div key={k}>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-[#9a8f80]">{k}</dt>
              <dd className={`mt-1 ${v === "Pendiente" ? "italic text-[#9a8f80]" : ""}`}>{v}</dd>
            </div>
          ))}
          {proyecto.laurel && (
            <div className="col-span-2 mt-2 flex items-center gap-3 text-[#d9a35b]">
              <Laurel className="h-10 w-10" />
              <div className="text-xs uppercase leading-snug tracking-[0.15em]">
                {proyecto.laurel.premio}
                <br />
                <span className="text-[#efe8dd]/60">{proyecto.laurel.festival}</span>
              </div>
            </div>
          )}
        </motion.dl>
        <motion.div {...entrar(0.65)}>
          <p className="font-display text-2xl leading-snug sm:text-4xl">{proyecto.frase}</p>
          <Reproductor id={proyecto.youtubeId} poster={proyecto.poster} titulo={proyecto.titulo} className="mt-10" />
        </motion.div>
      </section>

      <section className="px-5 pb-20 sm:px-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b]">Fotogramas</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {proyecto.fotogramas.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`Fotograma ${i + 1} de ${proyecto.titulo}`}
              className={`w-full object-cover ${i === 0 ? "aspect-[2.39/1] sm:col-span-2" : "aspect-video"}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            />
          ))}
        </div>
      </section>

      <Enlace
        href={`/prototipos/a/${siguiente.slug}`}
        estilo="crecer"
        className="group relative block h-[45svh] overflow-hidden"
        data-visor="Siguiente"
      >
        <img
          data-transicion
          src={siguiente.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center pb-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b]">Siguiente proyecto</p>
          <p className="mt-3 font-display text-4xl sm:text-6xl">{siguiente.titulo}</p>
        </div>
      </Enlace>
    </div>
  );
}
