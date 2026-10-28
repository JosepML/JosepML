import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactoCliente } from "@/components/contacto/ContactoCliente";
import { getPagina } from "@/lib/datos/paginas";
import { getFotoContacto } from "@/lib/datos/contacto";
import { getServicios } from "@/lib/datos/servicios";
import { textos } from "@/lib/datos/util";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntame tu proyecto y te respondo.",
};

export default async function Contacto() {
  const [servicios, inicio] = await Promise.all([getServicios(), getPagina("inicio")]);
  const foto = await getFotoContacto(servicios.find((s) => s.slug === "filmmaker")?.imagen ?? null);
  const ideas = textos(inicio?.bloques.find((b) => b.tipo === "llamada")?.datos.opciones);
  const opciones = [...servicios.map((s) => s.nombre), ...ideas];

  return (
    <section className="px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      <Suspense fallback={null}>
        <ContactoCliente foto={foto} opciones={opciones} />
      </Suspense>
    </section>
  );
}
