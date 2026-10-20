"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { AntesDespues } from "../_comun/AntesDespues";
import { PASOS, PORTADA, PROYECTOS, RECONOCIMIENTOS, REEL, type ProyectoProto } from "../_comun/datos";
import { Enlace } from "../_comun/Enlace";
import { usePunteroFino } from "../_comun/hooks";
import { useClipHover } from "../_comun/useClipHover";
import { VideoFondo } from "../_comun/VideoFondo";
import { VideoYouTube } from "../_comun/VideoYouTube";
import { AperturaB } from "./AperturaB";

const CURVA = [0.22, 1, 0.36, 1] as const;
export const PAPEL = "bg-[#ece6da] text-[#1b1712]";

export function PortadaB() {
  return (
    <div className={`min-h-svh ${PAPEL}`}>
      <AperturaB />
      <MenuB />
      <CabeceraB />
      <IndiceB />
      <ColorB />
      <ReconocimientosB />
      <ProcesoB />
      <LlamadaB />
    </div>
  );
}

export function MenuB() {
  return (
    <header className="proto-b-mono flex items-center justify-between border-b border-[#1b1712]/15 px-5 py-4 text-[11px] uppercase tracking-[0.15em] sm:px-10">
      <Enlace href="/prototipos/b" estilo="cortinilla" rotulo="Josep Mira Lozano" className="proto-b-serif text-xl normal-case tracking-normal">
        Josep Mira Lozano
      </Enlace>
      <nav className="flex items-center gap-6">
        <span className="hidden sm:inline">Trabajos</span>
        <span className="hidden sm:inline">Servicios</span>
        <span className="hidden sm:inline">Sobre mí</span>
        <span className="hidden sm:inline">Blog</span>
        <span className="bg-[#1b1712] px-4 py-2 text-[#ece6da] transition-colors hover:bg-[#9c3d1c]">Hablemos</span>
      </nav>
    </header>
  );
}

