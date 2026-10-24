import type { Metadata } from "next";
import { ListaProyectos } from "@/components/admin/proyectos/ListaProyectos";
import { listar } from "@/lib/admin/contenido";
import { mediosPorId } from "@/lib/admin/medios";
import { exigirAdmin } from "@/lib/admin/sesion";

export const metadata: Metadata = { title: "Proyectos" };

export default async function Proyectos() {
  const s = await exigirAdmin({ redirigir: "/admin/proyectos" });
  const [r, { data: tipos }] = await Promise.all([listar("proyectos"), s.from("tipos_proyecto").select("id, nombre")]);
  if (!r.ok) return <p className="text-[#ff6b6b]">{r.error}</p>;
  // Póster de cada uno (o la primera foto de la galería), para reconocerlos de un vistazo
  const poster = (p: Record<string, unknown>) => {
    const d = { ...p, ...(p.borrador as Record<string, unknown> | null) };
    return (d.imagen_id as string | null) ?? ((d.galeria as { medio: string }[] | undefined)?.[0]?.medio ?? null);
  };
  const ids = r.datos.map(poster).filter((x): x is string => !!x);
  const medios = await mediosPorId(ids);
  return (
    <ListaProyectos
      inicial={r.datos.map((p) => {
        const d = { ...p, ...(p.borrador ?? {}) };
        const m = medios.ok ? medios.datos[poster(p) ?? ""] : undefined;
        return {
          id: p.id,
          titulo: String(d.titulo ?? ""),
          slug: String(p.slug ?? ""),
          anio: (d.anio as number | null) ?? null,
          tipo: (tipos ?? []).find((t) => t.id === d.tipo_id)?.nombre ?? "",
          estado: p.estado as string,
          nuevo: !p.publicado_en,
          hayBorrador: p.hayBorrador,
          destacado: (p.destacado_orden as number | null) ?? null,
          poster: m ?? null,
        };
      })}
    />
  );
}
