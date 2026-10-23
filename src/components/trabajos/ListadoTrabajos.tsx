"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Proyecto, Servicio } from "@/lib/datos/tipos";
import { TarjetaProyecto } from "../bloques/BloqueTrabajos";
import { CURVA, Revelar } from "../piezas";

type Filtro = { slug: string; nombre: string };

/** Fila de pastillas de filtro, la misma de Selección en Inicio */
function Pastillas({ id, filtros, actual, alElegir, etiqueta }: { id: string; filtros: Filtro[]; actual: string; alElegir: (s: string) => void; etiqueta: string }) {
  return (
    <div className="cristal sin-barra flex w-fit max-w-full gap-1 overflow-x-auto rounded-full p-1" role="tablist" aria-label={etiqueta}>
      {filtros.map((f) => (
        <button
          key={f.slug}
          type="button"
          role="tab"
          aria-selected={actual === f.slug}
          onClick={() => alElegir(f.slug)}
          className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
            actual === f.slug ? "text-white" : "text-[var(--jm-suave)] hover:text-[var(--jm-texto)]"
          }`}
        >
          {actual === f.slug && (
            <motion.span
              layoutId={`jm-filtro-${id}`}
              className="absolute inset-0 rounded-full bg-[var(--jm-acento)] shadow-[0_6px_20px_-6px_rgba(229,9,20,0.7)]"
              transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            />
          )}
          <span className="relative">{f.nombre}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * Todos los trabajos del listado general (las recreaciones tienen su página), con filtro por servicio y por
 * tipo a la vez. Solo salen los filtros que tienen algún proyecto.
 */
export function ListadoTrabajos({ proyectos: todos, servicios }: { proyectos: Proyecto[]; servicios: Servicio[] }) {
  const proyectos = todos.filter((p) => p.tipo?.enListadoGeneral !== false);
  const [servicio, setServicio] = useState("todos");
  const [tipo, setTipo] = useState("todos");

  const deServicio = (p: Proyecto) => servicio === "todos" || p.servicios.some((s) => s.slug === servicio);
  const deTipo = (p: Proyecto) => tipo === "todos" || p.tipo?.slug === tipo;
  const filtrosServicio = [{ slug: "todos", nombre: "Todos" }, ...servicios.filter((s) => proyectos.some((p) => p.servicios.some((x) => x.slug === s.slug)))];
  const tipos = new Map(proyectos.flatMap((p) => (p.tipo ? [[p.tipo.slug, p.tipo.nombre] as const] : [])));
  const filtrosTipo = [{ slug: "todos", nombre: "Todos los tipos" }, ...[...tipos].map(([slug, nombre]) => ({ slug, nombre }))];
  const visibles = proyectos.filter((p) => deServicio(p) && deTipo(p));

  return (
    <>
      <Revelar retraso={0.15} className="mt-10 flex flex-col gap-3">
        <Pastillas id="servicio" etiqueta="Filtrar por servicio" filtros={filtrosServicio} actual={servicio} alElegir={setServicio} />
        {filtrosTipo.length > 2 && <Pastillas id="tipo" etiqueta="Filtrar por tipo" filtros={filtrosTipo} actual={tipo} alElegir={setTipo} />}
      </Revelar>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${servicio}-${tipo}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: CURVA }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {visibles.map((p) => (
            <TarjetaProyecto key={p.slug} proyecto={p} />
          ))}
          {visibles.length === 0 && <p className="text-[var(--jm-suave)]">No hay trabajos con este filtro.</p>}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
