"use client";

import { motion, useReducedMotion } from "motion/react";
import { fichaTecnica, PROYECTOS, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { Reproductor } from "../_comun/Reproductor";
import { MenuB, PAPEL } from "./PortadaB";

const CURVA = [0.22, 1, 0.36, 1] as const;

export function FichaB({ proyecto }: { proyecto: ProyectoProto }) {
  const reducir = useReducedMotion();
  const siguiente = PROYECTOS[(PROYECTOS.findIndex((p) => p.slug === proyecto.slug) + 1) % PROYECTOS.length];
  const entrar = (retraso: number) => ({
    initial: { opacity: 0, y: reducir ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: retraso, duration: 0.8, ease: CURVA },
  });

  return (
    <div className={`min-h-svh ${PAPEL}`}>
      <MenuB />
      <header className="px-5 pt-12 sm:px-10 sm:pt-20">
        <motion.p {...entrar(0.1)} className="proto-b-mono text-[11px] uppercase tracking-[0.2em] text-[#1b1712]/60">
          {proyecto.tipo}
          {proyecto.anio ? ` · ${proyecto.anio}` : ""}
        </motion.p>
        <motion.h1 {...entrar(0.2)} className="proto-b-serif mt-3 text-[14vw] leading-[0.9] sm:text-[9vw]">
          {proyecto.titulo}
        </motion.h1>
      </header>

      <motion.div {...entrar(0.35)} className="mt-10 px-5 sm:px-10">
        <img src={proyecto.poster} alt="" className="aspect-[2.39/1] w-full object-cover" />
      </motion.div>

      <section className="grid gap-12 px-5 py-16 sm:px-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Ficha técnica como una hoja de rodaje */}
        <motion.table {...entrar(0.45)} className="proto-b-mono w-full self-start border-t border-[#1b1712] text-[12px]">
          <tbody>
            {fichaTecnica(proyecto).map(([k, v]) => (
              <tr key={k} className="border-b border-[#1b1712]/20">
                <th className="w-32 py-3 pr-4 text-left align-top text-[10px] font-normal uppercase tracking-[0.15em] text-[#1b1712]/50">{k}</th>
                <td className={`py-3 ${v === "Pendiente" ? "italic text-[#1b1712]/40" : ""}`}>{v}</td>
              </tr>
            ))}
            {proyecto.laurel && (
              <tr className="border-b border-[#1b1712]/20">
                <th className="py-3 pr-4 text-left align-top text-[10px] font-normal uppercase tracking-[0.15em] text-[#1b1712]/50">Premio</th>
                <td className="py-3 text-[#9c3d1c]">
                  ✦ {proyecto.laurel.premio}, {proyecto.laurel.festival}
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
        <motion.div {...entrar(0.55)}>
          <p className="proto-b-serif text-3xl leading-snug sm:text-4xl">{proyecto.frase}</p>
          <Reproductor id={proyecto.youtubeId} poster={proyecto.poster} titulo={proyecto.titulo} className="mt-10" />
        </motion.div>
      </section>

      {/* Fotogramas como hoja de contactos */}
      <section className="bg-[#1b1712] px-5 py-16 text-[#ece6da] sm:px-10">
        <p className="proto-b-mono text-[11px] uppercase tracking-[0.2em] text-[#ece6da]/60">Fotogramas</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {proyecto.fotogramas.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <img src={src} alt={`Fotograma ${i + 1} de ${proyecto.titulo}`} className="aspect-video w-full object-cover" />
              <figcaption className="proto-b-mono mt-1 text-[10px] text-[#ece6da]/50">
                {String(i + 1).padStart(2, "0")}A
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <Enlace
        href={`/prototipos/b/${siguiente.slug}`}
        estilo="cortinilla"
        rotulo={siguiente.titulo}
        className="group block border-t border-[#1b1712] px-5 pb-40 pt-12 sm:px-10"
      >
        <span className="proto-b-mono text-[11px] uppercase tracking-[0.2em] text-[#1b1712]/60">Siguiente →</span>
        <span className="proto-b-serif mt-2 block text-6xl transition-all duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-[#9c3d1c] sm:text-8xl">
          {siguiente.titulo}
        </span>
      </Enlace>
    </div>
  );
}
