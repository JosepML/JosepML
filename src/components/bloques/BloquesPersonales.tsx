"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Bloque } from "@/lib/datos/tipos";
import { lista, objeto, texto, textos } from "@/lib/datos/util";
import { usePunteroFino, useReducir } from "../comun/hooks";
import { TarjetaArticulo } from "../blog/TarjetaArticulo";
import { img } from "../comun/imagen";
import { Icono } from "../Iconos";
import { CambiarImagen, Editable, useEditando } from "../edicion/contexto";
import { useDatos, useMedio } from "../marco/DatosWeb";
import { Disponible, EVENTO_SERVICIO, Parrafos, Revelar, Titular, TituloConAcento } from "../piezas";

/** Enlace opcional de un bloque: { texto, href } en sus datos */
function enlaceDe(v: unknown) {
  const o = objeto(v);
  const href = texto(o.href);
  return href ? { href, texto: texto(o.texto) || "Ver más" } : null;
}

/**
 * Cómo trabajo: los cuatro pasos a la vez, en una fila de tarjetas de cristal (dos columnas en tableta,
 * una en móvil). Al llegar, una línea fina se traza de izquierda a derecha y las tarjetas entran
 * escalonadas; al pasar el ratón, la tarjeta se ilumina. Encaja con el scroll normal: se ve de un vistazo.
 */
