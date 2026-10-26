"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { enfoque, img } from "@/components/comun/imagen";
import { Icono } from "@/components/Iconos";
import { listarMedios, mediosPorId, type MedioBiblioteca } from "@/lib/admin/medios";
import { ACEPTA, subirArchivo } from "@/lib/admin/subir";
import type { Medio } from "@/lib/datos/tipos";
import { CURVA } from "@/styles/movimiento";

// ---- Medios conocidos -----------------------------------------------------------------------------
// Los campos guardan ids de `medios`; para enseñar la miniatura necesitan el archivo. El formulario empieza con
// los que ya conoce y va añadiendo los que se suben o se eligen de la biblioteca.

type Conocidos = { medios: Record<string, Medio>; registrar: (m: Medio | Medio[]) => void };
const ContextoMedios = createContext<Conocidos>({ medios: {}, registrar: () => {} });
export const useMediosConocidos = () => useContext(ContextoMedios);
/** Para quien guarda los medios en su propio estado (el editor de la web, que también pinta la página con ellos) */
export const ProveedorMediosControlado = ContextoMedios.Provider;

export function ProveedorMedios({ inicial, ids = [], children }: { inicial?: Record<string, Medio>; ids?: string[]; children: React.ReactNode }) {
  const [medios, setMedios] = useState<Record<string, Medio>>(inicial ?? {});
  const registrar = useCallback((m: Medio | Medio[]) => {
    const lista = Array.isArray(m) ? m : [m];
    setMedios((previo) => ({ ...previo, ...Object.fromEntries(lista.map((x) => [x.id, x])) }));
  }, []);
  // Los ids que aún no conoce se piden de una vez (los demás uuids de la lista, si no son medios, se ignoran)
  const clave = ids.filter((id) => !medios[id]).sort().join(",");
  useEffect(() => {
    if (!clave) return;
    mediosPorId(clave.split(",")).then((r) => r.ok && Object.keys(r.datos).length && registrar(Object.values(r.datos)));
  }, [clave, registrar]);
  const valor = useMemo(() => ({ medios, registrar }), [medios, registrar]);
  return <ContextoMedios.Provider value={valor}>{children}</ContextoMedios.Provider>;
}

// ---- Miniatura ------------------------------------------------------------------------------------

export function Miniatura({ medio, className = "", ancho = 384 }: { medio: Medio | null | undefined; className?: string; ancho?: 256 | 384 | 640 | 1080 }) {
  if (!medio) return <div className={`flex items-center justify-center bg-white/5 text-[var(--jm-tenue)] ${className}`}><Icono nombre="imagen" className="h-6 w-6" /></div>;
  if (medio.tipo === "video")
    return <video src={`${medio.url}#t=0.5`} muted playsInline preload="metadata" className={`bg-black object-cover ${className}`} />;
  if (medio.tipo === "documento")
    return <div className={`flex items-center justify-center bg-white/5 text-xs font-semibold text-[var(--jm-suave)] ${className}`}>PDF</div>;
  return <img src={img(medio.url, ancho)} alt={medio.alt} draggable={false} className={`object-cover ${className}`} style={enfoque(medio)} />;
}

// ---- Subir arrastrando ----------------------------------------------------------------------------

/** Estado y manejadores para soltar archivos sobre una zona. `alSubir` recibe los medios ya en la biblioteca. */
export function useSoltarArchivos(alSubir: (m: MedioBiblioteca[]) => void, opciones: { multiple?: boolean } = {}) {
  const { registrar } = useMediosConocidos();
  const [encima, setEncima] = useState(false);
  const [subiendo, setSubiendo] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const profundidad = useRef(0);

  const subir = useCallback(
    async (archivos: File[]) => {
      const lista = opciones.multiple ? archivos : archivos.slice(0, 1);
      if (!lista.length) return;
      setError(null);
      setSubiendo((n) => n + lista.length);
      const hechos: MedioBiblioteca[] = [];
      for (const a of lista) {
        try {
          hechos.push(await subirArchivo(a));
        } catch (e) {
          setError(e instanceof Error ? e.message : String(e));
        } finally {
          setSubiendo((n) => n - 1);
        }
      }
      if (hechos.length) {
        registrar(hechos);
        cacheBiblioteca = cacheBiblioteca ? [...hechos, ...cacheBiblioteca] : null;
        alSubir(hechos);
      }
    },
    [alSubir, opciones.multiple, registrar],
  );

  const manejadores = {
    onDragEnter: (e: React.DragEvent) => {
      if (!e.dataTransfer.types.includes("Files")) return;
      e.preventDefault();
      profundidad.current++;
      setEncima(true);
    },
    onDragOver: (e: React.DragEvent) => {
      if (e.dataTransfer.types.includes("Files")) e.preventDefault();
    },
    onDragLeave: () => {
      if (--profundidad.current <= 0) setEncima(false);
    },
    onDrop: (e: React.DragEvent) => {
      if (!e.dataTransfer.files.length) return;
      e.preventDefault();
      e.stopPropagation();
      profundidad.current = 0;
      setEncima(false);
      subir([...e.dataTransfer.files]);
    },
  };
  return { encima, subiendo, error, setError, subir, manejadores };
}

// ---- Selector (subir o elegir de la biblioteca) ---------------------------------------------------

let cacheBiblioteca: MedioBiblioteca[] | null = null;

type PropsSelector = {
  abierto: boolean;
  alCerrar: () => void;
  alElegir: (medios: MedioBiblioteca[]) => void;
  acepta?: "imagen" | "video" | "todo";
  multiple?: boolean;
  titulo?: string;
};

