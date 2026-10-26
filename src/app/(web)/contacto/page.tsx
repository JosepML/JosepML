import type { Metadata } from "next";
import { FormularioContacto } from "@/components/contacto/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto y te respondo.",
};

// Formulario que guarda en la base; no depende de la caché de datos
export const dynamic = "force-dynamic";

export default function Contacto() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      <h1 className="text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Hablemos de tu proyecto</h1>
      <p className="mt-4 max-w-xl text-base text-white/70">
        Escríbeme qué tienes en mente y te respondo en cuanto pueda. Sin compromiso.
      </p>
      <div className="mt-10">
        <FormularioContacto />
      </div>
    </div>
  );
}
