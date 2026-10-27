"use client";

import Link from "next/link";
import { useState } from "react";
import { imagenesDe, mediosDeServicio } from "@/lib/datos/seleccion";
import type { Bloque, Medio, Servicio } from "@/lib/datos/tipos";
import { lista, objeto, texto } from "@/lib/datos/util";
import { RUTAS } from "@/lib/rutas";
import { Enlace } from "../comun/Enlace";
import { usePunteroFino } from "../comun/hooks";
import { Icono } from "../Iconos";
import { useDatos } from "../marco/DatosWeb";
import { Diapositivas, Revelar, Titular } from "../piezas";

/** Desvanece la foto de una tarjeta antes del borde inferior, para que no asome en el suavizado de la esquina */
export const MASCARA_BORDE = "[mask-image:linear-gradient(to_top,transparent,#000_10%)]";

/** Icono de cada servicio por su slug; uno nuevo creado desde el panel lleva la cámara */
export const ICONOS_SERVICIO: Record<string, string> = { "direccion-de-fotografia": "camara", filmmaker: "claqueta", edicion: "ritmo" };

/**
 * Servicios: en escritorio, tres tarjetas verticales con revelación al pasar el ratón.
 * En móvil, tarjetas horizontales compactas para que quepan las tres en una sola pantalla
 * y el usuario las vea de un solo vistazo.
 */
export function BloqueServicios({ bloque, ancla }: { bloque: Bloque; ancla?: string }) {
  const { servicios, proyectos } = useDatos();
  return (
    <section id={ancla} className="px-4 py-12 sm:px-8 sm:py-24 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />
        <div className="mt-8 grid gap-2.5 sm:mt-14 sm:gap-4 md:grid-cols-3 lg:mt-[5svh]">
          {servicios.map((s, i) => (
            <Revelar key={s.slug} retraso={i * 0.08}>
              <Tarjeta servicio={s} imagenes={imagenesDe(s, proyectos)} medios={mediosDeServicio(s, proyectos)} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Marco común de las tarjetas con foto: recorte con clip-path adaptable a móvil y escritorio,
 * degradado por encima y contenido que se revela.
 */
function TarjetaFoto({
  imagenes,
  medios,
  ancho,
  className,
  suave = false,
  children,
}: {
  imagenes: string[];
  medios?: Medio[];
  ancho: 1200 | 1920;
  className: string;
  /** Tarjetas apaisadas (filmmaker): la foto a todo color y la sombra solo al pie; se oscurece al pasar el ratón,
   *  cuando aparece la frase */
  suave?: boolean;
  children: (encima: boolean, fino: boolean) => React.ReactNode;
}) {
  const fino = usePunteroFino();
  const [encima, setEncima] = useState(false);
  return (
    <div
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={() => setEncima(false)}
      className={`group relative isolate h-full overflow-hidden rounded-[22px] bg-black text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 [clip-path:inset(0_round_22px)] md:rounded-[36px] md:[clip-path:inset(0_round_36px)] ${className}`}
    >
      {/* Máscara: la foto se desvanece del todo antes del borde inferior */}
      <Diapositivas
        imagenes={imagenes}
        medios={medios}
        activo={encima && fino}
        ancho={ancho}
        className={`${suave ? "" : "opacity-95 transition-opacity duration-700 group-hover:opacity-100"} ${MASCARA_BORDE}`}
      />
      {/* Degradados de contraste para legibilidad de títulos */}
      {suave ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.3)_30%,transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.1)_100%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.92)_14%,rgba(0,0,0,0.5)_34%,rgba(0,0,0,0.12)_52%,transparent_70%)]" />
      )}
      {children(encima, fino)}
    </div>
  );
}

