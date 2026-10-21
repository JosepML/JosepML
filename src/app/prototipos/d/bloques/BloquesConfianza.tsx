"use client";

import { useState } from "react";
import { CANALES, CLIENTES, JUNO, OPINIONES, type Bloque, type ClienteD } from "../datos";
import { Icono } from "../Iconos";
import { Contador, Revelar, Titular } from "../piezas";

const CIFRAS = [
  { valor: 9, prefijo: "+", sufijo: "", unidad: "años", texto: "contando historias: primero en YouTube, después en el set" },
  { valor: 1.39, decimales: 2, sufijo: " M", unidad: "visualizaciones", texto: "del EP Oscuridad, de Adrián Muñoz" },
];

const PREMIOS = [
  { premio: "Mejor fotografía", donde: "On Duty International Film Festival", obra: "El Cirujano" },
  { premio: "Podio", donde: "ESCAC Dreammakers Contest 2024", obra: "Y el año que viene, ¿qué?" },
];

/** Cifras que cuentan al entrar y premios con laurel, en un bento de cristal. */
export function BloqueCifras({ bloque }: { bloque: Bloque }) {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {CIFRAS.map((c, i) => (
            <Revelar key={c.unidad} retraso={i * 0.08} className="lg:col-span-3">
              <div data-foco className="cristal flex h-full min-h-[220px] flex-col justify-between rounded-[32px] p-7">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-tenue)]">{c.unidad}</span>
                <div>
                  <p className="d-degradado text-[clamp(3.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.055em]">
                    <Contador valor={c.valor} decimales={c.decimales} prefijo={c.prefijo} sufijo={c.sufijo} />
                  </p>
                  <p className="mt-3 text-sm text-[var(--d-suave)]">{c.texto}</p>
                </div>
              </div>
            </Revelar>
          ))}
          {PREMIOS.map((p, i) => (
            <Revelar key={p.premio} retraso={0.2 + i * 0.08} className="lg:col-span-3">
              <div data-foco className="cristal relative flex h-full min-h-[200px] items-center gap-6 overflow-hidden rounded-[32px] p-7">
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,var(--d-orbe-b),transparent)]" />
                <Icono nombre="laurel" className="h-16 w-16 shrink-0 text-[#e9b45c]" />
                <div className="relative">
                  <p className="text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl">{p.premio}</p>
                  <p className="mt-1 text-sm text-[var(--d-suave)]">{p.donde}</p>
                  <p className="mt-2 text-[15px] font-semibold text-[var(--d-acento)]">{p.obra}</p>
                </div>
              </div>
            </Revelar>
          ))}
          {/* Canales de YouTube: de ahí vienen muchos de esos años. Las cifras de suscriptores, cuando Josep las pase */}
          {CANALES.map((c, i) => (
            <Revelar key={c.nombre} retraso={0.3 + i * 0.08} className="lg:col-span-3">
              <div data-foco className="cristal flex h-full min-h-[180px] items-start gap-5 rounded-[32px] p-7">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ff0033] text-white shadow-[0_10px_30px_-10px_rgba(255,0,51,0.7)]">
                  <Icono nombre="play" className="ml-0.5 h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-tenue)]">Canal de YouTube</p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.03em]">{c.nombre}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--d-suave)]">{c.texto}</p>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--d-acento)]"
                    >
                      Ver canal
                      <Icono nombre="flecha" className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-4 text-xs text-[var(--d-tenue)]">Enlace pendiente</p>
                  )}
                </div>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Opiniones en dos filas de tarjetas de cristal que se mueven en sentidos opuestos. */
