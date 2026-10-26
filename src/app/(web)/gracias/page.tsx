import type { Metadata } from "next";
import Link from "next/link";
import { RUTAS } from "@/lib/rutas";

export const metadata: Metadata = {
  title: "Gracias",
  robots: { index: false, follow: false },
};

// Como el resto de la web: los datos (menú, ajustes) se leen en cada visita, no al compilar
export const dynamic = "force-dynamic";

export default function Gracias() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col items-start justify-center px-4 pb-24 pt-28 sm:px-8">
      <h1 className="text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl">Gracias por escribirme</h1>
      <p className="mt-4 max-w-xl text-base text-white/70">
        He recibido tu mensaje. Te respondo a tu correo en cuanto pueda.
      </p>
      <Link href={RUTAS.trabajos} className="mt-10 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
        Ver algunos trabajos
      </Link>
    </div>
  );
}
