import type { Metadata } from "next";
import Link from "next/link";
import { FotoGracias } from "@/components/contacto/FotoGracias";
import { Revelar } from "@/components/piezas";
import { getServicio } from "@/lib/datos/servicios";
import { RUTAS } from "@/lib/rutas";

export const metadata: Metadata = {
  title: "Gracias",
  robots: { index: false, follow: false },
};

// Como el resto de la web: los datos (menú, ajustes, foto del servicio) se leen en cada visita, no al compilar
export const dynamic = "force-dynamic";

export default async function Gracias() {
  const servicio = await getServicio("filmmaker");
  const foto = servicio?.imagen ?? servicio?.fotosCabecera[0] ?? null;

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-2 lg:gap-20">
      <Revelar>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">Mensaje recibido</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.035em] sm:text-6xl">Gracias por escribirme</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
          Lo he leído y te respondo a tu correo en cuanto pueda. Mientras tanto, puedes ver cómo trabajo.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={RUTAS.trabajos} className="boton boton-acento px-6 py-3 text-sm">
            Ver trabajos
          </Link>
          <Link href={RUTAS.inicio} className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Volver al inicio
          </Link>
        </div>
      </Revelar>
      {foto && <FotoGracias foto={foto} />}
    </div>
  );
}