export function BloqueOpiniones({ bloque }: { bloque: Bloque }) {
  const fila1 = [...OPINIONES, ...OPINIONES];
  const fila2 = [...OPINIONES.slice(2), ...OPINIONES.slice(0, 2)];
  const fila2Doble = [...fila2, ...fila2];

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="px-4 sm:px-8">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} centrado />
      </div>
      <div className="d-marquesina-pausa d-mascara-lados mt-14 flex flex-col gap-4">
        <div className="d-marquesina flex w-max gap-4" style={{ "--duracion": "70s" } as React.CSSProperties}>
          {fila1.map((o, i) => (
            <Opinion key={`a-${i}`} {...o} />
          ))}
        </div>
        <div className="d-marquesina-inversa flex w-max gap-4" style={{ "--duracion": "80s" } as React.CSSProperties}>
          {fila2Doble.map((o, i) => (
            <Opinion key={`b-${i}`} {...o} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Opinion({ texto, quien, tipo }: { texto: string; quien: string; tipo: string }) {
  return (
    <figure data-foco className="cristal flex w-[320px] shrink-0 flex-col justify-between gap-6 rounded-[28px] p-6 sm:w-[380px]">
      <blockquote className="text-[17px] font-medium leading-snug tracking-[-0.01em]">
        <span className="mb-2 block text-4xl font-extrabold leading-none text-[var(--d-acento)]">“</span>
        {texto}
      </blockquote>
      <figcaption className="flex items-center gap-3 text-xs text-[var(--d-suave)]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--d-acento)] to-[var(--d-calido)] text-[11px] font-bold text-white">
          {quien[0]}
        </span>
        <span>
          <span className="block font-semibold text-[var(--d-texto)]">{quien}</span>
          {tipo}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Clientes: una sola fila de logos que pasa despacio (se para al pasar el ratón), con los logos
 * oficiales monocromos según el tema y, sin logo, el nombre compuesto como marca. Debajo, JUNO Media
 * como pieza propia: su marca grande, una frase en primera persona y las marcas de los proyectos juntos.
 */
export function BloqueClientes({ bloque }: { bloque: Bloque }) {
  // Cuatro copias para que la fila llene pantallas anchas y el bucle de la marquesina no tenga costura
  const fila = [...CLIENTES, ...CLIENTES, ...CLIENTES, ...CLIENTES];
  return (
    <section className="py-20 sm:py-28">
      <Revelar>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--d-tenue)]">{bloque.datos.titulo}</p>
      </Revelar>
      <div className="d-marquesina-pausa d-mascara-lados mt-10 overflow-hidden">
        <div className="d-marquesina flex w-max items-center" style={{ "--duracion": "110s" } as React.CSSProperties}>
          {fila.map((c, i) => (
            <Logo key={i} cliente={c} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-4 text-center sm:px-8">
        <Revelar>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--d-tenue)]">En sinergia con</p>
          <p className="mt-5 text-[clamp(3rem,9vw,6.5rem)] leading-none tracking-[0.14em]">
            <span className="font-extrabold">JUNO</span>
            <span className="ml-[0.3em] font-light">MEDIA</span>
          </p>
        </Revelar>
        <Revelar retraso={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[var(--d-suave)] [text-wrap:balance] sm:text-xl">{JUNO.texto}</p>
        </Revelar>
        <Revelar retraso={0.18}>
          {/* Las marcas en fila, separadas por líneas finas: nada de etiquetas */}
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 border-y border-[var(--d-borde)] md:grid-cols-5 md:divide-x md:divide-[var(--d-borde)]">
            {JUNO.clientes.map((c) => (
              <div key={c.nombre} className="flex h-24 items-center justify-center">
                <Logo cliente={c} compacto />
              </div>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  );
}

/** Logo del cliente; si la imagen no carga (enlaces externos que caducan), su nombre en texto. */
function Logo({ cliente: c, compacto }: { cliente: ClienteD; compacto?: boolean }) {
  const [roto, setRoto] = useState(false);
  return (
    <span className={`flex h-16 shrink-0 items-center ${compacto ? "px-3" : "px-10 sm:px-14"}`}>
      {c.logo && !roto ? (
        <img
          src={c.logo}
          alt={c.nombre}
          style={{ height: c.alto ?? 36 }}
          className="d-logo w-auto object-contain"
          draggable={false}
          onError={() => setRoto(true)}
        />
      ) : c.estilo === "firma" ? (
        // Artistas: su nombre como firma, en la cursiva de acento
        <span className="d-serif whitespace-nowrap text-4xl text-[var(--d-tenue)] transition-colors duration-300 hover:text-[var(--d-texto)]">{c.nombre}</span>
      ) : (
        // Sin logo: el nombre compuesto como marca (versalitas espaciadas), no como etiqueta
        <span
          className={`whitespace-nowrap font-semibold uppercase text-[var(--d-tenue)] transition-colors duration-300 hover:text-[var(--d-texto)] ${
            compacto ? "text-[13px] tracking-[0.18em]" : "text-[15px] tracking-[0.22em] sm:text-base"
          }`}
        >
          {c.nombre}
        </span>
      )}
    </span>
  );
}
