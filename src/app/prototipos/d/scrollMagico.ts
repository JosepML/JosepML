"use client";

import { animate } from "motion/react";
import { useEffect } from "react";

const CURVA_SCROLL = [0.65, 0, 0.25, 1] as const;
const DURACION = 1.05;
/** Margen para el menú flotante: la sección queda justo debajo */
const MARGEN = 0;

/**
 * "Scroll mágico": con la rueda del ratón, cada gesto lleva con una curva suave (empieza despacio, acelera
 * y frena con calma) al principio de la sección siguiente o anterior. Reglas para que no moleste:
 * - Solo responde a la rueda: nunca se mueve solo.
 * - Si la sección actual es más alta que la pantalla y aún queda contenido en esa dirección, el scroll es
 *   normal hasta llegar a su borde; entonces el siguiente gesto salta a la siguiente.
 * - Mientras dura el viaje y la inercia del trackpad que venga detrás, se ignora la rueda (no se encadenan saltos).
 * - Apagado en pantallas táctiles, con "reducir movimiento", con el editor abierto o con una ventana (vídeo) abierta.
 */
export function useScrollMagico(activo: boolean) {
  useEffect(() => {
    if (!activo || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let viajando = false;
    let ultimoEvento = 0;
    let control: { stop: () => void } | null = null;

    const puntos = () =>
      [...document.querySelectorAll<HTMLElement>("main > *")]
        .map((el) => ({ top: el.getBoundingClientRect().top + window.scrollY, alto: el.offsetHeight }))
        .filter((p) => p.alto > 40)
        .sort((a, b) => a.top - b.top);

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
      const alto = window.innerHeight;
      const lista = puntos();
      const abajo = e.deltaY > 0;
      // Sección en la que estamos: la última cuyo inicio ya ha pasado (con un poco de margen)
      const actual = [...lista].reverse().find((p) => p.top <= y + 8) ?? lista[0];
      if (!actual) return;

      if (abajo) {
        const finActual = actual.top + actual.alto;
        // Queda contenido de esta sección por debajo de la pantalla: scroll normal
        if (finActual > y + alto + 4) return;
        const siguiente = lista.find((p) => p.top > y + 8);
        if (!siguiente) return;
        viajar(e, siguiente.top - MARGEN);
      } else {
        // Hacia arriba: si estamos dentro de una sección alta y no en su inicio, scroll normal
        if (y > actual.top + 8 && actual.alto > alto) return;
        const destino = y > actual.top + 8 ? actual.top : ([...lista].reverse().find((p) => p.top < y - 8)?.top ?? 0);
        // Si la sección de arriba es más alta que la pantalla, se aterriza en su final, no en su principio
        const previa = lista.find((p) => p.top === destino);
        const final = previa && previa.alto > alto && destino < actual.top ? previa.top + previa.alto - alto : destino;
        viajar(e, Math.max(0, final - MARGEN));
      }
    };

    const viajar = (e: WheelEvent, destino: number) => {
      if (Math.abs(destino - window.scrollY) < 4) return;
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

    // Si el usuario coge la barra de scroll o pulsa teclas, se cancela el viaje
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
