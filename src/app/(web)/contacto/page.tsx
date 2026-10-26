import type { Metadata } from "next";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { Retrato } from "@/components/contacto/Retrato";
import { Revelar, Titular } from "@/components/piezas";
import { getPagina } from "@/lib/datos/paginas";
import { getServicios } from "@/lib/datos/servicios";
import { textos } from "@/lib/datos/util";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto y te respondo.",
};

// Formulario que guarda en la base; no depende de la caché de datos
export const dynamic = "force-dynamic";

export default async function Contacto({ searchParams }: { searchParams: Promise<{ temas?: string }> }) {
  const [servicios, inicio, { temas }] = await Promise.all([getServicios(), getPagina("inicio"), searchParams]);
  // La foto es la del servicio Filmmaker: así cambia desde el panel
  const foto = servicios.find((s) => s.slug === "filmmaker")?.imagen ?? null;
  // Las mismas pastillas que la llamada «¿Tienes una historia que contar?» del final de las páginas: los servicios y las ideas
  // de ese bloque. Lo que se eligió allí llega aquí marcado (?temas=Filmmaker,Videoclip)
  const ideas = textos(inicio?.bloques.find((b) => b.tipo === "llamada")?.datos.opciones);
  const opciones = [...servicios.map((s) => s.nombre), ...ideas];
  const marcados = (temas ?? "").split(",").map((t) => t.trim()).filter((t) => opciones.includes(t));
  return (
    <section className="px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <Retrato medio={foto}>
            <Titular nivel={1} antetitulo="Contacto" titulo="Hablemos de tu *proyecto*" />
            <Revelar retraso={0.12}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--jm-suave)]">
                Cuéntame qué tienes en mente, aunque aún no esté claro. Lo pensamos juntos y te propongo cómo llevarlo a la pantalla. Sin compromiso.
              </p>
            </Revelar>
          </Retrato>
        </div>
        <Revelar retraso={0.2}>
          <FormularioContacto opciones={opciones} marcados={marcados} />
        </Revelar>
      </div>
    </section>
  );
}
