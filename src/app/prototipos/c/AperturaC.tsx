"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useApertura } from "../_comun/hooks";

/**
 * Apertura C: cola de película (3, 2, 1) con la aguja barriendo el círculo,
 * un fotograma en blanco y corte. 1,3 s, solo en la primera visita.
 */
export function AperturaC() {
  const { estado, terminar } = useApertura("apertura-c");
  const reducir = useReducedMotion();
  const [n, setN] = useState(3);

  useEffect(() => {
    if (estado !== "mostrar") return;
    if (reducir) {
      const t = window.setTimeout(terminar, 500);
      return () => window.clearTimeout(t);
    }
    const t1 = window.setTimeout(() => setN(2), 380);
    const t2 = window.setTimeout(() => setN(1), 760);
    const t3 = window.setTimeout(() => setN(0), 1140);
    const t4 = window.setTimeout(terminar, 1240);
    return () => [t1, t2, t3, t4].forEach((t) => window.clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, reducir]);

  if (estado === "no") return null;
  if (estado === "pendiente" || reducir) return <div className="fixed inset-0 z-[95] bg-black" />;

  // Fotograma en blanco justo antes del corte
  if (n === 0) return <div className="fixed inset-0 z-[95] bg-white" />;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-[#111] text-white">
      {/* Cruz de la cola de película */}
      <span className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
      <div className="relative flex h-[min(60vw,340px)] w-[min(60vw,340px)] items-center justify-center rounded-full border-2 border-white/70">
        <div className="absolute inset-3 rounded-full border border-white/40" />
        <motion.div
          key={n}
          className="absolute inset-0 rounded-full"
          style={{ background: "conic-gradient(rgba(255,255,255,0.22) var(--giro), transparent 0)" }}
          initial={{ "--giro": "0deg" } as Record<string, string>}
          animate={{ "--giro": "360deg" } as Record<string, string>}
          transition={{ duration: 0.38, ease: "linear" }}
        />
        <span className="proto-c-display relative text-[min(34vw,200px)] leading-none">{n}</span>
      </div>
      <span className="proto-c-mono absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.3em] text-white/60">
        Josep Mira Lozano · Rollo 1
      </span>
    </div>
  );
}
