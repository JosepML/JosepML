"use client";

import { useSyncExternalStore } from "react";

function useMedia(consulta: string, porDefecto = false) {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    () => window.matchMedia(consulta).matches,
    () => porDefecto,
  );
}

/** Ratón o trackpad: hay hover de verdad. En móvil y tableta es false. */
export function usePunteroFino() {
  return useMedia("(hover: hover) and (pointer: fine)");
}

/** Pantalla ancha (tableta horizontal y ordenador). */
export function usePantallaAncha() {
  return useMedia("(min-width: 768px)");
}

/**
 * "Reducir movimiento" del sistema del visitante. La web lo respeta, pero sin quedarse quieta: los
 * fundidos y el vídeo de portada siguen; lo que se quita es el desplazamiento (subidas, parallax,
 * desenfoques que se aclaran, marquesinas y el scroll mágico). Así se ve bien también en el PC de Josep,
 * que tiene desactivados los efectos de animación de Windows.
 */
export function useReducir() {
  return useMedia("(prefers-reduced-motion: reduce)");
}
