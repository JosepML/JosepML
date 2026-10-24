import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaServicio } from "@/components/servicios/PaginaServicio";
import { getPaginaConDatos } from "@/lib/datos/web";

// Datos de la caché en cada visita (ver src/app/(web)/page.tsx)
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

/** Los datos de la web (los mismos que lee Inicio) y el servicio pedido */
async function cargar(slug: string) {
  const r = await getPaginaConDatos("inicio");
  const servicio = r?.datos.servicios.find((s) => s.slug === slug);
  return r && servicio ? { ...r, servicio } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await cargar((await params).slug);
  if (!r) return {};
  const s = r.servicio;
  return { title: s.seo.titulo ? { absolute: s.seo.titulo } : s.nombre, description: s.seo.descripcion || s.resumen };
}

export default async function Servicio({ params }: Props) {
  const r = await cargar((await params).slug);
  if (!r) notFound();
  const llamada = r.pagina.bloques.find((b) => b.tipo === "llamada") ?? null;
  // En Filmmaker, las tarjetas de sus especialidades (solo si llevan a su página)
  const filmmaker = r.pagina.bloques.find((b) => b.tipo === "filmmaker" && Array.isArray(b.datos.piezas) && b.datos.piezas.some((x) => typeof x === "object" && x && "href" in x && x.href));
  const especialidades = r.servicio.slug === "filmmaker" ? (filmmaker ?? null) : null;
  return <PaginaServicio servicio={r.servicio} datos={r.datos} llamada={llamada} especialidades={especialidades} />;
}
