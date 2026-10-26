import type { Metadata } from "next";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";
import { Revelar } from "@/components/piezas";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto y te respondo.",
};

// Formulario que guarda en la base; no depende de la caché de datos
export const dynamic = "force-dynamic";

export default function Contacto() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 pb-24 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <Revelar>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">Contacto</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-6xl">Hablemos de tu proyecto</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
          Cuéntame qué tienes en mente: un videoclip, un evento, una campaña o algo que aún no tiene nombre. Te respondo
          en cuanto pueda, sin compromiso.
        </p>
      </Revelar>
      <Revelar retraso={0.12}>
        <FormularioContacto />
      </Revelar>
    </div>
  );
}
