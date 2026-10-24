import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FichaProyecto } from "@/components/trabajos/FichaProyecto";
import { getProyectos } from "@/lib/datos/proyectos";
import { getServicios } from "@/lib/datos/servicios";

// Datos de la caché en cada visita (ver src/app/(web)/page.tsx)
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProyectos()).find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.seo.titulo ? { absolute: p.seo.titulo } : p.titulo,
    description: p.seo.descripcion || p.textos.tarjeta || undefined,
    openGraph: p.poster ? { images: [p.poster.url] } : undefined,
  };
}

export default async function Proyecto({ params }: Props) {
  const { slug } = await params;
  const [proyectos, servicios] = await Promise.all([getProyectos(), getServicios()]);
  const i = proyectos.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  // El siguiente en el orden de Trabajos, y del último se vuelve al primero
  const siguiente = proyectos.length > 1 ? proyectos[(i + 1) % proyectos.length] : null;
  return <FichaProyecto proyecto={proyectos[i]} siguiente={siguiente} servicios={servicios} />;
}
