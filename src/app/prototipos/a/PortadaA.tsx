"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CursorVisor } from "../_comun/CursorVisor";
import { PASOS, PORTADA, PROYECTOS, RECONOCIMIENTOS, REEL, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { Laurel } from "../_comun/Laurel";
import { useClipHover } from "../_comun/useClipHover";
import { VideoFondo } from "../_comun/VideoFondo";
import { VideoYouTube } from "../_comun/VideoYouTube";
import { AperturaA } from "./AperturaA";

const CURVA = [0.22, 1, 0.36, 1] as const;

export function PortadaA() {
  return (
    <div className="grano min-h-svh bg-[#0d0b09] text-[#efe8dd]">
      <AperturaA />
      <CursorVisor variante="a" />
      <MenuA />
      <CabeceraA />
      <SeleccionA />
      <ReconocimientosA />
      <ProcesoA />
      <LlamadaA />
    </div>
  );
}

export function MenuA() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10">
      <Enlace href="/prototipos/a" estilo="crecer" className="font-display text-xl tracking-wide">
        Josep Mira
      </Enlace>
      <nav className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-[#efe8dd]/80">
        <span className="hidden sm:inline">Trabajos</span>
        <span className="hidden sm:inline">Servicios</span>
        <span className="hidden sm:inline">Sobre mí</span>
        <span className="hidden sm:inline">Blog</span>
        <span className="rounded-full border border-[#d9a35b]/70 px-4 py-2 text-[#d9a35b] transition-colors hover:bg-[#d9a35b] hover:text-[#0d0b09]">
          Hablemos
        </span>
      </nav>
    </header>
  );
}

function CabeceraA() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Capas que se separan con el scroll: cada una a su velocidad
  // Las de arriba suben más rápido, así se separan y nunca se pisan
  const capa1 = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -240]);
  const capa2 = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -150]);
  const capa3 = useTransform(scrollYProgress, [0, 1], [0, reducir ? 0 : -70]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const escalaVideo = useTransform(scrollYProgress, [0, 1], [1, reducir ? 1 : 1.12]);
  const oscuro = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  return (
    <section ref={ref} className="vineta relative h-svh overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale: escalaVideo }}>
        <VideoFondo id={REEL.youtubeId} inicio={REEL.inicio} poster={REEL.poster} />
      </motion.div>
      <motion.div className="absolute inset-0 bg-[#0d0b09]" style={{ opacity: oscuro }} />
      {/* Bandas panorámicas 2.39:1 (en móvil vertical no tienen sentido) */}
      <div className="absolute inset-x-0 top-0 z-20 hidden h-[max(0px,calc((100svh-100vw/2.39)/2))] bg-[#0d0b09] sm:block" />
      <div className="absolute inset-x-0 bottom-0 z-20 hidden h-[max(0px,calc((100svh-100vw/2.39)/2))] bg-[#0d0b09] sm:block" />

      <motion.div style={{ opacity: opacidadTexto }} className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 sm:px-10 sm:pb-[max(4rem,calc((100svh-100vw/2.39)/2+2rem))]">
        <motion.div style={{ y: capa1 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: CURVA }}
            className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b] sm:text-xs"
          >
            {PORTADA.antetitulo}
          </motion.p>
        </motion.div>
        <motion.div style={{ y: capa2 }}>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.35, duration: 1.1, ease: CURVA }}
            className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] sm:text-8xl"
          >
            {PORTADA.frase}
          </motion.h1>
        </motion.div>
        <motion.div style={{ y: capa3 }} className="mt-6 flex max-w-xl flex-col gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="text-sm leading-relaxed text-[#efe8dd]/80 sm:text-base"
          >
            {PORTADA.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="flex gap-3 text-[11px] uppercase tracking-[0.25em]"
          >
            <a href="#seleccion-a" className="bg-[#efe8dd] px-5 py-3 text-[#0d0b09] transition-colors hover:bg-[#d9a35b]">
              Ver trabajos
            </a>
            <span className="border border-[#efe8dd]/40 px-5 py-3 transition-colors hover:border-[#d9a35b] hover:text-[#d9a35b]">
              Hablemos
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Revelar({ children, retraso = 0, className = "" }: { children: React.ReactNode; retraso?: number; className?: string }) {
  const reducir = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducir ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: retraso, ease: CURVA }}
    >
      {children}
    </motion.div>
  );
}

