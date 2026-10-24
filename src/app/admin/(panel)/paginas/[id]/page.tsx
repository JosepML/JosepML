import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrdenSecciones } from "@/components/admin/paginas/OrdenSecciones";
import { cargarParaEditar } from "@/lib/admin/contenido";
import { exigirAdmin } from "@/lib/admin/sesion";

export const metadata: Metadata = { title: "Secciones" };

export default async function SeccionesPagina({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await exigirAdmin({ redirigir: `/admin/paginas/${id}` });
  const r = await cargarParaEditar("paginas", id);
  if (!r.ok) notFound();
  const slug = String(r.datos.fila.slug ?? "");
  return <OrdenSecciones id={id} titulo={String(r.datos.fila.titulo || slug)} ruta={slug === "inicio" ? "/" : `/${slug}`} inicial={r.datos} />;
}