/** Lo que se revela al pasar el ratón: oculto y un poco más abajo en reposo (con ratón), visible siempre en táctil. */
function Revelable({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid transition-[grid-template-rows,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:[grid-template-rows:0fr] [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:[grid-template-rows:1fr]">
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Tarjeta({ servicio: s, imagenes, medios }: { servicio: Servicio; imagenes: string[]; medios?: Medio[] }) {
  return (
    <Link href={RUTAS.servicio(s.slug)} className="block">
      <TarjetaFoto
        imagenes={imagenes}
        medios={medios}
        ancho={1920}
        className="h-[105px] sm:h-[125px] md:h-auto md:aspect-[3/4] lg:aspect-auto lg:h-[min(56svh,600px)]"
      >
        {() => (
          <>
            {/* Versión móvil (< md): tarjeta horizontal para ver las 3 en pantalla completa sin scrolling largo */}
            <div className="relative flex h-full items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:hidden">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                  <Icono nombre={ICONOS_SERVICIO[s.slug] ?? "camara"} className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold leading-tight tracking-[-0.02em]">{s.nombre}</h3>
                  <p className="jm-serif mt-0.5 truncate text-[15px] leading-tight text-[#ffc07a]">{s.frase}</p>
                </div>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/40">
                <Icono nombre="flecha" className="h-4 w-4" />
              </span>
            </div>

            {/* Versión escritorio (>= md): tarjeta vertical cinematográfica completa */}
            <div className="relative hidden h-full flex-col justify-between p-7 md:flex">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
                  <Icono nombre={ICONOS_SERVICIO[s.slug] ?? "camara"} className="h-6 w-6" />
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:scale-110">
                  <Icono nombre="flecha" className="h-4 w-4" />
                </span>
              </div>
              <div>
                <h3 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] [text-wrap:balance]">{s.nombre}</h3>
                {/* Entre el título y el enlace aparecen, al pasar el ratón, la frase y para quién */}
                <Revelable>
                  <p className="jm-serif mt-2 text-[26px] leading-tight text-[#ffc07a]">{s.frase}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.paraQuien.slice(0, 3).map((q) => (
                      <span key={q} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
                        {q}
                      </span>
                    ))}
                  </div>
                </Revelable>
                {/* Siempre visible: en reposo sube el título para que no quede pegado abajo */}
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 transition-[margin] duration-700 group-hover:mt-6">
                  Ver proyectos y cómo trabajo
                  <Icono nombre="flecha" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </>
        )}
      </TarjetaFoto>
    </Link>
  );
}

/**
 * Lo que grabo como filmmaker: la rejilla de servicios de la web antigua (spots, eventos, bodas, redes...).
 * En móvil se organiza en 2 columnas compactas para que se visualicen los proyectos con armonía.
 */
export function BloqueFilmmaker({ bloque }: { bloque: Bloque }) {
  const { proyectos, medios } = useDatos();
  const piezas = lista(bloque.datos.piezas).flatMap((x) => {
    const o = objeto(x);
    const p = proyectos.find((y) => y.id === o.proyecto || y.slug === o.proyecto);
    const foto = typeof o.imagen === "string" ? medios[o.imagen]?.url : undefined;
    const href = texto(o.href);
    return p || href ? [{ nombre: texto(o.nombre), texto: texto(o.texto), proyecto: p, href, foto: foto ?? p?.poster?.url }] : [];
  });
  const enlace = objeto(bloque.datos.enlace);
  return (
    <section className="px-4 py-12 sm:px-8 sm:py-24 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />
          {texto(enlace.href) && (
            <Revelar retraso={0.1}>
              <Link
                href={texto(enlace.href)}
                className="boton border border-[var(--jm-borde)] px-5 py-2.5 text-sm hover:bg-[var(--jm-cristal)]"
              >
                {texto(enlace.texto) || "Ver más"}
                <Icono nombre="flecha" className="h-4 w-4" />
              </Link>
            </Revelar>
          )}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-3 lg:mt-[5svh] lg:grid-cols-3">
          {piezas.map(({ proyecto: p, ...f }, i) => {
            return (
              <Revelar key={`${f.nombre}-${i}`} retraso={(i % 3) * 0.07 + Math.floor(i / 3) * 0.1}>
                <Enlace href={f.href || RUTAS.proyecto(p!.slug)} fundido={!!f.href} className="block" aria-label={f.href ? `${f.nombre}: cómo trabajo y proyectos` : `${f.nombre}: ver ${p?.titulo}`}>
                  <TarjetaFoto suave imagenes={f.foto ? [f.foto] : []} ancho={1200} className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[min(26svh,280px)]">
                    {() => (
                      <div className="relative flex h-full flex-col justify-end p-3.5 sm:p-6 [text-shadow:0_2px_18px_rgba(0,0,0,0.5)]">
                        <h3 className="text-sm font-bold leading-tight tracking-[-0.025em] sm:text-2xl">{f.nombre}</h3>
                        <Revelable>
                          <p className="mt-1 line-clamp-2 max-w-sm text-xs leading-snug text-white/80 [text-wrap:pretty] sm:mt-1.5 sm:line-clamp-none sm:text-[15px]">{f.texto}</p>
                          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffc07a] sm:mt-3 sm:gap-1.5 sm:text-xs">
                            {f.href ? `Ver ${f.nombre.toLowerCase()}` : p?.titulo}
                            <Icono nombre="flecha" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </span>
                        </Revelable>
                      </div>
                    )}
                  </TarjetaFoto>
                </Enlace>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}
