"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePunteroFino } from "./hooks";

/**
 * Cursor tipo visor de cámara. Aparece sobre los elementos con data-visor="Texto".
 * Solo con ratón y sin "reducir movimiento".
 */
export function CursorVisor({ variante }: { variante: "a" | "c" }) {
  const fino = usePunteroFino();
  const reducir = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [texto, setTexto] = useState<string | null>(null);

  const activo = fino && !reducir;

  useEffect(() => {
    if (!activo) return;
    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-visor]");
      setTexto(el ? el.dataset.visor || "" : null);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, [activo, x, y]);

  if (!activo) return null;

  const color = variante === "a" ? "#d9a35b" : "#ffffff";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy }}
      animate={{ opacity: texto !== null ? 1 : 0, scale: texto !== null ? 1 : 0.6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2" style={{ width: 84, height: 52, color }}>
        {variante === "a" ? (
          <>
            {/* Esquinas del visor */}
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-current" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-current" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-current" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-current" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.3em]">
              {texto}
            </span>
          </>
        ) : (
          <>
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current opacity-60" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current opacity-60" />
            <span className="absolute -right-16 -top-5 flex items-center gap-1.5 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff2a1f]" />
              {texto}
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
}
