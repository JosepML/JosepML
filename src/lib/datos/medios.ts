import { filas, urlBucket, type Fila } from "./cliente";
import type { Medio } from "./tipos";

function aMedio(f: Fila<"medios">): Medio | null {
  const url = f.ruta ? urlBucket(f.ruta) : f.url_origen;
  if (!url) return null;
  const foco = f.foco_x != null && f.foco_y != null ? { x: f.foco_x, y: f.foco_y } : null;
  return { id: f.id, url, tipo: f.tipo, alt: f.texto_alternativo, ancho: f.ancho, alto: f.alto, foco };
}

/** Biblioteca de medios por id, con la URL resuelta (bucket si ya está subido; si no, la URL de origen) */
export async function getMedios(): Promise<Record<string, Medio>> {
  const lista: Record<string, Medio> = {};
  for (const f of await filas("medios")) {
    const m = aMedio(f);
    if (m) lista[f.id] = m;
  }
  return lista;
}

/** Busca un medio por id; null si no hay id o no existe */
export function medio(medios: Record<string, Medio>, id: unknown): Medio | null {
  return typeof id === "string" && id ? (medios[id] ?? null) : null;
}

/** Lista `[{ medio, pie }]` de la base de datos → imágenes con pie (las que no existen se descartan) */
export function listaMedios(medios: Record<string, Medio>, lista: unknown) {
  if (!Array.isArray(lista)) return [];
  return lista.flatMap((e) => {
    const m = medio(medios, (e as { medio?: unknown })?.medio);
    return m ? [{ imagen: m, pie: String((e as { pie?: unknown }).pie ?? "") }] : [];
  });
}
