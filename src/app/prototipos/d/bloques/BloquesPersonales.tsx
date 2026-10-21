"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useEscritorio, usePunteroFino, useReducir } from "../../_comun/hooks";
import { AJUSTES, ARTICULOS, PASOS, SERVICIOS, type Bloque } from "../datos";
import { Icono } from "../Iconos";
import { Disponible, EVENTO_SERVICIO, Revelar, Titular, TituloConAcento } from "../piezas";

/**
 * Cómo trabajo: en ordenador el título se queda fijo y el paso activo sale del avance del scroll por la
 * columna de pasos (un solo valor, sin parpadeos). En móvil y tableta, lista normal sin atenuar.
 */
export function BloqueProceso({ bloque }: { bloque: Bloque }) {
  const escritorio = useEscritorio();
  const [activo, setActivo] = useState(0);
  const pasos = useRef<HTMLDivElement>(null);
  const tarjetas = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: pasos, offset: ["start 50%", "end 50%"] });
  const { scrollY } = useScroll();

  // Paso activo: el que tiene el centro más cerca del centro de la pantalla. Coincide con donde deja
  // cada paso el scroll mágico, que centra uno por gesto de rueda (cada paso lleva data-punto).
  useMotionValueEvent(scrollY, "change", () => {
    const centro = window.innerHeight / 2;
    let mejor = 0;
    let distancia = Infinity;
    tarjetas.current.forEach((t, i) => {
      if (!t) return;
      const r = t.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - centro);
      if (d < distancia) {
        distancia = d;
        mejor = i;
      }
    });
    setActivo((a) => (a === mejor ? a : mejor));
  });

  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32 lg:py-[10svh]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-[22svh] lg:self-start">
          <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
          <div className="mt-12 hidden items-end gap-6 lg:flex">
            <div className="relative h-40 w-[3px] overflow-hidden rounded-full bg-[var(--d-borde)]">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-[var(--d-acento)] to-[var(--d-calido)]"
                style={{ scaleY: scrollYProgress }}
              />
            </div>
            <div>
              {/* Los números se apilan en la misma celda y se funden: nada salta aunque el scroll sea rápido */}
              <div className="grid">
                {PASOS.map((_, i) => (
                  <span
                    key={i}
                    className="text-[7rem] font-extrabold leading-none tracking-[-0.06em] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1]"
                    style={{ opacity: activo === i ? 1 : 0, transform: `translateY(${activo === i ? 0 : activo > i ? -24 : 24}px)` }}
                    aria-hidden={activo !== i}
                  >
                    0{i + 1}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[var(--d-tenue)]">de 0{PASOS.length}</p>
            </div>
          </div>
        </div>

        <div ref={pasos} className="flex flex-col gap-4 lg:gap-0 lg:py-[10svh]">
          {PASOS.map((p, i) => (
            <div
              key={p.titulo}
              ref={(el) => {
                tarjetas.current[i] = el;
              }}
              data-punto
              // 70svh por paso: al centrar uno, el anterior y el siguiente quedan fuera de la pantalla
              className="lg:flex lg:min-h-[70svh] lg:items-center"
            >
              <div
                data-foco
                className="cristal w-full rounded-[36px] p-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-10"
                style={escritorio ? { opacity: activo === i ? 1 : 0.4, transform: `scale(${activo === i ? 1 : 0.97})` } : undefined}
              >
                <span className="text-sm font-bold text-[var(--d-acento)]">0{i + 1}</span>
                <h3 className="mt-3 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">{p.titulo}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-[var(--d-suave)] [text-wrap:pretty]">{p.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PAPELES = ["Director de fotografía", "Filmmaker", "Editor", "Operador de cámara", "Gaffer", "Realizador"];

/** Sobre mí: retrato que se inclina con el ratón y se desplaza con el scroll, y texto personal. */
export function BloqueSobreMi({ bloque }: { bloque: Bloque }) {
  const { antetitulo, titulo, texto, imagen } = bloque.datos;
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
    <section ref={ref} id={bloque.id === "sobre-mi" ? "sobre-mi" : undefined} className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
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
                  src={imagen}
                  alt="Josep Mira Lozano en un rodaje"
                  className="absolute inset-0 h-full w-full origin-top object-cover object-[50%_0%]"
                  style={{ scale: reducir ? 1 : escalaImg }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 text-xs font-medium text-white">+9 años · Alicante</span>
              </div>
            </motion.div>
          </div>
        </Revelar>

        <div>
          <Titular antetitulo={antetitulo} titulo={titulo} />
          {texto && (
            <Revelar retraso={0.15}>
              <p className="mt-6 text-lg leading-relaxed text-[var(--d-suave)] [text-wrap:pretty] sm:text-xl">{texto}</p>
            </Revelar>
          )}
          <Revelar retraso={0.22}>
            <p className="mt-6 border-l-2 border-[var(--d-acento)] pl-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-[var(--d-texto)]">
              La cámara se convierte en la extensión de mi mirada.
            </p>
          </Revelar>
          <Revelar retraso={0.28}>
            <div className="mt-8 flex flex-wrap gap-2">
              {PAPELES.map((p) => (
                <span key={p} className="cristal rounded-full px-4 py-2 text-sm font-medium">
                  {p}
                </span>
              ))}
            </div>
          </Revelar>
          <Revelar retraso={0.34}>
            <span className="boton mt-8 border border-[var(--d-borde)] px-6 py-3 text-sm hover:bg-[var(--d-cristal)]">
              Conóceme mejor
              <Icono nombre="flecha" className="h-4 w-4" />
            </span>
          </Revelar>
        </div>
      </div>
    </section>
  );
}

/** Últimos artículos: el contenido que Josep crea desde el panel aparece aquí solo. */
export function BloqueBlog({ bloque }: { bloque: Bloque }) {
  return (
    <section id={bloque.id === "blog" ? "blog" : undefined} className="scroll-mt-24 px-4 py-24 sm:px-8 sm:py-32 lg:py-[6svh]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Titular antetitulo={bloque.datos.antetitulo} titulo={bloque.datos.titulo} />
          <Revelar>
            <span className="boton border border-[var(--d-borde)] px-5 py-2.5 text-sm hover:bg-[var(--d-cristal)]">
              Todos los artículos
              <Icono nombre="flecha" className="h-4 w-4" />
            </span>
          </Revelar>
        </div>
        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {ARTICULOS.map((a, i) => (
            <Revelar key={a.slug} retraso={i * 0.08}>
              <article data-foco className="cristal group flex h-full cursor-pointer flex-col overflow-hidden rounded-[32px] transition-transform duration-500 hover:-translate-y-1.5">
                <div className="relative h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-[1.2s] group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at ${20 + i * 30}% 30%, var(--d-orbe-a), transparent 60%), radial-gradient(circle at ${80 - i * 20}% 80%, var(--d-orbe-b), transparent 55%)`,
                    }}
                  />
                  <span className="cristal absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-semibold">{a.categoria}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-[var(--d-tenue)]">{a.fecha}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-snug tracking-[-0.03em]">{a.titulo}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--d-suave)]">{a.resumen}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--d-acento)]">
                    Leer
                    <Icono nombre="flecha" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Sección libre: lo que Josep quiera contar, creada desde el panel. */
export function BloqueTexto({ bloque }: { bloque: Bloque }) {
  const { antetitulo, titulo, texto, imagen } = bloque.datos;
  return (
    <section className="px-4 py-20 sm:px-8">
      <Revelar className="mx-auto max-w-5xl">
        <div data-foco className="cristal grid gap-8 overflow-hidden rounded-[40px] p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            {antetitulo && <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--d-acento)]">{antetitulo}</span>}
            <h2 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] [text-wrap:balance] sm:text-5xl">
              <TituloConAcento texto={titulo} />
            </h2>
            {texto && <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-[var(--d-suave)]">{texto}</p>}
          </div>
          {imagen ? (
            <img src={imagen} alt="" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
          ) : (
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[28px] md:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--d-orbe-a),transparent_60%),radial-gradient(circle_at_70%_70%,var(--d-orbe-b),transparent_60%)]" />
            </div>
          )}
        </div>
      </Revelar>
    </section>
  );
}

const TIPOS = ["Videoclip", "Cortometraje", "Spot", "Evento", "Boda", "Redes sociales"];

/** Llamada final: invitación personal a escribir, con lo que tienes en mente marcado en chips. */
export function BloqueLlamada({ bloque, preseleccion = [] }: { bloque: Bloque; preseleccion?: string[] }) {
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
    <section id={bloque.id === "llamada" ? "llamada" : undefined} className="scroll-mt-24 px-3 py-16 sm:px-6 sm:py-24 lg:py-[5svh]">
      <Revelar>
        <div className="cristal relative mx-auto max-w-7xl overflow-hidden rounded-[48px] px-6 py-16 text-center sm:px-12 sm:py-24 lg:py-[6svh]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--d-orbe-a),transparent)]" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,var(--d-orbe-b),transparent)]" />
          <div className="relative">
            <Disponible />
            <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,min(6.5vw,9svh),6rem)] font-extrabold leading-[1.02] tracking-[-0.05em] [text-wrap:balance]">
              <TituloConAcento texto={bloque.datos.titulo} />
            </h2>
            {bloque.datos.texto && <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--d-suave)] sm:text-xl">{bloque.datos.texto}</p>}

            <p className="mt-10 text-sm font-semibold lg:mt-[4svh]">¿Qué tienes en mente?</p>
            <div className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2">
              {[...SERVICIOS.map((s) => s.nombre), ...TIPOS].map((t) => {
                const si = elegidos.includes(t);
                return (
                  <motion.button
                    key={t}
                    type="button"
                    onClick={() => alternar(t)}
                    whileTap={{ scale: 0.94 }}
                    aria-pressed={si}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      si ? "border-transparent bg-[var(--d-acento)] text-white" : "border-[var(--d-borde)] bg-[var(--d-cristal)] hover:border-[var(--d-acento)]"
                    }`}
                  >
                    {si && "✓ "}
                    {t}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-[4svh]">
              <a href={`mailto:${AJUSTES.correo}?subject=${encodeURIComponent(asunto)}`} className="boton boton-acento px-8 py-4 text-base">
                <Icono nombre="correo" className="h-5 w-5" />
                Escríbeme
              </a>
              <a
                href={`https://wa.me/${AJUSTES.whatsapp}?text=${encodeURIComponent(mensajeWa)}`}
                target="_blank"
                rel="noreferrer"
                className="boton border border-[var(--d-borde)] bg-[var(--d-cristal)] px-8 py-4 text-base hover:border-[#25d366]"
              >
                <Icono nombre="whatsapp" className="h-5 w-5 text-[#25d366]" />
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-xs text-[var(--d-tenue)]">
              Te respondo personalmente, normalmente en menos de 24 horas. En la web final habrá también un formulario corto que
              se guarda en tu panel.
            </p>
          </div>
        </div>
      </Revelar>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="px-4 pb-24 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-[var(--d-borde)] pt-8 text-sm text-[var(--d-suave)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-extrabold text-[var(--d-texto)]">Josep Mira Lozano</span> · Dirección de fotografía, filmmaker y edición · Alicante
        </p>
        <div className="flex gap-5">
          <Link href="https://www.instagram.com/josepmiralozano/" className="hover:text-[var(--d-texto)]">
            Instagram
          </Link>
          <Link href="https://www.youtube.com/channel/UCtyNSF1X0pNPxp5fhwu1NUA" className="hover:text-[var(--d-texto)]">
            YouTube
          </Link>
          <Link href="https://www.linkedin.com/in/josep-mira-lozano-a70798214/" className="hover:text-[var(--d-texto)]">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
