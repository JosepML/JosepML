"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

/** Scroll suave con Lenis, solo con ratón y sin "reducir movimiento". */
export function SuavizadoScroll() {
  const reducir = useReducedMotion();
  useEffect(() => {
    if (reducir || !window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    return () => lenis.destroy();
  }, [reducir]);
  return null;
}