function Palabras({ texto, retraso = 0 }: { texto: string; retraso?: number }) {
  const reducir = useReducedMotion();
  return (
    <>
      {texto.split(" ").map((p, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${p.startsWith("luz") ? "italic text-[#9c3d1c]" : ""}`}
            initial={{ y: reducir ? 0 : "105%", opacity: reducir ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: retraso + i * 0.08, duration: 0.8, ease: CURVA }}
          >
            {p}&nbsp;
          </motion.span>
        </span>
      ))}
    </>
  );
}

function CabeceraB() {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 15%"] });
  // La ventana del reel se abre hasta ocupar todo el ancho
  const ancho = useTransform(scrollYProgress, [0, 1], reducir ? ["100%", "100%"] : ["72%", "100%"]);

  return (
    <section className="pt-14 sm:pt-20">
      <div className="px-5 sm:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="proto-b-mono text-[11px] uppercase tracking-[0.2em] text-[#1b1712]/60"
        >
          {PORTADA.antetitulo}
        </motion.p>
        <h1 className="proto-b-serif mt-4 text-[17vw] leading-[0.88] sm:text-[11vw]">
          <Palabras texto={PORTADA.frase} retraso={0.25} />
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_1fr] sm:items-end">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-md text-base leading-relaxed text-[#1b1712]/80"
          >
            {PORTADA.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="proto-b-mono flex gap-3 text-[11px] uppercase tracking-[0.15em] sm:justify-end"
          >
            <a href="#indice-b" className="bg-[#1b1712] px-5 py-3 text-[#ece6da] transition-colors hover:bg-[#9c3d1c]">
              Ver trabajos ↓
            </a>
            <span className="border border-[#1b1712] px-5 py-3 transition-colors hover:bg-[#1b1712] hover:text-[#ece6da]">Hablemos</span>
          </motion.div>
        </div>
      </div>
      <div ref={ref} className="mt-14 flex justify-center">
        <motion.div style={{ width: ancho }} className="relative aspect-[2.39/1] overflow-hidden">
          <VideoFondo id={REEL.youtubeId} inicio={REEL.inicio} poster={REEL.poster} />
        </motion.div>
      </div>
      <p className="proto-b-mono flex justify-between px-5 pt-3 text-[10px] uppercase tracking-[0.2em] text-[#1b1712]/60 sm:px-10">
        <span>Reel provisional · Y el año que viene, ¿qué?</span>
        <span>2.39:1</span>
      </p>
    </section>
  );
}

function IndiceB() {
  const fino = usePunteroFino();
  const [actual, setActual] = useState<ProyectoProto | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30 });
  const sy = useSpring(y, { stiffness: 260, damping: 30 });

  return (
    <section
      id="indice-b"
      className="px-5 py-24 sm:px-10 sm:py-32"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="proto-b-mono flex items-baseline justify-between border-b border-[#1b1712] pb-3 text-[11px] uppercase tracking-[0.2em]">
        <span>Selección</span>
        <span className="text-[#1b1712]/50">{String(PROYECTOS.length).padStart(2, "0")} trabajos</span>
      </div>
      <ul>
        {PROYECTOS.map((p, i) => (
          <FilaB key={p.slug} proyecto={p} n={i + 1} alEntrar={() => setActual(p)} alSalir={() => setActual(null)} />
        ))}
      </ul>
      {/* Ventana flotante que sigue al ratón con el clip del proyecto */}
      {fino && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-40 aspect-video w-[28vw] max-w-[440px] overflow-hidden shadow-2xl"
          style={{ x: sx, y: sy, translateX: "12%", translateY: "-50%" }}
          animate={{ opacity: actual ? 1 : 0, scale: actual ? 1 : 0.85, rotate: actual ? -2 : 0 }}
          transition={{ duration: 0.3, ease: CURVA }}
        >
          {PROYECTOS.map((p) => (
            <VentanaB key={p.slug} proyecto={p} visible={actual?.slug === p.slug} />
          ))}
        </motion.div>
      )}
    </section>
  );
}

function VentanaB({ proyecto, visible }: { proyecto: ProyectoProto; visible: boolean }) {
  return (
    <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
      <img src={proyecto.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <VideoYouTube id={proyecto.youtubeId} inicio={proyecto.inicioClip} activo={visible} retraso={700} />
    </div>
  );
}

function FilaB({ proyecto, n, alEntrar, alSalir }: { proyecto: ProyectoProto; n: number; alEntrar: () => void; alSalir: () => void }) {
  const { encima, handlers } = useClipHover(0);
  return (
    <li className="border-b border-[#1b1712]/20">
      <Enlace
        href={`/prototipos/b/${proyecto.slug}`}
        estilo="cortinilla"
        rotulo={proyecto.titulo}
        className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-6 sm:grid-cols-[4rem_1fr_16rem_8rem] sm:py-8"
        onPointerEnter={() => {
          handlers.onPointerEnter();
          alEntrar();
        }}
        onPointerLeave={() => {
          handlers.onPointerLeave();
          alSalir();
        }}
      >
        <span className="proto-b-mono text-xs text-[#1b1712]/50">{String(n).padStart(2, "0")}</span>
        <span>
          {/* En móvil no hay hover: el fotograma va en la propia fila */}
          <img src={proyecto.poster} alt="" className="mb-4 aspect-[2.39/1] w-full object-cover sm:hidden" />
          <span
            className={`proto-b-serif block text-4xl leading-none transition-all duration-500 sm:text-6xl ${encima ? "translate-x-3 italic text-[#9c3d1c]" : ""}`}
          >
            {proyecto.titulo}
          </span>
          {proyecto.laurel && (
            <span className="proto-b-mono mt-2 block text-[10px] uppercase tracking-[0.15em] text-[#9c3d1c]">
              ✦ {proyecto.laurel.premio} · {proyecto.laurel.festival}
            </span>
          )}
        </span>
        <span className="proto-b-mono col-start-2 mt-2 text-[11px] uppercase tracking-[0.12em] text-[#1b1712]/70 sm:col-start-auto sm:mt-0">
          {proyecto.papel}
        </span>
        <span className="proto-b-mono hidden text-right text-[11px] uppercase tracking-[0.12em] text-[#1b1712]/50 sm:block">
          {proyecto.tipo}
          {proyecto.anio ? ` · ${proyecto.anio}` : ""}
        </span>
      </Enlace>
    </li>
  );
}

function ColorB() {
  return (
    <section className="bg-[#1b1712] px-5 py-24 text-[#ece6da] sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
        <div>
          <p className="proto-b-mono text-[11px] uppercase tracking-[0.2em] text-[#ece6da]/60">Antes / después</p>
          <h2 className="proto-b-serif mt-4 text-5xl leading-none sm:text-6xl">
            Del LOG a la <span className="italic text-[#e0a46a]">imagen final</span>
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#ece6da]/75">
            Arrastra la línea. El color se piensa desde el rodaje y lo acompaño hasta el final, para que el look llegue intacto.
          </p>
          <p className="proto-b-mono mt-4 text-[10px] uppercase tracking-[0.15em] text-[#ece6da]/40">
            Simulado en el prototipo · en la web irán los dos fotogramas reales
          </p>
        </div>
        <AntesDespues imagen={PROYECTOS[1].fotogramas[1]} />
      </div>
    </section>
  );
}

function ReconocimientosB() {
  return (
    <section className="px-5 py-24 sm:px-10">
      <div className="proto-b-mono border-b border-[#1b1712] pb-3 text-[11px] uppercase tracking-[0.2em]">Reconocimientos</div>
      <ul>
        {RECONOCIMIENTOS.map((r) => (
          <li key={r.premio} className="grid gap-1 border-b border-[#1b1712]/20 py-5 sm:grid-cols-[1fr_1fr_1fr] sm:gap-6">
            <span className="proto-b-serif text-2xl">{r.premio}</span>
            <span className="proto-b-mono text-[11px] uppercase tracking-[0.12em] text-[#1b1712]/70 sm:self-center">{r.donde}</span>
            <span className="proto-b-serif text-xl italic text-[#9c3d1c] sm:self-center sm:text-right">{r.obra}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcesoB() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  return (
    <section ref={ref} className="px-5 pb-24 sm:px-10">
      <h2 className="proto-b-serif text-5xl sm:text-7xl">
        Cómo <span className="italic">trabajamos</span>
      </h2>
      {/* Línea horizontal que se dibuja con el scroll */}
      <div className="relative mt-12 h-px bg-[#1b1712]/15">
        <motion.div className="absolute inset-0 origin-left bg-[#9c3d1c]" style={{ scaleX: scrollYProgress }} />
      </div>
      <div className="mt-8 grid gap-10 sm:grid-cols-4">
        {PASOS.map((paso, i) => (
          <motion.div
            key={paso.titulo}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.12, duration: 0.7 }}
          >
            <span className="proto-b-mono text-[11px] text-[#9c3d1c]">0{i + 1}</span>
            <h3 className="proto-b-serif mt-2 text-3xl">{paso.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#1b1712]/75">{paso.texto}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LlamadaB() {
  return (
    <section className="border-t border-[#1b1712] px-5 pb-40 pt-20 sm:px-10">
      <h2 className="proto-b-serif max-w-4xl text-6xl leading-[0.95] sm:text-8xl">
        ¿Tienes una historia <span className="italic text-[#9c3d1c]">que contar?</span>
      </h2>
      <p className="mt-6 max-w-md text-base text-[#1b1712]/80">
        Cuéntamela. Me encantará escucharla y pensar cómo llevarla a la pantalla.
      </p>
      <span className="proto-b-mono mt-8 inline-block bg-[#1b1712] px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#ece6da] transition-colors hover:bg-[#9c3d1c]">
        Hablemos →
      </span>
    </section>
  );
}
