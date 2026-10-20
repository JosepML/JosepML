"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { CursorVisor } from "../_comun/CursorVisor";
import { PASOS, PORTADA, PROYECTOS, RECONOCIMIENTOS, REEL, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { formatoTimecode, useTimecode } from "../_comun/hooks";
import { useClipHover } from "../_comun/useClipHover";
import { VideoFondo } from "../_comun/VideoFondo";
import { VideoYouTube } from "../_comun/VideoYouTube";
import { AperturaC } from "./AperturaC";

export const ROJO = "#ff2a1f";

export function PortadaC() {
  return (
    <div className="min-h-svh bg-black text-white">
      <AperturaC />
      <CursorVisor variante="c" />
      <MenuC />
      <CabeceraC />
      <Marquesina />
      <TrabajosC />
      <ProcesoC />
      <LlamadaC />
    </div>
  );
}

export function MenuC() {
  return (
    <header className="proto-c-mono absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 text-[11px] uppercase tracking-[0.2em] mix-blend-difference sm:px-8">
      <Enlace href="/prototipos/c" estilo="corte" className="proto-c-display text-2xl tracking-wide">
        JML
      </Enlace>
      <nav className="flex items-center gap-6">
        <span className="hidden sm:inline">Trabajos</span>
        <span className="hidden sm:inline">Servicios</span>
        <span className="hidden sm:inline">Sobre mí</span>
        <span className="hidden sm:inline">Blog</span>
        <span className="border border-white px-4 py-2 transition-colors hover:bg-white hover:text-black">Hablemos</span>
      </nav>
    </header>
  );
}

function Timecode() {
  const reducir = useReducedMotion();
  const tc = useTimecode(!reducir);
  return <span className="tabular-nums">{tc}</span>;
}

function CabeceraC() {
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Las líneas del titular se separan en direcciones opuestas
  const izq = useTransform(scrollYProgress, [0, 1], ["0%", reducir ? "0%" : "-25%"]);
  const der = useTransform(scrollYProgress, [0, 1], ["0%", reducir ? "0%" : "25%"]);

  return (
    <section ref={ref} className="relative h-svh overflow-hidden">
      <VideoFondo id={REEL.youtubeId} inicio={REEL.inicio} poster={REEL.poster} filtro="grayscale(1) contrast(1.25) brightness(0.8)" />

      {/* Datos del visor de cámara en las esquinas */}
      <div className="proto-c-mono pointer-events-none absolute inset-0 z-10 p-5 text-[10px] uppercase tracking-[0.2em] sm:p-8">
        <span className="absolute left-5 top-20 flex items-center gap-2 sm:left-8">
          <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: ROJO }} /> Rec
        </span>
        <span className="absolute right-5 top-20 sm:right-8">
          <Timecode />
        </span>
        <span className="absolute bottom-24 left-5 hidden sm:left-8 sm:block">24 fps · 2.39:1</span>
        <span className="absolute bottom-24 right-5 hidden sm:right-8 sm:block">Alicante · ES</span>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.01 }}
          className="proto-c-mono mb-4 text-[11px] uppercase tracking-[0.25em]"
        >
          {PORTADA.antetitulo}
        </motion.p>
        <h1 className="proto-c-display text-[19vw] uppercase leading-[0.9] mix-blend-difference sm:text-[13.5vw]">
          <motion.span style={{ x: izq }} className="block">
            Historias
          </motion.span>
          <motion.span style={{ x: der }} className="block text-right">
            hechas de <span style={{ color: ROJO }}>luz</span>
          </motion.span>
        </h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:items-end">
          <p className="max-w-md text-sm leading-relaxed text-white/85">{PORTADA.intro}</p>
          <div className="proto-c-mono flex gap-3 text-[11px] uppercase tracking-[0.2em] sm:justify-end">
            <a href="#trabajos-c" className="bg-white px-5 py-3 text-black transition-colors hover:bg-[#ff2a1f] hover:text-white">
              Ver trabajos
            </a>
            <span className="border border-white px-5 py-3 transition-colors hover:bg-white hover:text-black">Hablemos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquesina() {
  const items = RECONOCIMIENTOS.map((r) => `${r.premio} — ${r.obra}`);
  const fila = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="proto-c-display flex items-center whitespace-nowrap px-6 text-2xl uppercase sm:text-4xl">
          {t}
          <span className="ml-12 text-base">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden py-4 text-black" style={{ background: ROJO }} aria-label="Reconocimientos">
      <div className="marquesina flex w-max">
        {fila}
        {fila}
      </div>
    </div>
  );
}

