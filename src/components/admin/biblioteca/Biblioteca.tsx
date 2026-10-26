"use client";

// Biblioteca de medios: todo lo subido (fotos, vídeos y pdf), con su texto alternativo, dónde se usa cada
// archivo y la opción de borrar lo que no se usa. Se sube con el botón o soltando archivos en cualquier sitio.

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { img } from "@/components/comun/imagen";
import { Icono } from "@/components/Iconos";
import { borrarMedio, cambiarMedio, type MedioBiblioteca, type Uso } from "@/lib/admin/medios";
import { ACEPTA } from "@/lib/admin/subir";
import { CURVA } from "@/styles/movimiento";
import { Miniatura, ProveedorMedios, useSoltarArchivos } from "../campos/medios";
import { aSlug } from "../campos/tipos";
import { useDialogos } from "../Dialogos";
import { Insignia } from "../ListaContenido";
import { PuntoDeInteres } from "./PuntoDeInteres";
import { Recortador } from "./Recortador";

type Filtro = "todo" | "imagen" | "video" | "sin-usar" | "sin-alt";
const FILTROS: { id: Filtro; nombre: string }[] = [
  { id: "todo", nombre: "Todo" },
  { id: "imagen", nombre: "Fotos" },
  { id: "video", nombre: "Vídeos" },
  { id: "sin-usar", nombre: "Sin usar" },
  { id: "sin-alt", nombre: "Sin descripción" },
];

