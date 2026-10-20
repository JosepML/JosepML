"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { useApertura } from "../_comun/hooks";

/**
 * Apertura B: una claqueta. Se cierra el palo (clac) y el papel sube como un telón.
 * 1,4 s, solo en la primera visita.
 */
export function AperturaB() {
  const { estado, terminar } = useApertura("apertura-b");
  const reducir = useReducedMotion();
  const duracion = reducir ? 600 : 1450;

  useEffect(() => {
    if (estado !== "mostrar") return;
    const t = window.setTimeout(terminar, duracion);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, duracion]);

  if (estado === "no") return null;
  if (estado === "pendiente") return <div className="fixed inset-0 z-[95] bg-[#ece6da]" />;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-[#ece6da] text-[#1b1712]"
      initial={{ y: 0, opacity: 1 }}
      animate={reducir ? { opacity: 0 } : { y: "-100%" }}
      transition={reducir ? { delay: 0.3, duration: 0.3 } : { delay: 1.0, duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-[min(80vw,420px)]">
        {/* Palo de la claqueta */}
        <motion.div
          className="h-10 origin-bottom-left bg-[repeating-linear-gradient(-45deg,#1b1712_0_18px,#ece6da_18px_36px)] ring-2 ring-[#1b1712]"
          initial={{ rotate: reducir ? 0 : -24 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.45, duration: 0.14, ease: "easeIn" }}
        />
        <div className="mt-1 h-10 bg-[repeating-linear-gradient(-45deg,#1b1712_0_18px,#ece6da_18px_36px)] ring-2 ring-[#1b1712]" />
        <div className="proto-b-mono mt-1 grid grid-cols-3 border-2 border-[#1b1712] text-[10px] uppercase tracking-[0.15em]">
          <div className="col-span-3 border-b-2 border-[#1b1712] px-3 py-3">
            <span className="text-[#1b1712]/50">Prod.</span>
            <p className="proto-b-serif mt-1 text-3xl normal-case tracking-normal">Josep Mira Lozano</p>
          </div>
          <div className="border-r-2 border-[#1b1712] px-3 py-2">
            <span className="text-[#1b1712]/50">Escena</span>
            <p className="text-base">01</p>
          </div>
          <div className="border-r-2 border-[#1b1712] px-3 py-2">
            <span className="text-[#1b1712]/50">Toma</span>
            <p className="text-base">01</p>
          </div>
          <div className="px-3 py-2">
            <span className="text-[#1b1712]/50">Rollo</span>
            <p className="text-base">A</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