function TrabajosC() {
  return (
    <section id="trabajos-c" className="py-20">
      <div className="proto-c-mono flex justify-between px-5 pb-6 text-[11px] uppercase tracking-[0.2em] text-white/60 sm:px-8">
        <span>Selección</span>
        <span>{String(PROYECTOS.length).padStart(2, "0")} clips</span>
      </div>
      {PROYECTOS.map((p, i) => (
        <BandaC key={p.slug} proyecto={p} n={i + 1} />
      ))}
    </section>
  );
}

function BandaC({ proyecto, n }: { proyecto: ProyectoProto; n: number }) {
  const { activo, encima, handlers } = useClipHover();
  const reducir = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      // Corte, no fundido: aparece de golpe
      transition={{ duration: reducir ? 0.3 : 0.01 }}
    >
      <Enlace
        href={`/prototipos/c/${proyecto.slug}`}
        estilo="corte"
        rotulo={proyecto.titulo}
        className="group relative block h-[62svh] overflow-hidden border-t border-white/20 sm:h-[72svh]"
        data-visor={formatoTimecode(proyecto.inicioClip * 24)}
        {...handlers}
      >
        <img
          data-transicion
          src={proyecto.poster}
          alt={`Fotograma de ${proyecto.titulo}`}
          className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-300 ${encima ? "" : "grayscale contrast-125"}`}
        />
        <VideoYouTube id={proyecto.youtubeId} inicio={proyecto.inicioClip} activo={activo} retraso={600} />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-8">
          <div className="proto-c-mono flex justify-between text-[11px] uppercase tracking-[0.2em]">
            <span>
              {String(n).padStart(2, "0")} / {proyecto.tipo}
            </span>
            <span className="text-right">{proyecto.papel}</span>
          </div>
          <div>
            {proyecto.laurel && (
              <p className="proto-c-mono mb-3 inline-block px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-black" style={{ background: ROJO }}>
                {proyecto.laurel.premio} · {proyecto.laurel.festival}
              </p>
            )}
            <h3 className="proto-c-display text-[13vw] uppercase leading-[0.85] sm:text-[8vw]">{proyecto.titulo}</h3>
          </div>
        </div>
      </Enlace>
    </motion.div>
  );
}

function ProcesoC() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  return (
    <section ref={ref} className="border-t border-white/20 px-5 py-24 sm:px-8">
      <h2 className="proto-c-display text-6xl uppercase sm:text-8xl">Cómo trabajamos</h2>
      {/* Regla de línea de tiempo que avanza con el scroll */}
      <div className="relative mt-12 h-6">
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/25" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.35)_0_1px,transparent_1px_2.5%)] [mask-image:linear-gradient(to_top,black_40%,transparent_40%)]" />
        <motion.div className="absolute inset-x-0 bottom-0 h-[3px] origin-left" style={{ scaleX: scrollYProgress, background: ROJO }} />
      </div>
      <div className="mt-10 grid gap-12 sm:grid-cols-4">
        {PASOS.map((paso, i) => (
          <div key={paso.titulo}>
            <span className="proto-c-mono text-[11px] tracking-[0.2em]" style={{ color: ROJO }}>
              {formatoTimecode(i * 24 * 15)}
            </span>
            <h3 className="proto-c-display mt-2 text-4xl uppercase">{paso.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{paso.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LlamadaC() {
  return (
    <section className="px-5 pb-40 pt-16 sm:px-8">
      <h2 className="proto-c-display text-[14vw] uppercase leading-[0.85] sm:text-[9vw]">
        ¿Tienes una historia <span style={{ color: ROJO }}>que contar?</span>
      </h2>
      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm text-white/80">Cuéntamela. Me encantará escucharla y pensar cómo llevarla a la pantalla.</p>
        <span className="proto-c-mono inline-block self-start bg-[#ff2a1f] px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white">
          ● Hablemos
        </span>
      </div>
    </section>
  );
}
