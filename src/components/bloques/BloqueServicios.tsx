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
 * Servicios: tres tarjetas iguales. En reposo, solo el icono y el nombre; al pasar el ratón sube el
 * resto (la frase, para quién y el enlace) con un fundido. En pantallas táctiles se ve todo.
 * Solo cambian transform y opacidad.
 */
export function BloqueServicios({ bloque, ancla }: { bloque: Bloque; ancla?: string }) {
  const { servicios, proyectos } = useDatos();
  return (
    <section id={ancla} className="px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} texto={bloque.datos.texto} />
        <div className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-[5svh]">
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
 * Marco común de las tarjetas con foto: recorte con clip-path y el mismo radio (así la imagen, que hace
 * zoom, nunca asoma por debajo de la sombra), degradado por encima y contenido que se revela al pasar el ratón.
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
      className={`group relative isolate h-full overflow-hidden bg-black text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${className}`}
      style={{ clipPath: "inset(0 round 36px)", borderRadius: 36 }}
    >
      {/* Máscara: la foto se desvanece del todo antes del borde inferior. Con zoom va en su propia capa y se
          recorta aparte del degradado, así que en el suavizado del borde se colaba 1 px gris de la foto */}
      <Diapositivas
        imagenes={imagenes}
        medios={medios}
        activo={encima && fino}
        ancho={ancho}
        className={`${suave ? "" : "opacity-95 transition-opacity duration-700 group-hover:opacity-100"} ${MASCARA_BORDE}`}
      />
      {/* Negro del todo en el quinto inferior, donde va el texto: si no, lo que hay al pie de la foto (el borde
          de una persiana, el suelo...) se transparentaba como una raya bajo el título */}
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
      <TarjetaFoto imagenes={imagenes} medios={medios} ancho={1200} className="aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:h-[min(56svh,600px)]">
        {() => (
          <div className="relative flex h-full flex-col justify-between p-7">
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
        )}
      </TarjetaFoto>
    </Link>
  );
}

/**
 * Lo que grabo como filmmaker: la rejilla de servicios de la web antigua (spots, eventos, bodas, redes...)
 * con la estética D. Seis tarjetas con la foto de un trabajo real de cada tipo; en reposo el nombre, al
 * pasar el ratón la frase. Cada una lleva a la página de su especialidad (con fundido: la foto no crece, porque
 * allí no es la cabecera) o, si no tiene, a ese trabajo.
 */
export function BloqueFilmmaker({ bloque }: { bloque: Bloque }) {
  const { proyectos, medios } = useDatos();
  // Cada pieza: nombre, frase, el proyecto (id) que pone la foto, la página de la especialidad (`href`) y una
  // foto propia (`imagen`, normalmente de la galería del proyecto, para no repetir su portada). Sin página, lleva
  // a la ficha del proyecto. Sin página ni proyecto publicado, no sale
  const piezas = lista(bloque.datos.piezas).flatMap((x) => {
    const o = objeto(x);
    const p = proyectos.find((y) => y.id === o.proyecto || y.slug === o.proyecto);
    const foto = typeof o.imagen === "string" ? medios[o.imagen]?.url : undefined;
    const href = texto(o.href);
    return p || href ? [{ nombre: texto(o.nombre), texto: texto(o.texto), proyecto: p, href, foto: foto ?? p?.poster?.url }] : [];
  });
  const enlace = objeto(bloque.datos.enlace);
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
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
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-[5svh] lg:grid-cols-3">
          {piezas.map(({ proyecto: p, ...f }, i) => {
            return (
              <Revelar key={`${f.nombre}-${i}`} retraso={(i % 3) * 0.07 + Math.floor(i / 3) * 0.1}>
                <Enlace href={f.href || RUTAS.proyecto(p!.slug)} fundido={!!f.href} className="block" aria-label={f.href ? `${f.nombre}: cómo trabajo y proyectos` : `${f.nombre}: ver ${p?.titulo}`}>
                  <TarjetaFoto suave imagenes={f.foto ? [f.foto] : []} ancho={1200} className="aspect-[16/10] lg:aspect-auto lg:h-[min(26svh,280px)]">
                    {() => (
                      <div className="relative flex h-full flex-col justify-end p-6 [text-shadow:0_2px_18px_rgba(0,0,0,0.5)]">
                        <h3 className="text-2xl font-bold leading-tight tracking-[-0.025em]">{f.nombre}</h3>
                        <Revelable>
                          <p className="mt-1.5 max-w-sm text-[15px] leading-snug text-white/80 [text-wrap:pretty]">{f.texto}</p>
                          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffc07a]">
                            {f.href ? `Ver ${f.nombre.toLowerCase()}` : p?.titulo}
                            <Icono nombre="flecha" className="h-3.5 w-3.5" />
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
