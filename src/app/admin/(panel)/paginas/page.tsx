import type { Metadata } from "next";
import Link from "next/link";
import { Icono } from "@/components/Iconos";
import { exigirAdmin } from "@/lib/admin/sesion";

export const metadata: Metadata = { title: "Páginas" };

/** Páginas hechas de bloques que ya se editan en su sitio. Trabajos y Recreaciones tienen plantilla propia: su
 *  cabecera se editará cuando su pantalla llegue al panel. */
const EN_SU_SITIO: Record<string, string> = { inicio: "/", "sobre-mi": "/sobre-mi" };

export default async function Paginas() {
  const s = await exigirAdmin({ redirigir: "/admin/paginas" });
  const [{ data: paginas }, { data: borradores }] = await Promise.all([
    s.from("paginas").select("id, titulo, slug, estado").order("creado_en"),
    s.from("borradores").select("fila_id").eq("tabla", "paginas"),
  ]);
  const conCambios = new Set((borradores ?? []).map((b) => b.fila_id));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-extrabold tracking-[-0.04em]">Páginas</h1>
      <p className="mt-2 max-w-xl text-[var(--jm-suave)]">Las páginas se editan en la propia web: ábrela y pulsa «Editar página» (abajo a la derecha). Cambias los textos haciendo clic encima, las fotos arrastrando, y las secciones desde el panel. Para cambiar solo el orden de las secciones, «Ordenar secciones».</p>
      <ul className="mt-8 flex flex-col gap-2">
        {(paginas ?? []).map((p) => {
          const ruta = EN_SU_SITIO[p.slug];
          return (
            <li key={p.id} className="cristal flex items-center gap-4 rounded-[24px] px-5 py-4">
              <Icono nombre="pagina" className="h-5 w-5 shrink-0 text-[var(--jm-suave)]" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{p.titulo || p.slug}</span>
                <span className="text-xs text-[var(--jm-tenue)]">
                  /{p.slug === "inicio" ? "" : p.slug}
                  {conCambios.has(p.id) && <span className="ml-2 text-[var(--jm-calido)]">· cambios sin publicar</span>}
                </span>
              </span>
              {ruta ? (
                <span className="flex flex-wrap justify-end gap-1.5">
                  <Link href={`/admin/paginas/${p.id}`} className="boton boton-suave px-4 py-2 text-sm" title="Cambiar el orden de las secciones u ocultarlas">
                    <Icono nombre="asa" className="h-4 w-4" />
                    Ordenar secciones
                  </Link>
                  <Link href={`${ruta}?editar=1`} className="boton boton-acento px-4 py-2 text-sm">
                    <Icono nombre="lapiz" className="h-4 w-4" />
                    Editar en la web
                  </Link>
                </span>
              ) : (
                <span className="text-xs text-[var(--jm-tenue)]">Plantilla propia · pronto</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