export function SelectorMedios({ abierto, alCerrar, alElegir, acepta = "imagen", multiple, titulo }: PropsSelector) {
  const [biblioteca, setBiblioteca] = useState<MedioBiblioteca[] | null>(cacheBiblioteca);
  const [busqueda, setBusqueda] = useState("");
  const [elegidos, setElegidos] = useState<string[]>([]);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const terminar = useCallback(
    (m: MedioBiblioteca[]) => {
      alElegir(m);
      setElegidos([]);
      alCerrar();
    },
    [alElegir, alCerrar],
  );
  const { encima, subiendo, error, subir, manejadores } = useSoltarArchivos(terminar, { multiple });

  useEffect(() => {
    if (!abierto) return;
    listarMedios().then((r) => {
      if (r.ok) {
        cacheBiblioteca = r.datos;
        setBiblioteca(r.datos);
      } else setErrorCarga(r.error);
    });
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && alCerrar();
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [abierto, alCerrar]);

  const visibles = (biblioteca ?? []).filter((m) => {
    if (acepta !== "todo" && m.tipo !== acepta) return false;
    const q = busqueda.trim().toLowerCase();
    return !q || `${m.titulo} ${m.alt} ${m.url}`.toLowerCase().includes(q);
  });

  const alternar = (m: MedioBiblioteca) => {
    if (!multiple) return terminar([m]);
    setElegidos((l) => (l.includes(m.id) ? l.filter((x) => x !== m.id) : [...l, m.id]));
  };

  const nombre = titulo ?? (acepta === "video" ? "Elegir vídeo" : acepta === "todo" ? "Elegir archivo" : "Elegir imagen");
  const filtroArchivo = acepta === "imagen" ? ACEPTA.split(",").filter((t) => t.startsWith("image/")).join(",") : acepta === "video" ? "video/mp4,video/webm" : ACEPTA;

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/55 p-2 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={alCerrar}
          data-lenis-prevent
        >
          <motion.div
            role="dialog"
            aria-modal
            aria-label={nombre}
            className="cristal cristal-fuerte flex max-h-[88svh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px]"
            initial={{ y: 40, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.5, ease: CURVA }}
            onClick={(e) => e.stopPropagation()}
            {...manejadores}
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--jm-borde)] px-5 py-4 sm:px-6">
              <h2 className="text-lg font-extrabold tracking-tight">{nombre}</h2>
              <button type="button" onClick={alCerrar} className="boton-icono" aria-label="Cerrar">
                <Icono nombre="cerrar" />
              </button>
            </div>

            <div className="sin-barra flex-1 overflow-y-auto p-4 sm:p-6">
              <button
                type="button"
                onClick={() => input.current?.click()}
                className={`flex w-full flex-col items-center justify-center gap-2 rounded-[24px] border-2 border-dashed px-6 py-8 text-center transition-colors duration-300 ${
                  encima ? "border-[var(--jm-acento)] bg-[rgba(229,9,20,0.08)]" : "border-[var(--jm-borde)] hover:border-white/30 hover:bg-white/[0.03]"
                }`}
              >
                <Icono nombre="subir" className="h-7 w-7 text-[var(--jm-suave)]" />
                <span className="text-sm font-semibold">{subiendo ? `Subiendo ${subiendo === 1 ? "archivo" : `${subiendo} archivos`}…` : "Arrastra aquí o haz clic para subir"}</span>
                <span className="text-xs text-[var(--jm-tenue)]">
                  {acepta === "video" ? "Vídeo mp4 o webm" : acepta === "imagen" ? "JPG, PNG, WebP o AVIF en buena calidad" : "Imagen, vídeo o PDF"} · hasta 50 MB
                </span>
              </button>
              <input
                ref={input}
                type="file"
                hidden
                multiple={multiple}
                accept={filtroArchivo}
                onChange={(e) => {
                  subir([...(e.target.files ?? [])]);
                  e.target.value = "";
                }}
              />
              {(error || errorCarga) && <p className="mt-3 text-sm text-[#ff6b6b]">{error || errorCarga}</p>}

              <div className="mt-6 flex items-center gap-3">
                <h3 className="text-sm font-bold">Tu biblioteca</h3>
                <label className="relative ml-auto w-full max-w-xs">
                  <Icono nombre="buscar" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--jm-tenue)]" />
                  <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar" className="campo !rounded-full !py-2 !pl-9 text-sm" />
                </label>
              </div>
              {!biblioteca && !errorCarga && <p className="mt-6 text-sm text-[var(--jm-tenue)]">Cargando…</p>}
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                {visibles.map((m) => {
                  const si = elegidos.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => alternar(m)}
                      title={m.titulo || m.url}
                      className={`group relative aspect-square overflow-hidden rounded-[18px] ring-2 transition-[box-shadow,transform] duration-300 hover:scale-[1.02] ${si ? "ring-[var(--jm-acento)]" : "ring-transparent"}`}
                    >
                      <Miniatura medio={m} className="absolute inset-0 h-full w-full" />
                      {si && (
                        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--jm-acento)] text-white">
                          <Icono nombre="check" className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {biblioteca && !visibles.length && <p className="mt-4 text-sm text-[var(--jm-tenue)]">No hay nada que coincida.</p>}
            </div>

            {multiple && (
              <div className="flex items-center justify-end gap-2 border-t border-[var(--jm-borde)] px-5 py-3">
                <span className="mr-auto text-xs text-[var(--jm-tenue)]">{elegidos.length ? `${elegidos.length} elegidas` : "Elige una o varias"}</span>
                <button
                  type="button"
                  disabled={!elegidos.length}
                  onClick={() => terminar(elegidos.map((id) => biblioteca!.find((m) => m.id === id)!).filter(Boolean))}
                  className="boton boton-acento px-5 py-2.5 text-sm disabled:opacity-40"
                >
                  Añadir
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
