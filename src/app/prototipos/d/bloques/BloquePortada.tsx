"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePantallaAncha, useReducir } from "../../_comun/hooks";
import { VideoFondo } from "../../_comun/VideoFondo";
import { AJUSTES, type Bloque } from "../datos";
import { Icono } from "../Iconos";
import { CURVA, Disponible, ModalVideo } from "../piezas";

const PAPELES = ["director de fotografía", "filmmaker", "editor"];

/**
 * Portada: el reel vive en una tarjeta redondeada que, al hacer scroll, se aleja
 * (escala y radio) como en las páginas de producto de Apple, y el texto sube y se funde.
 */
export function BloquePortada({ bloque }: { bloque: Bloque }) {
  const { antetitulo, titulo, texto } = bloque.datos;
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducir();
  const ancha = usePantallaAncha();
  const anima = ancha && !reducir;
  const [reel, setReel] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Los rangos son fijos (useTransform guarda los del primer render); sin animación no se aplican
  const escala = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const radio = useTransform(scrollYProgress, [0, 1], [28, 56]);
  const yTexto = useTransform(scrollYProgress, [0, 0.55], [0, -140]);
  const opTexto = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opVer = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const escalaVer = useTransform(scrollYProgress, [0.45, 0.8], [0.9, 1]);

  const palabras = titulo.trim().split(/\s+/);

  return (
    <section ref={ref} className={anima ? "relative h-[200svh]" : "relative"}>
      <div className={`${anima ? "sticky top-0" : "relative"} h-svh min-h-[620px] p-2 sm:p-3`}>
        <motion.div
          className="relative h-full w-full overflow-hidden bg-black"
          style={anima ? { scale: escala, borderRadius: radio } : { borderRadius: 28 }}
        >
          <VideoFondo id={AJUSTES.reel.youtubeId} inicio={AJUSTES.reel.inicio} poster={AJUSTES.reel.poster} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(229,9,20,0.18),transparent_60%)]" />

          {/* Texto principal */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 text-white sm:px-12 sm:pb-14"
            style={anima ? { y: yTexto, opacity: opTexto } : undefined}
          >
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: CURVA }}>
              <Disponible className="!border-white/20 !bg-white/10 text-white" />
            </motion.div>
            {antetitulo && (
              <motion.p
                className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                {antetitulo}
              </motion.p>
            )}
            <h1 className="mt-3 max-w-6xl text-[clamp(3rem,10vw,9.5rem)] font-black leading-[0.9] tracking-[-0.055em]">
              {palabras.map((p, i) => {
                const ultima = i === palabras.length - 1;
                return (
                  <motion.span
                    key={`${p}-${i}`}
                    className={`mr-[0.2em] inline-block ${ultima ? "d-serif pr-[0.05em] text-[1.04em] font-normal tracking-[-0.02em]" : ""}`}
                    initial={{ opacity: 0, y: reducir ? 0 : 50, filter: reducir ? "none" : "blur(16px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.45 + i * 0.09, duration: 1, ease: CURVA }}
                  >
                    {ultima ? <span className="bg-gradient-to-r from-[#ff4d4d] to-[#ffb36b] bg-clip-text text-transparent">{p}</span> : p}
                  </motion.span>
                );
              })}
            </h1>

            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.9, ease: CURVA }}
              >
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Soy <PalabraRotatoria palabras={PAPELES} />
                </p>
                {texto && <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">{texto}</p>}
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.9, ease: CURVA }}
              >
                <button
                  type="button"
                  onClick={() => setReel(true)}
                  className="boton border border-white/25 bg-white/10 px-5 py-3.5 text-sm text-white backdrop-blur-xl hover:bg-white/20"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                    <Icono nombre="play" className="ml-0.5 h-3 w-3" />
                  </span>
                  Ver reel
                </button>
                <Link href="#trabajos" className="boton border border-white/25 bg-white/10 px-6 py-3.5 text-sm text-white backdrop-blur-xl hover:bg-white/20">
                  Ver trabajos
                </Link>
                <Link href="#llamada" className="boton boton-acento px-6 py-3.5 text-sm">
                  Hablemos
                  <Icono nombre="flecha" className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Al alejarse la tarjeta aparece la invitación a ver el reel completo */}
          {anima && (
            <motion.button
              type="button"
              onClick={() => setReel(true)}
              style={{ opacity: opVer, scale: escalaVer }}
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white"
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-2xl transition-transform duration-500 hover:scale-110">
                <Icono nombre="play" className="ml-1 h-8 w-8" />
              </span>
              <span className="text-sm font-semibold tracking-tight">Mira el reel con sonido</span>
            </motion.button>
          )}

          {/* Indicador de scroll */}
          {anima && (
            <motion.div style={{ opacity: opTexto }} className="absolute bottom-6 right-8 z-10 hidden items-center gap-2 text-xs text-white/60 lg:flex">
              <span className="relative h-9 w-5 rounded-full border border-white/40">
                <motion.span
                  className="absolute left-1/2 top-1.5 h-2 w-1 -translate-x-1/2 rounded-full bg-white/80"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              Desliza
            </motion.div>
          )}
        </motion.div>
      </div>
      <ModalVideo id={AJUSTES.reel.youtubeId} abierto={reel} alCerrar={() => setReel(false)} />
    </section>
  );
}

function PalabraRotatoria({ palabras }: { palabras: string[] }) {
  const [i, setI] = useState(0);
  const reducir = useReducir();

  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % palabras.length), 2400);
    return () => window.clearInterval(t);
  }, [palabras.length]);

  return (
    // Las palabras se apilan en la misma celda para que una entre mientras la otra sale
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence initial={false}>
        <motion.span
          key={palabras[i]}
          className="d-serif inline-block whitespace-nowrap text-[1.15em] text-[#ffb36b] [grid-area:1/1]"
          initial={{ y: reducir ? 0 : "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: reducir ? 0 : "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: CURVA }}
        >
          {palabras[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