function SeleccionA() {
  const [primero, ...resto] = PROYECTOS;
  return (
    <section id="seleccion-a" className="px-5 py-24 sm:px-10 sm:py-32">
      <Revelar>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b]">Selección</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl sm:text-6xl">Algunos trabajos de los que estoy orgulloso</h2>
      </Revelar>
      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        <Revelar className="sm:col-span-2">
          <TarjetaA proyecto={primero} grande />
        </Revelar>
        {resto.map((p, i) => (
          <Revelar key={p.slug} retraso={i * 0.12}>
            <TarjetaA proyecto={p} />
          </Revelar>
        ))}
      </div>
    </section>
  );
}

function TarjetaA({ proyecto, grande = false }: { proyecto: ProyectoProto; grande?: boolean }) {
  const { activo, encima, handlers } = useClipHover();
  return (
    <Enlace
      href={`/prototipos/a/${proyecto.slug}`}
      estilo="crecer"
      className="group block"
      data-visor="Ver"
      {...handlers}
    >
      <div className={`relative overflow-hidden bg-black ${grande ? "aspect-[2.39/1]" : "aspect-[16/9]"}`}>
        <img
          data-transicion
          src={proyecto.poster}
          alt={`Fotograma de ${proyecto.titulo}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <VideoYouTube id={proyecto.youtubeId} inicio={proyecto.inicioClip} activo={activo} retraso={700} />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${encima ? "opacity-100" : "opacity-0"}`}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className={`font-display ${grande ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{proyecto.titulo}</h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#9a8f80]">
            {proyecto.papel} · {proyecto.tipo}
          </p>
        </div>
        {proyecto.laurel && (
          <div className="flex shrink-0 items-center gap-2 text-[#d9a35b]">
            <Laurel className="h-8 w-8" />
            <span className="max-w-32 text-[10px] uppercase leading-tight tracking-[0.15em]">{proyecto.laurel.premio}</span>
          </div>
        )}
      </div>
    </Enlace>
  );
}

function ReconocimientosA() {
  return (
    <section className="border-y border-[#efe8dd]/10 px-5 py-16 sm:px-10">
      <div className="grid gap-10 sm:grid-cols-4">
        {RECONOCIMIENTOS.map((r, i) => (
          <Revelar key={r.premio} retraso={i * 0.1} className="flex flex-col items-center text-center">
            <Laurel className="h-10 w-10 text-[#d9a35b]" />
            <p className="mt-3 font-display text-xl">{r.premio}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#9a8f80]">{r.donde}</p>
            <p className="mt-2 text-xs italic text-[#efe8dd]/70">{r.obra}</p>
          </Revelar>
        ))}
      </div>
    </section>
  );
}

function ProcesoA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  return (
    <section ref={ref} className="px-5 py-24 sm:px-10 sm:py-32">
      <Revelar>
        <p className="text-[10px] uppercase tracking-[0.35em] text-[#d9a35b]">Cómo trabajamos</p>
        <h2 className="mt-3 font-display text-4xl sm:text-6xl">La luz cuenta la mitad de la historia</h2>
      </Revelar>
      <div className="relative mt-14 pl-10 sm:pl-16">
        {/* Línea que se dibuja con el scroll */}
        <div className="absolute bottom-0 left-2 top-0 w-px bg-[#efe8dd]/15 sm:left-5">
          <motion.div className="h-full w-full origin-top bg-[#d9a35b]" style={{ scaleY: scrollYProgress }} />
        </div>
        <div className="flex flex-col gap-14">
          {PASOS.map((paso, i) => (
            <Revelar key={paso.titulo} className="relative">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9a8f80]">0{i + 1}</span>
                <h3 className="mt-1 font-display text-3xl">{paso.titulo}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#efe8dd]/75">{paso.texto}</p>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function LlamadaA() {
  return (
    <section className="px-5 pb-40 pt-16 text-center sm:px-10">
      <Revelar>
        <h2 className="font-display text-4xl sm:text-7xl">¿Tienes una historia que contar?</h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-[#efe8dd]/75">
          Cuéntamela. Me encantará escucharla y pensar cómo llevarla a la pantalla.
        </p>
        <span className="mt-8 inline-block border border-[#d9a35b] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[#d9a35b] transition-colors hover:bg-[#d9a35b] hover:text-[#0d0b09]">
          Hablemos
        </span>
      </Revelar>
    </section>
  );
}
