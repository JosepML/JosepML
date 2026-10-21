"use client";

import { animate } from "motion/react";
import { useEffect } from "react";

const CURVA_SCROLL = [0.65, 0, 0.25, 1] as const;
const DURACION = 1.05;

type Punto = { destino: number; top: number; alto: number; libre: boolean };

/**
 * "Scroll mágico" (solo en la portada): con la rueda del ratón, cada gesto lleva con una curva suave al
 * siguiente punto. Puntos:
 * - Cada sección de la portada, centrada en la pantalla (si cabe) o desde su inicio (si es más alta).
 * - Dentro de una sección, los elementos marcados con data-punto (los pasos de "Cómo trabajamos"),
 *   cada uno centrado.
 * Reglas para que no moleste: solo responde a la rueda (nunca se mueve solo); en una sección más alta
 * que la pantalla y sin puntos, el scroll es normal hasta su borde; se ignora la inercia del trackpad
 * mientras dura el viaje; se cancela con teclado o clic; apagado en táctil, con "reducir movimiento",
 * con el editor abierto o con un vídeo abierto.
 */
export function useScrollMagico(activo: boolean) {
  useEffect(() => {
    if (!activo || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let viajando = false;
    let ultimoEvento = 0;
    let control: { stop: () => void } | null = null;

    const calcular = (): Punto[] => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const lista: Punto[] = [];
      for (const el of document.querySelectorAll<HTMLElement>("main > *")) {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        const alto = el.offsetHeight;
        if (alto < 40) continue;
        const subs = el.querySelectorAll<HTMLElement>("[data-punto]");
        if (subs.length) {
          for (const s of subs) {
            const rs = s.getBoundingClientRect();
            const centro = rs.top + window.scrollY + rs.height / 2;
            lista.push({ destino: centro - vh / 2, top, alto, libre: false });
          }
        } else {
          const cabe = alto <= vh + 2;
          lista.push({ destino: cabe ? top + alto / 2 - vh / 2 : top, top, alto, libre: !cabe });
        }
      }
      return lista
        .map((p) => ({ ...p, destino: Math.max(0, Math.min(max, Math.round(p.destino))) }))
        .sort((a, b) => a.destino - b.destino);
    };

    const rueda = (e: WheelEvent) => {
      const ahora = performance.now();
      const enCola = ahora - ultimoEvento < 180;
      ultimoEvento = ahora;

      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // zoom o gesto horizontal
      const objetivo = e.target instanceof Element ? e.target : null;
      if (objetivo?.closest("[data-sin-magia], aside, [aria-modal]")) return;
      if (document.querySelector("[aria-modal]")) return;

      // Durante el viaje, y mientras siga llegando la inercia del gesto que lo lanzó, no se hace nada más
      if (viajando || (enCola && control)) {
        e.preventDefault();
        return;
      }
      control = null;

      const y = window.scrollY;
      const vh = window.innerHeight;
      const puntos = calcular();
      const abajo = e.deltaY > 0;

      // Sección alta sin puntos que ocupa la pantalla: scroll normal mientras quede contenido en esa dirección
      const libre = puntos.find((p) => p.libre && p.top <= y + 4 && p.top + p.alto >= y + vh - 4);
      if (libre) {
        if (abajo && libre.top + libre.alto > y + vh + 4) return;
        if (!abajo && libre.top < y - 4) return;
      }

      const destino = abajo
        ? puntos.find((p) => p.destino > y + 6)?.destino
        : [...puntos].reverse().find((p) => p.destino < y - 6)?.destino;
      if (destino === undefined) return;
      viajar(e, destino);
    };

    const viajar = (e: WheelEvent, destino: number) => {
      e.preventDefault();
      viajando = true;
      control = animate(window.scrollY, destino, {
        duration: DURACION,
        ease: CURVA_SCROLL,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: () => {
          viajando = false;
        },
      });
    };

    // Si el usuario pulsa una tecla o hace clic, se cancela el viaje
    const cancelar = () => {
      control?.stop();
      viajando = false;
    };

    window.addEventListener("wheel", rueda, { passive: false });
    window.addEventListener("keydown", cancelar);
    window.addEventListener("pointerdown", cancelar);
    return () => {
      window.removeEventListener("wheel", rueda);
      window.removeEventListener("keydown", cancelar);
      window.removeEventListener("pointerdown", cancelar);
      control?.stop();
    };
  }, [activo]);
}
