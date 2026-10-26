import type { Metadata } from "next";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { Retrato } from "@/components/contacto/Retrato";
import { Revelar, Titular } from "@/components/piezas";
import { getServicio } from "@/lib/datos/servicios";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto y te respondo.",
};

// Formulario que guarda en la base; no depende de la caché de datos
export const dynamic = "force-dynamic";

export default async function Contacto() {
  // La foto es la del servicio Filmmaker: así cambia desde el panel
  const foto = (await getServicio("filmmaker"))?.imagen ?? null;
  return (
    <section className="px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        {/* Texto arriba y la foto debajo; el formulario, al lado. En pantallas altas la columna se queda fija mientras se rellena */}
        <div className="lg:sticky lg:top-28">
          <Titular nivel={1} antetitulo="Contacto" titulo="Hablemos de tu *proyecto*" />
          <Revelar retraso={0.12}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--jm-suave)]">
              Cuéntame qué tienes en mente, aunque aún no esté claro. Lo pensamos juntos y te propongo cómo llevarlo a la pantalla. Sin compromiso.
            </p>
          </Revelar>
          <Retrato
            className="mt-8 lg:mt-10"
            aspecto="aspect-[4/5] max-w-md lg:aspect-[3/2] lg:max-w-none"
            medio={foto}
            etiqueta="Josep Mira Lozano · Filmmaker, director de fotografía y editor"
          />
        </div>
        <Revelar retraso={0.2}>
          <FormularioContacto />
        </Revelar>
      </div>
    </section>
  );
}
