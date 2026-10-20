"use client";

import { AnimatePresence, motion } from "motion/react";
import { BloquePortada } from "./bloques/BloquePortada";
import { BloqueServicios } from "./bloques/BloqueServicios";
import { BloqueTrabajos } from "./bloques/BloqueTrabajos";
import { BloqueClientes, BloqueCifras, BloqueOpiniones } from "./bloques/BloquesConfianza";
import { BloqueBlog, BloqueLlamada, BloqueProceso, BloqueSobreMi, BloqueTexto, Pie } from "./bloques/BloquesPersonales";
import { CATALOGO, type Bloque, type TipoBloque } from "./datos";
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

export function PortadaD() {
  const { bloques, editando } = useEstadoD();
  const visibles = bloques.filter((b) => b.visible);

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
              className={`relative ${editando ? "outline-2 -outline-offset-8 outline-dashed outline-[var(--d-acento)]/40 rounded-[40px]" : ""}`}
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
