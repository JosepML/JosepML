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
 * "Reducir movimiento". La web se mueve siempre como el prototipo D aprobado, aunque el sistema pida
 * reducir movimiento: Josep (que tiene desactivados los efectos de animación de Windows) lo pidió así, y
 * con el ajuste del sistema se perdían los orbes del fondo, las marquesinas y el scroll mágico. Todo el
 * código que se adapta sigue pasando por aquí: si algún día se quiere respetar el sistema (repaso de
 * accesibilidad, S20), basta con devolver useMedia("(prefers-reduced-motion: reduce)").
 */
export function useReducir() {
  return false;
}
