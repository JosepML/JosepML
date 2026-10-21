"use client";

import Link from "next/link";
import { useState } from "react";
import { usePunteroFino } from "../../_comun/hooks";
import { imagenesDe, SERVICIOS, type Bloque, type ServicioD } from "../datos";
import { Icono } from "../Iconos";
import { RAIZ } from "../rutas";
import { Diapositivas, Revelar, Titular } from "../piezas";

export const ICONOS_SERVICIO: Record<string, string> = { "direccion-de-fotografia": "camara", filmmaker: "claqueta", edicion: "ritmo" };

/**
 * Servicios: tres tarjetas iguales con lo justo (nombre, frase, para quién) que llevan a la página de
 * cada servicio, donde vive el resto. Al pasar el ratón solo cambian transform y opacidad: antes las
 * tarjetas cambiaban de ancho y eso obligaba a recolocar toda la sección en cada fotograma.
 */
export function BloqueServicios({ bloque }: { bloque: Bloque }) {
  return (
    <section id={bloque.id === "servicios" ? "servicios" : undefined} className="px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />
        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-[5svh]">
          {SERVICIOS.map((s, i) => (
            <Revelar key={s.slug} retraso={i * 0.08}>
              <Tarjeta servicio={s} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tarjeta({ servicio: s }: { servicio: ServicioD }) {
  const fino = usePunteroFino();
  const [encima, setEncima] = useState(false);

  return (
    <Link
      href={`${RAIZ}/servicios/${s.slug}`}
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[36px] bg-black text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 md:aspect-[3/4] lg:aspect-auto lg:h-[min(56svh,600px)]"
    >
      <Diapositivas imagenes={imagenesDe(s.slug)} activo={encima && fino} ancho={750} className="opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />

      <div className="relative flex h-full flex-col justify-between p-7">
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
            <Icono nombre={ICONOS_SERVICIO[s.slug]} className="h-6 w-6" />
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:scale-110">
            <Icono nombre="flecha" className="h-4 w-4" />
          </span>
        </div>

        <div>
          <h3 className="text-[28px] font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">{s.nombre}</h3>
          <p className="d-serif mt-2 text-[26px] leading-tight text-[#ffc07a]">{s.frase}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {s.paraQuien.slice(0, 3).map((q) => (
              <span key={q} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                {q}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
            Ver proyectos y cómo trabajo
            <Icono nombre="flecha" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
