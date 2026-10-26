import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorCabecera } from "@/components/admin/paginas/EditorCabecera";
import { EditorJuno } from "@/components/admin/paginas/EditorJuno";
import { OrdenSecciones } from "@/components/admin/paginas/OrdenSecciones";
import { cargarParaEditar } from "@/lib/admin/contenido";
import { exigirAdmin } from "@/lib/admin/sesion";
import { rutaPagina } from "@/lib/rutas";

export const metadata: Metadata = { title: "Página" };

/** Las páginas con plantilla propia: su contenido sale de los proyectos y solo se edita la cabecera */
const CON_PLANTILLA = new Set(["trabajos", "recreaciones"]);

export default async function EditarPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = await exigirAdmin({ redirigir: `/admin/paginas/${id}` });
  const r = await cargarParaEditar("paginas", id);
  if (!r.ok) notFound();
  const slug = String(r.datos.fila.slug ?? "");
  const ruta = rutaPagina(slug);
  if (slug === "juno-media") {
    const { data } = await s.from("proyectos").select("id, titulo").order("orden");
    return <EditorJuno id={id} slug={slug} ruta={ruta} inicial={r.datos} proyectos={(data ?? []).map((p) => ({ valor: p.id, nombre: p.titulo }))} />;
  }
  if (CON_PLANTILLA.has(slug)) return <EditorCabecera id={id} slug={slug} ruta={ruta} inicial={r.datos} />;
  return <OrdenSecciones id={id} titulo={String(r.datos.fila.titulo || slug)} ruta={ruta} inicial={r.datos} />;
}