/** Nombre que se enseña: el título, o el del archivo si no tiene (lo que se cargó de la web antigua) */
const nombre = (m: MedioBiblioteca) => m.titulo || decodeURIComponent(m.url.split("?")[0].split("/").pop() ?? "").replace(/^[0-9a-f]{8}-/, "") || "Sin nombre";
const tamano = (b: number | null) => (b == null ? "" : b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const fecha = (iso: string) => new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

export function Biblioteca(props: { medios: MedioBiblioteca[]; usos: Record<string, Uso[]> }) {
  return (
    <ProveedorMedios>
      <Contenido {...props} />
    </ProveedorMedios>
  );
}

function Contenido({ medios: iniciales, usos }: { medios: MedioBiblioteca[]; usos: Record<string, Uso[]> }) {
  const router = useRouter();
  const [medios, setMedios] = useState(iniciales);
  const [filtro, setFiltro] = useState<Filtro>("todo");
  const [busqueda, setBusqueda] = useState("");
  const [abierto, setAbierto] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => setMedios(iniciales), [iniciales]);

  const { encima, subiendo, error, setError, subir, manejadores, fotoElegida } = useSoltarArchivos(
    (nuevos) => {
      setMedios((m) => [...nuevos, ...m]);
      router.refresh();
    },
    { multiple: true, elegirFoco: true },
  );

  const usosDe = (id: string) => usos[id.toLowerCase()] ?? [];
  const visibles = useMemo(() => {
    const q = aSlug(busqueda);
    return medios.filter((m) => {
      if (filtro === "imagen" && m.tipo !== "imagen") return false;
      if (filtro === "video" && m.tipo !== "video") return false;
      if (filtro === "sin-usar" && usosDe(m.id).length) return false;
      if (filtro === "sin-alt" && (m.tipo !== "imagen" || m.alt.trim())) return false;
      return !q || aSlug(`${nombre(m)} ${m.alt}`).includes(q);
    });
  }, [medios, filtro, busqueda, usos]); // eslint-disable-line react-hooks/exhaustive-deps

  const elegido = medios.find((m) => m.id === abierto) ?? null;

  return (
    <div className="relative mx-auto max-w-6xl" {...manejadores}>
      {fotoElegida}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-[-0.04em]">Biblioteca</h1>
          <p className="mt-1 text-sm text-[var(--jm-suave)]">
            {medios.length} archivos · {medios.filter((m) => !usosDe(m.id).length).length} sin usar
          </p>
        </div>
        <button type="button" onClick={() => input.current?.click()} className="boton boton-acento px-5 py-3 text-sm">
          <Icono nombre="subir" className="h-4 w-4" />
          Subir archivos
        </button>
        <input
          ref={input}
          type="file"
          accept={ACEPTA}
          multiple
          hidden
          onChange={(e) => {
            subir([...(e.target.files ?? [])]);
            e.target.value = "";
          }}
        />
      </div>
      <p className="mt-2 text-xs text-[var(--jm-tenue)]">También puedes soltar fotos, vídeos mp4 o pdf en cualquier parte de esta página. Hasta 50 MB por archivo.</p>

      {(subiendo > 0 || error) && (
        <div className={`mt-4 flex items-center justify-between gap-3 rounded-[18px] px-4 py-3 text-sm ${error ? "bg-[#ff453a]/15 text-[#ff8a80]" : "bg-white/[0.06] text-[var(--jm-suave)]"}`}>
          <span>{error ?? `Subiendo ${subiendo} archivo${subiendo === 1 ? "" : "s"}…`}</span>
          {error && (
            <button type="button" onClick={() => setError(null)} className="text-xs font-semibold underline">
              Cerrar
            </button>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="relative min-w-[220px] flex-1">
          <Icono nombre="buscar" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--jm-tenue)]" />
          <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por nombre o descripción" className="campo !rounded-full !pl-11" />
        </label>
        <div className="flex flex-wrap gap-1 rounded-full bg-black/25 p-1">
          {FILTROS.map((f) => (
            <button key={f.id} type="button" onClick={() => setFiltro(f.id)} className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${filtro === f.id ? "text-[var(--jm-texto)]" : "text-[var(--jm-tenue)] hover:text-[var(--jm-suave)]"}`}>
              {filtro === f.id && <motion.span layoutId="filtro-biblioteca" className="absolute inset-0 rounded-full bg-white/10" transition={{ duration: 0.4, ease: CURVA }} />}
              <span className="relative">{f.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibles.map((m) => {
          const sinUsar = !usosDe(m.id).length;
          return (
            <button key={m.id} type="button" onClick={() => setAbierto(m.id)} className="group text-left">
              <div className="relative overflow-hidden rounded-[18px] ring-1 ring-[var(--jm-borde)] transition-[box-shadow] duration-300 group-hover:ring-2 group-hover:ring-[var(--jm-acento)]">
                <Miniatura medio={m} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute left-2 top-2 flex gap-1">
                  {m.tipo === "video" && <Insignia color="bg-black/70 text-white">Vídeo</Insignia>}
                  {sinUsar && <Insignia color="bg-black/70 text-[var(--jm-suave)]">Sin usar</Insignia>}
                </span>
                {m.tipo === "imagen" && !m.alt.trim() && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#ff9f0a] shadow" title="Sin descripción" />}
              </div>
              <span className="mt-1.5 block truncate px-1 text-xs text-[var(--jm-suave)]">{nombre(m)}</span>
            </button>
          );
        })}
      </div>
      {!visibles.length && <p className="mt-10 text-center text-sm text-[var(--jm-suave)]">No hay archivos que coincidan.</p>}

      <AnimatePresence>
        {encima && (
          <motion.div className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(229,9,20,0.18)] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="cristal cristal-fuerte rounded-full px-6 py-3 text-sm font-semibold">Suelta para subirlos a la biblioteca</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {elegido && (
          <Detalle
            key={elegido.id}
            medio={elegido}
            usos={usosDe(elegido.id)}
            alCerrar={() => setAbierto(null)}
            alCambiar={(c) => setMedios((l) => l.map((x) => (x.id === elegido.id ? { ...x, ...c } : x)))}
            alRecortar={(nuevo) => {
              setMedios((l) => [nuevo, ...l]);
              setAbierto(nuevo.id);
              router.refresh();
            }}
            alBorrar={() => {
              setMedios((l) => l.filter((x) => x.id !== elegido.id));
              setAbierto(null);
              router.refresh();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Detalle({
  medio,
  usos,
  alCerrar,
  alCambiar,
  alBorrar,
  alRecortar,
}: {
  medio: MedioBiblioteca;
  usos: Uso[];
  alCerrar: () => void;
  alCambiar: (c: Partial<MedioBiblioteca>) => void;
  alBorrar: () => void;
  alRecortar: (nuevo: MedioBiblioteca) => void;
}) {
  const { confirmar, avisar } = useDialogos();
  const [recortando, setRecortando] = useState(false);
  // SVG (vectorial) y GIF (animado) no se recortan: se perderían
  const recortable = medio.tipo === "imagen" && !["image/svg+xml", "image/gif"].includes(medio.mime);
  const [titulo, setTitulo] = useState(medio.titulo);
  const [alt, setAlt] = useState(medio.alt);
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && (recortando ? setRecortando(false) : alCerrar());
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [alCerrar, recortando]);

  const guardar = async (campo: "titulo" | "alt") => {
    const valor = (campo === "titulo" ? titulo : alt).trim();
    if (valor === (campo === "titulo" ? medio.titulo : medio.alt)) return;
    const r = await cambiarMedio(medio.id, campo === "titulo" ? { titulo: valor } : { texto_alternativo: valor });
    if (!r.ok) return avisar(r.error, "error");
    alCambiar(campo === "titulo" ? { titulo: valor } : { alt: valor });
    avisar("Guardado");
  };

  const quitar = async () => {
    if (!(await confirmar({ titulo: "¿Borrar este archivo para siempre?", texto: "Se borra de la biblioteca y del almacenamiento. No se puede deshacer.", aceptar: "Borrar", peligro: true }))) return;
    setBorrando(true);
    const r = await borrarMedio(medio.id);
    setBorrando(false);
    if (!r.ok) return avisar(r.error, "error");
    avisar("Archivo borrado");
    alBorrar();
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(medio.url);
      avisar("Enlace copiado");
    } catch {
      avisar("No se pudo copiar el enlace", "error");
    }
  };

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-2 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={alCerrar}>
      <motion.div
        role="dialog"
        aria-label={medio.titulo || "Archivo"}
        onClick={(e) => e.stopPropagation()}
        className="cristal cristal-fuerte grid max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-[32px] md:grid-cols-[1.4fr_1fr]"
        initial={{ y: 24, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.45, ease: CURVA }}
      >
        <div className="flex items-center justify-center bg-black/40 p-4 md:min-h-[28rem]">
          {recortando ? (
            <Recortador medio={medio} alCancelar={() => setRecortando(false)} alTerminar={alRecortar} />
          ) : medio.tipo === "video" ? (
            <video src={medio.url} controls playsInline className="max-h-[60svh] w-full rounded-[18px]" />
          ) : medio.tipo === "imagen" ? (
            <img src={img(medio.url, 1080)} alt={medio.alt} className="max-h-[60svh] w-auto rounded-[18px] object-contain" />
          ) : (
            <a href={medio.url} target="_blank" rel="noreferrer" className="boton boton-suave px-5 py-3 text-sm">
              Abrir el PDF
            </a>
          )}
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs text-[var(--jm-tenue)]">
              {[medio.ancho && medio.alto ? `${medio.ancho} × ${medio.alto}` : "", tamano(medio.bytes), medio.mime.split("/")[1]?.toUpperCase(), fecha(medio.creadoEn)].filter(Boolean).join(" · ")}
            </p>
            <button type="button" onClick={alCerrar} className="boton-icono -mr-2 -mt-2" aria-label="Cerrar">
              <Icono nombre="cerrar" />
            </button>
          </div>
          <label className="block">
            <span className="campo-etiqueta">Nombre</span>
            <input className="campo mt-1.5" value={titulo} onChange={(e) => setTitulo(e.target.value)} onBlur={() => guardar("titulo")} />
            <span className="campo-ayuda">Solo para encontrarlo aquí</span>
          </label>
          {medio.tipo !== "documento" && (
            <label className="block">
              <span className="campo-etiqueta">Descripción (texto alternativo)</span>
              <textarea className="campo mt-1.5 min-h-[5rem] resize-y" value={alt} onChange={(e) => setAlt(e.target.value)} onBlur={() => guardar("alt")} placeholder="Qué se ve: «Josep con la cámara en un rodaje nocturno»" />
              <span className="campo-ayuda">La leen quienes no ven la imagen y Google. Una frase basta.</span>
            </label>
          )}
          {medio.tipo === "imagen" && <PuntoDeInteres medio={medio} alCambiar={alCambiar} />}
          <div>
            <span className="campo-etiqueta">Dónde se usa</span>
            {usos.length ? (
              <ul className="mt-2 flex flex-col gap-1">
                {usos.map((u) => (
                  <li key={u.donde + u.href}>
                    <Link href={u.href} className="flex items-center justify-between gap-2 rounded-[14px] bg-white/[0.04] px-3 py-2 text-sm hover:bg-white/[0.08]">
                      <span className="truncate">{u.donde}</span>
                      <Icono nombre="derecha" className="h-4 w-4 shrink-0 text-[var(--jm-tenue)]" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[var(--jm-suave)]">En ningún sitio todavía.</p>
            )}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            {recortable && !recortando && (
              <button type="button" onClick={() => setRecortando(true)} className="boton boton-suave px-4 py-2.5 text-sm" title="Se guarda como una imagen nueva: esta no cambia">
                Recortar
              </button>
            )}
            <button type="button" onClick={copiar} className="boton boton-suave px-4 py-2.5 text-sm">
              Copiar enlace
            </button>
            <button
              type="button"
              onClick={quitar}
              disabled={usos.length > 0 || borrando}
              title={usos.length ? "Quítalo de donde se usa para poder borrarlo" : undefined}
              className="boton px-4 py-2.5 text-sm text-[#ff6b6b] ring-1 ring-[#ff6b6b]/40 hover:bg-[#ff453a]/10 disabled:opacity-35"
            >
              {borrando ? "Borrando…" : "Borrar"}
            </button>
          </div>
          {usos.length > 0 && <p className="-mt-3 text-xs text-[var(--jm-tenue)]">Para borrarlo, primero quítalo de donde se usa.</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
