"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { useApertura } from "../_comun/hooks";

/**
 * Apertura A: rótulo de crédito sobre negro y, al final, las bandas negras
 * se abren hasta el formato panorámico. 1,4 s, solo en la primera visita.
 */
export function AperturaA() {
  const { estado, terminar } = useApertura("apertura-a");
  const reducir = useReducedMotion();
  const duracion = reducir ? 600 : 1400;

  useEffect(() => {
    if (estado !== "mostrar") return;
    const t = window.setTimeout(terminar, duracion);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, duracion]);

  if (estado === "no") return null;
  if (estado === "pendiente") return <div className="fixed inset-0 z-[95] bg-[#0d0b09]" />;

  if (reducir) {
    return (
      <motion.div
        className="fixed inset-0 z-[95] flex items-center justify-center bg-[#0d0b09]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <p className="font-display text-4xl">Josep Mira Lozano</p>
      </motion.div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[95]">
      {/* Dos mitades negras que se abren como bandas de cine */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0d0b09]"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ delay: 0.95, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0d0b09]"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 0.95, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.85, duration: 0.2 }}
      >
        <motion.p
          className="font-display text-4xl text-[#efe8dd] sm:text-6xl"
          initial={{ opacity: 0, letterSpacing: "0.3em", filter: "blur(8px)" }}
          animate={{ opacity: 1, letterSpacing: "0.04em", filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Josep Mira Lozano
        </motion.p>
        <motion.p
          className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#d9a35b]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          Director de fotografía
        </motion.p>
      </motion.div>
    </div>
  );
}
