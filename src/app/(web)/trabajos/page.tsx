import type { Metadata } from "next";
import { Titular } from "@/components/piezas";
import { ListadoTrabajos } from "@/components/trabajos/ListadoTrabajos";
import { getPagina } from "@/lib/datos/paginas";
import { getProyectos } from "@/lib/datos/proyectos";
import { getServicios } from "@/lib/datos/servicios";
import { texto } from "@/lib/datos/util";

// Datos de la caché en cada visita (ver src/app/(web)/page.tsx)
export const dynamic = "force-dynamic";

/** Cabecera: el primer bloque de la página «trabajos» (supabase/datos/06-trabajos.sql) y, si no existe, el bloque Selección de Inicio */
async function cabecera() {
  const [trabajos, inicio] = await Promise.all([getPagina("trabajos"), getPagina("inicio")]);
  const datos = trabajos?.bloques[0]?.datos ?? inicio?.bloques.find((b) => b.tipo === "trabajos")?.datos ?? {};
  return { pagina: trabajos, antetitulo: texto(datos.antetitulo) || "Trabajos", titulo: texto(datos.titulo) || "Trabajos", texto: texto(datos.texto) };
}

export async function generateMetadata(): Promise<Metadata> {
  const { pagina, titulo } = await cabecera();
  return { title: pagina?.seo.titulo ? { absolute: pagina.seo.titulo } : "Trabajos", description: pagina?.seo.descripcion || titulo.replace(/\*/g, "") };
}

export default async function Trabajos() {
  const [c, proyectos, servicios] = await Promise.all([cabecera(), getProyectos(), getServicios()]);
  return (
    <main className="px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <Titular nivel={1} antetitulo={c.antetitulo} titulo={c.titulo} texto={c.texto} />
        <ListadoTrabajos proyectos={proyectos} servicios={servicios} />
      </div>
    </main>
  );
}
