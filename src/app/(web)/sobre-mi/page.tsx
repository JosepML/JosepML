import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaginaBloques } from "@/components/bloques/PaginaBloques";
import { getPagina } from "@/lib/datos/paginas";
import { getPaginaConDatos } from "@/lib/datos/web";

// Datos de la caché en cada visita (ver src/app/(web)/page.tsx)
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pagina = await getPagina("sobre-mi");
  return {
    title: pagina?.seo.titulo ? { absolute: pagina.seo.titulo } : "Sobre mí",
    description: pagina?.seo.descripcion || undefined,
  };
}

/** Sobre mí: una página de bloques que Josep edita como Inicio (plan/contenido/sobre-mi.md) */
export default async function SobreMi() {
  const r = await getPaginaConDatos("sobre-mi");
  if (!r) notFound();
  // El menú fijo tapa el principio: la primera sección baja lo que mide
  return (
    <div className="pt-16 sm:pt-20">
      <PaginaBloques bloques={r.pagina.bloques} datos={r.datos} />
    </div>
  );
}
