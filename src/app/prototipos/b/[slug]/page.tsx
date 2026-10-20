import { notFound } from "next/navigation";
import { getProyecto, PROYECTOS } from "../../_comun/datos";
import { FichaB } from "../FichaB";

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }));
}

export default async function ProyectoB({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proyecto = getProyecto(slug);
  if (!proyecto) notFound();
  return <FichaB proyecto={proyecto} />;
}