export function BloqueProceso({ bloque }: { bloque: Bloque }) {
  const pasos = lista(bloque.datos.pasos).map((p) => ({ titulo: texto(objeto(p).titulo), texto: texto(objeto(p).texto) }));
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
        <div className="relative mt-14 lg:mt-[6svh]">
          <ol className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {pasos.map((p, i) => (
              <Revelar key={`${p.titulo}-${i}`} retraso={0.15 + i * 0.12}>
                <li data-foco className="cristal group h-full rounded-[32px] p-7 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 lg:p-8">
                  <span className="relative flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full bg-[var(--jm-acento)] text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(229,9,20,0.7)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 text-3xl font-extrabold tracking-[-0.035em]">
                    <Editable campo={`pasos.${i}.titulo`} valor={p.titulo}>
                      {p.titulo}
                    </Editable>
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--jm-suave)] transition-colors duration-500 [text-wrap:pretty] group-hover:text-[var(--jm-texto)]">
                    <Editable campo={`pasos.${i}.texto`} valor={p.texto} multilinea>
                      {p.texto}
                    </Editable>
                  </p>
                </li>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Sobre mí: retrato que se inclina con el ratón y se desplaza con el scroll, y texto personal. */
export function BloqueSobreMi({ bloque, ancla }: { bloque: Bloque; ancla?: string }) {
  const { antetitulo, titulo, texto: cuerpo } = bloque.datos;
  const imagen = useMedio(bloque.datos.imagen);
  const papeles = textos(bloque.datos.papeles);
  const etiqueta = texto(bloque.datos.etiqueta);
  const cita = texto(bloque.datos.cita);
  const enlace = enlaceDe(bloque.datos.enlace);
  const editando = useEditando();
  const ref = useRef<HTMLElement>(null);
  const reducir = useReducir();
  const fino = usePunteroFino();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Antes la foto subía y bajaba con el scroll y se cortaba la cabeza: ahora solo un zoom muy leve,
  // anclado arriba para que la cabeza quede siempre dentro
  const escalaImg = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <section ref={ref} id={ancla} className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Revelar>
          <div style={{ perspective: 1200 }}>
            <motion.div
              className="relative mx-auto aspect-[4/5] overflow-hidden rounded-[44px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] lg:h-[min(76svh,720px)]"
              style={{ rotateX: srx, rotateY: sry }}
              onPointerMove={(e) => {
                if (!fino || reducir) return;
                const r = e.currentTarget.getBoundingClientRect();
                ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
                rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
              }}
              onPointerLeave={() => {
                rx.set(0);
                ry.set(0);
              }}
            >
              {imagen && (
                <motion.img
                  src={img(imagen.url, 1920)}
                  alt={imagen.alt}
                  className="absolute inset-0 h-full w-full origin-top object-cover object-[50%_0%] [will-change:transform]"
                  style={{ scale: reducir ? 1 : escalaImg }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <CambiarImagen campo="imagen" />
              {(etiqueta || editando) && (
                <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-medium text-white">
                    <Editable campo="etiqueta" valor={etiqueta} vacio="Etiqueta">
                      {etiqueta}
                    </Editable>
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </Revelar>

        <div>
          <Titular antetitulo={antetitulo} titulo={titulo} />
          {(cuerpo || editando) && (
            <Revelar retraso={0.15}>
              <div className="mt-6 text-lg leading-relaxed text-[var(--jm-suave)] [text-wrap:pretty] sm:text-xl">
                <Editable campo="texto" valor={cuerpo} multilinea bloqueHtml vacio="Texto">
                  <Parrafos texto={cuerpo ?? ""} />
                </Editable>
              </div>
            </Revelar>
          )}
          {(cita || editando) && (
            <Revelar retraso={0.22}>
              <p className="mt-6 border-l-2 border-[var(--jm-acento)] pl-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--jm-texto)]">
                <Editable campo="cita" valor={cita} vacio="Frase destacada">
                  {cita}
                </Editable>
              </p>
            </Revelar>
          )}
          {papeles.length > 0 && (
          <Revelar retraso={0.28}>
            <div className="mt-8 flex flex-wrap gap-2">
              {papeles.map((p) => (
                <span key={p} className="cristal rounded-full px-4 py-2 text-sm font-medium">
                  {p}
                </span>
              ))}
            </div>
          </Revelar>
          )}
          {enlace && (
            <Revelar retraso={0.34}>
              <Link href={enlace.href} className="boton mt-8 border border-[var(--jm-borde)] px-6 py-3 text-sm hover:bg-[var(--jm-cristal)]">
                {enlace.texto}
                <Icono nombre="flecha" className="h-4 w-4" />
              </Link>
            </Revelar>
          )}
        </div>
      </div>
    </section>
  );
}

/** Últimos artículos: el contenido que Josep crea desde el panel aparece aquí solo. */
export function BloqueBlog({ bloque, ancla }: { bloque: Bloque; ancla?: string }) {
  const { articulos: todos } = useDatos();
  const cantidad = typeof bloque.datos.cantidad === "number" ? bloque.datos.cantidad : 3;
  const articulos = todos.slice(0, cantidad);
  const enlace = enlaceDe(bloque.datos.enlace);
  if (!articulos.length) return null;
  return (
    <section id={ancla} className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
          {enlace && (
            <Revelar>
              <Link href={enlace.href} className="boton border border-[var(--jm-borde)] px-5 py-2.5 text-sm hover:bg-[var(--jm-cristal)]">
                {enlace.texto}
                <Icono nombre="flecha" className="h-4 w-4" />
              </Link>
            </Revelar>
          )}
        </div>
        <div className={`mt-12 grid gap-3 ${articulos.length < 3 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {articulos.map((a, i) => (
            <Revelar key={a.slug} retraso={i * 0.08}>
              <TarjetaArticulo articulo={a} />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Sección libre: lo que Josep quiera contar, creada desde el panel. Con `estilo: "cabecera"` abre la página como
 * una cabecera de cine (las especialidades de filmmaker); si no, una tarjeta con la imagen al lado.
 */
export function BloqueTexto({ bloque }: { bloque: Bloque }) {
  if (bloque.datos.estilo === "cabecera") return <CabeceraCine bloque={bloque} />;
  return <TarjetaTexto bloque={bloque} />;
}

function TarjetaTexto({ bloque }: { bloque: Bloque }) {
  const { antetitulo, titulo = "", texto: cuerpo } = bloque.datos;
  const imagen = useMedio(bloque.datos.imagen);
  const editando = useEditando();
  return (
    <section className="px-4 py-20 sm:px-8">
      <Revelar className="mx-auto max-w-5xl">
        <div data-foco className="cristal grid gap-8 overflow-hidden rounded-[40px] p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            {(antetitulo || editando) && (
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--jm-acento)]">
                <Editable campo="antetitulo" valor={antetitulo} vacio="Antetítulo">
                  {antetitulo}
                </Editable>
              </span>
            )}
            <h2 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] [text-wrap:balance] sm:text-5xl">
              <Editable campo="titulo" valor={titulo} vacio="Título">
                <TituloConAcento texto={titulo} />
              </Editable>
            </h2>
            {(cuerpo || editando) && (
              <div className="mt-5 text-lg leading-relaxed text-[var(--jm-suave)]">
                <Editable campo="texto" valor={cuerpo} multilinea bloqueHtml vacio="Texto">
                  <Parrafos texto={cuerpo ?? ""} />
                </Editable>
              </div>
            )}
          </div>
          {imagen ? (
            <div className="relative overflow-hidden rounded-[28px]">
              <img src={img(imagen.url, 1920)} alt={imagen.alt} className="aspect-[4/3] w-full rounded-[28px] object-cover" />
              <CambiarImagen campo="imagen" />
            </div>
          ) : (
            <div className={`relative aspect-[4/3] overflow-hidden rounded-[28px] ${editando ? "block" : "hidden md:block"}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--jm-orbe-a),transparent_60%),radial-gradient(circle_at_70%_70%,var(--jm-orbe-b),transparent_60%)]" />
              <CambiarImagen campo="imagen" />
            </div>
          )}
        </div>
      </Revelar>
    </section>
  );
}

/**
 * Cabecera de cine: la foto a casi toda la pantalla, con las esquinas redondas, el antetítulo y el título encima
 * sobre un degradado, y la foto que se aleja despacio al hacer scroll. Debajo, el texto a dos columnas: el primer
 * párrafo grande, como entradilla, y el resto al lado.
 */
function CabeceraCine({ bloque }: { bloque: Bloque }) {
  const { antetitulo, titulo = "", texto: cuerpo } = bloque.datos;
  const imagen = useMedio(bloque.datos.imagen);
  const editando = useEditando();
  const marco = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: marco, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const [entrada, ...resto] = String(cuerpo ?? "").trim().split(/\n\s*\n/).filter(Boolean);
  return (
    <section className="px-3 pt-4 sm:px-4">
      <div ref={marco} data-foco className="relative mx-auto h-[min(76svh,820px)] min-h-[440px] max-w-[1720px] overflow-hidden rounded-[32px] bg-black sm:rounded-[44px]">
        {imagen ? (
          <motion.img
            src={img(imagen.url, 3840)}
            alt={imagen.alt}
            style={{ y }}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-[114%] w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--jm-orbe-a),transparent_60%),radial-gradient(circle_at_70%_70%,var(--jm-orbe-b),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-12 lg:p-16">
          <Revelar retraso={0.25} className="max-w-4xl">
            {(antetitulo || editando) && (
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                <Editable campo="antetitulo" valor={antetitulo} vacio="Antetítulo">
                  {antetitulo}
                </Editable>
              </span>
            )}
            <h2 className="mt-4 pb-[0.06em] text-5xl font-extrabold leading-[1.02] tracking-[-0.045em] [text-wrap:balance] sm:text-7xl lg:text-8xl">
              <Editable campo="titulo" valor={titulo} vacio="Título">
                <TituloConAcento texto={titulo} />
              </Editable>
            </h2>
          </Revelar>
        </div>
        <CambiarImagen campo="imagen" />
      </div>
      {(cuerpo || editando) && (
        <Revelar className="mx-auto mt-14 max-w-6xl px-4 sm:mt-20 sm:px-8">
          {editando ? (
            <div className="max-w-3xl text-xl leading-relaxed text-[var(--jm-suave)]">
              <Editable campo="texto" valor={cuerpo} multilinea bloqueHtml vacio="Texto">
                <Parrafos texto={cuerpo ?? ""} />
              </Editable>
            </div>
          ) : (
            <div className={`grid gap-8 ${resto.length ? "md:grid-cols-[1.15fr_1fr] md:gap-16" : ""}`}>
              <Parrafos texto={entrada ?? ""} className="text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--jm-texto)] [text-wrap:pretty] sm:text-[1.75rem]" />
              {resto.length > 0 && <Parrafos texto={resto.join("\n\n")} className="text-lg leading-relaxed text-[var(--jm-suave)] [text-wrap:pretty] md:pt-1.5" />}
            </div>
          )}
        </Revelar>
      )}
    </section>
  );
}

/**
 * Llamada final: invitación personal a escribir, con lo que tienes en mente marcado en chips (los
 * servicios y las `opciones` del bloque). Abre el correo o WhatsApp con lo elegido ya escrito.
 */
export function BloqueLlamada({ bloque, ancla, preseleccion = [] }: { bloque: Bloque; ancla?: string; preseleccion?: string[] }) {
  const { ajustes, servicios } = useDatos();
  const opciones = textos(bloque.datos.opciones);
  const nota = texto(bloque.datos.nota);
  const editando = useEditando();
  const [elegidos, setElegidos] = useState<string[]>(preseleccion);

  useEffect(() => {
    const elegir = (e: Event) => {
      const nombre = (e as CustomEvent<string>).detail;
      setElegidos((l) => (l.includes(nombre) ? l : [...l, nombre]));
    };
    window.addEventListener(EVENTO_SERVICIO, elegir);
    return () => window.removeEventListener(EVENTO_SERVICIO, elegir);
  }, []);

  const alternar = (t: string) => setElegidos((l) => (l.includes(t) ? l.filter((x) => x !== t) : [...l, t]));
  const asunto = elegidos.length ? `Proyecto: ${elegidos.join(", ")}` : "Tengo una historia que contar";
  const mensajeWa = `Hola, Josep. ${elegidos.length ? `Tengo en mente: ${elegidos.join(", ")}. ` : ""}Me gustaría contarte mi proyecto.`;

  return (
    <section id={ancla} className="scroll-mt-24 px-3 py-16 sm:px-6 sm:py-24 lg:py-[5svh]">
      <Revelar>
        <div className="cristal relative mx-auto max-w-7xl overflow-hidden rounded-[48px] px-6 py-16 text-center sm:px-12 sm:py-24 lg:py-[6svh]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--jm-orbe-a),transparent)]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--jm-orbe-b),transparent)]" />
          <div className="relative">
            {ajustes.disponible && <Disponible />}
            <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,min(6.5vw,9svh),6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
              <Editable campo="titulo" valor={bloque.datos.titulo} vacio="Título">
                <TituloConAcento texto={bloque.datos.titulo ?? ""} />
              </Editable>
            </h2>
            {(bloque.datos.texto || editando) && (
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--jm-suave)] sm:text-xl">
                <Editable campo="texto" valor={bloque.datos.texto} multilinea vacio="Texto">
                  {bloque.datos.texto}
                </Editable>
              </p>
            )}

            <p className="mt-10 text-sm font-semibold lg:mt-[4svh]">¿Qué tienes en mente?</p>
            <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
              {[...servicios.map((s) => s.nombre), ...opciones].map((t) => {
                const si = elegidos.includes(t);
                return (
                  <motion.button
                    key={t}
                    type="button"
                    onClick={() => alternar(t)}
                    whileTap={{ scale: 0.94 }}
                    aria-pressed={si}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      si ? "border-transparent bg-[var(--jm-acento)] text-white" : "border-[var(--jm-borde)] bg-[var(--jm-cristal)] hover:border-[var(--jm-acento)]"
                    }`}
                  >
                    {si && "✓ "}
                    {t}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-[4svh]">
              <a href={`mailto:${ajustes.correo}?subject=${encodeURIComponent(asunto)}`} className="boton boton-acento px-8 py-4 text-base">
                <Icono nombre="correo" className="h-5 w-5" />
                Escríbeme
              </a>
              <a
                href={`https://wa.me/${ajustes.whatsapp}?text=${encodeURIComponent(mensajeWa)}`}
                target="_blank"
                rel="noreferrer"
                className="boton border border-[var(--jm-borde)] bg-[var(--jm-cristal)] px-8 py-4 text-base hover:border-[#25d366]"
              >
                <Icono nombre="whatsapp" className="h-5 w-5 text-[#25d366]" />
                WhatsApp
              </a>
            </div>
            {/* Ancho de lectura acotado y centrado: así no queda bajo el índice lateral desplegado en pantallas estrechas */}
            {(nota || editando) && (
              <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-[var(--jm-tenue)] [text-wrap:balance]">
                <Editable campo="nota" valor={nota} vacio="Nota pequeña">
                  {nota}
                </Editable>
              </p>
            )}
          </div>
        </div>
      </Revelar>
    </section>
  );
}
