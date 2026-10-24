// Funciones puras sobre los datos ya cargados. Sin nada de servidor: las pueden usar los componentes de cliente.
import type { Proyecto, Servicio } from "./tipos";

/**
 * Proyectos de un filtro de Trabajos (o de la página de un servicio):
 * - «todos»: los destacados de Inicio (`destacado_orden`), en ese orden.
 * - un servicio: primero sus destacados (en su orden dentro del servicio) y detrás el resto de sus proyectos.
 */
export function proyectosDe(proyectos: Proyecto[], filtro: string): Proyecto[] {
  if (filtro === "todos") {
    return proyectos.filter((p) => p.destacadoOrden !== null).sort((a, b) => a.destacadoOrden! - b.destacadoOrden!);
  }
  const de = (p: Proyecto) => p.servicios.find((s) => s.slug === filtro);
  return proyectos
    .filter((p) => de(p))
    .sort((a, b) => {
      const sa = de(a)!;
      const sb = de(b)!;
      if (sa.destacado !== sb.destacado) return sa.destacado ? -1 : 1;
      return sa.orden - sb.orden || a.orden - b.orden;
    });
}

/** Fotos de la tarjeta de un servicio: los pósters de sus primeros proyectos (o su imagen propia primero) */
export function imagenesDe(servicio: Servicio, proyectos: Proyecto[], cuantas = 4): string[] {
  const urls = proyectosDe(proyectos, servicio.slug).flatMap((p) => (p.poster ? [p.poster.url] : []));
  return [...(servicio.imagen ? [servicio.imagen.url] : []), ...urls].slice(0, cuantas);
}

/** Fotogramas de un proyecto para las diapositivas al pasar el ratón: la galería, o al menos el póster */
export function fotogramas(p: Proyecto): string[] {
  const g = p.galeria.map((x) => x.imagen.url);
  if (g.length > 1) return g;
  return p.poster ? [p.poster.url] : g;
}

/** El premio que se enseña en la tarjeta (laurel): el primero de la lista */
export const laurel = (p: Proyecto) => p.premios[0] ?? null;

/** Fecha AAAA-MM-DD → «13 may 2025» */
export function fechaCorta(iso: string) {
  const [a, m, d] = iso.split("-").map(Number);
  if (!a || !m || !d) return iso;
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).replace(".", "");
}
