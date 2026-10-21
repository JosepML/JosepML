"use client";

import { AnimatePresence, motion } from "motion/react";
import { BloquePortada } from "./bloques/BloquePortada";
import { BloqueServicios } from "./bloques/BloqueServicios";
import { BloqueTrabajos } from "./bloques/BloqueTrabajos";
import { BloqueClientes, BloqueCifras, BloqueOpiniones } from "./bloques/BloquesConfianza";
import { BloqueBlog, BloqueLlamada, BloqueProceso, BloqueSobreMi, BloqueTexto, Pie } from "./bloques/BloquesPersonales";
import { useEffect } from "react";
import { img } from "../_comun/imagen";
import { CATALOGO, imagenesDe, PROYECTOS, SERVICIOS, type Bloque, type TipoBloque } from "./datos";
import { useEstadoD } from "./estado";

/** Cada tipo de bloque de la base de datos tiene su componente. Un tipo nuevo = un componente nuevo. */
const COMPONENTES: Record<TipoBloque, (p: { bloque: Bloque }) => React.ReactNode> = {
  portada: BloquePortada,
  servicios: BloqueServicios,
  trabajos: BloqueTrabajos,
  cifras: BloqueCifras,
  proceso: BloqueProceso,
  "sobre-mi": BloqueSobreMi,
  opiniones: BloqueOpiniones,
  clientes: BloqueClientes,
  blog: BloqueBlog,
  texto: BloqueTexto,
  llamada: BloqueLlamada,
};

/**
 * Con la página ya cargada y el navegador libre, descarga y decodifica en segundo plano las fotos de la
 * portada que aún no están en pantalla. Así, al llegar a cada sección, la imagen ya está lista y no cae
 * un fotograma largo justo en mitad del deslizamiento.
 */
function usePrecargaImagenes() {
  useEffect(() => {
    const ocioso = window.requestIdleCallback ?? ((f: () => void) => window.setTimeout(f, 1500));
    const cancelar = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ocioso(() => {
      const urls = new Set<string>();
      for (const s of SERVICIOS) imagenesDe(s.slug).forEach((u) => urls.add(img(u, 1200)));
      for (const p of PROYECTOS) {
        urls.add(img(p.poster, 1200));
        urls.add(img(p.poster, 256));
      }
      const sobre = CATALOGO["sobre-mi"].datos.imagen;
      if (sobre) urls.add(img(sobre, 1080));
      for (const u of urls) {
        const i = new Image();
        i.decoding = "async";
        i.src = u;
        i.decode().catch(() => {});
      }
    });
    return () => cancelar(id as number);
  }, []);
}

export function PortadaD() {
  const { bloques, editando } = useEstadoD();
  const visibles = bloques.filter((b) => b.visible);
  usePrecargaImagenes();

  return (
    <main>
      <AnimatePresence initial={false}>
        {visibles.map((b) => {
          const Componente = COMPONENTES[b.tipo];
          return (
            <motion.div
              key={b.id}
              id={`bloque-${b.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              // En escritorio cada sección ocupa al menos la pantalla entera con el contenido centrado: el scroll
              // mágico la deja encuadrada y no asoman las vecinas (la portada ya mide una pantalla; el proceso es más alto)
              className={`relative ${b.tipo !== "portada" && b.tipo !== "proceso" ? "lg:flex lg:min-h-svh lg:flex-col lg:justify-center" : ""} ${
                editando ? "outline-2 -outline-offset-8 outline-dashed outline-[var(--d-acento)]/40 rounded-[40px]" : ""
              }`}
            >
              {editando && (
                <span className="cristal cristal-fuerte absolute left-6 top-6 z-[40] rounded-full px-3 py-1 text-[11px] font-semibold">
                  {CATALOGO[b.tipo].nombre}
                </span>
              )}
              <Componente bloque={b} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <Pie />
    </main>
  );
}
