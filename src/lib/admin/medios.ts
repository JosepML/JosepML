"use server";

import type { Medio } from "@/lib/datos/tipos";
import { urlBucket } from "@/lib/datos/url";
import { exigirAdmin } from "./sesion";
import type { Resultado } from "./tipos";

export type MedioBiblioteca = Medio & { titulo: string; creadoEn: string; bytes: number | null; mime: string };

type FilaMedio = {
  id: string;
  ruta: string | null;
  url_origen: string | null;
  tipo: Medio["tipo"];
  texto_alternativo: string;
  titulo: string;
  ancho: number | null;
  alto: number | null;
  bytes: number | null;
  mime: string;
  creado_en: string;
};

function aMedio(f: FilaMedio): MedioBiblioteca {
  return {
    id: f.id,
    url: f.ruta ? urlBucket(f.ruta) : (f.url_origen ?? ""),
    tipo: f.tipo,
    alt: f.texto_alternativo,
    ancho: f.ancho,
    alto: f.alto,
    titulo: f.titulo,
    creadoEn: f.creado_en,
    bytes: f.bytes,
    mime: f.mime,
  };
}

const mensaje = (e: unknown) => (e instanceof Error ? e.message : String(e));

/** Toda la biblioteca, lo último primero (para el selector de imágenes) */
export async function listarMedios(): Promise<Resultado<MedioBiblioteca[]>> {
  try {
    const s = await exigirAdmin();
    const { data, error } = await s.from("medios").select("*").order("creado_en", { ascending: false });
    if (error) throw new Error(error.message);
    return { ok: true, datos: (data as FilaMedio[]).map(aMedio) };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

/** Medios por id (el editor los necesita para pintar lo que se acaba de elegir) */
export async function mediosPorId(ids: string[]): Promise<Resultado<Record<string, MedioBiblioteca>>> {
  try {
    if (!ids.length) return { ok: true, datos: {} };
    const s = await exigirAdmin();
    const { data, error } = await s.from("medios").select("*").in("id", ids);
    if (error) throw new Error(error.message);
    return { ok: true, datos: Object.fromEntries((data as FilaMedio[]).map((f) => [f.id, aMedio(f)])) };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

export type DatosSubida = {
  ruta: string;
  tipo: Medio["tipo"];
  mime: string;
  bytes: number;
  ancho: number | null;
  alto: number | null;
  duracion: number | null;
  titulo: string;
};

/** Da de alta en la biblioteca un archivo que el navegador acaba de subir al bucket */
export async function registrarMedio(d: DatosSubida): Promise<Resultado<MedioBiblioteca>> {
  try {
    const s = await exigirAdmin();
    const { data, error } = await s
      .from("medios")
      .insert({ ruta: d.ruta, tipo: d.tipo, mime: d.mime, bytes: d.bytes, ancho: d.ancho, alto: d.alto, duracion: d.duracion, titulo: d.titulo })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, datos: aMedio(data as FilaMedio) };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}

/** Texto alternativo (lo que lee un lector de pantalla y Google) */
export async function cambiarTextoAlternativo(id: string, texto: string): Promise<Resultado<null>> {
  try {
    const s = await exigirAdmin();
    const { error } = await s.from("medios").update({ texto_alternativo: texto }).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true, datos: null };
  } catch (e) {
    return { ok: false, error: mensaje(e) };
  }
}
