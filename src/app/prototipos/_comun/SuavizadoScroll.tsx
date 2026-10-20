"use client";

import { useReducir } from "./hooks";
import Lenis from "lenis";
import { useEffect } from "react";

/** Scroll suave con Lenis, solo con ratón y sin "reducir movimiento". Los enlaces #ancla también se suavizan. */
export function SuavizadoScroll() {
  const reducir = useReducir();
  useEffect(() => {
    if (reducir || !window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -80 } });
    return () => lenis.destroy();
  }, [reducir]);
  return null;
}
