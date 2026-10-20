"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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
 * Apertura solo en la primera visita de la sesión.
 * `?apertura` en la URL la fuerza (útil para revisar).
 */
export function useApertura(clave: string) {
  const [estado, setEstado] = useState<"pendiente" | "mostrar" | "no">("pendiente");

  useEffect(() => {
    let vista = false;
    try {
      vista = sessionStorage.getItem(clave) === "1";
    } catch {}
    const forzar = new URLSearchParams(window.location.search).has("apertura");
    setEstado(forzar || !vista ? "mostrar" : "no");
  }, [clave]);

  const terminar = () => {
    try {
      sessionStorage.setItem(clave, "1");
    } catch {}
    setEstado("no");
  };

  return { estado, terminar };
}

/** Código de tiempo tipo 00:00:12:08 que corre mientras el componente está montado. */
export function useTimecode(activo = true, fps = 24) {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    if (!activo) return;
    const inicio = performance.now();
    let id = 0;
    const tick = (t: number) => {
      setFrames(Math.floor(((t - inicio) / 1000) * fps));
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [activo, fps]);
  return formatoTimecode(frames, fps);
}

export function formatoTimecode(frames: number, fps = 24) {
  const f = frames % fps;
  const s = Math.floor(frames / fps);
  const dos = (n: number) => String(n).padStart(2, "0");
  return `${dos(Math.floor(s / 3600))}:${dos(Math.floor(s / 60) % 60)}:${dos(s % 60)}:${dos(f)}`;
}
