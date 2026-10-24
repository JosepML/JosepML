import type { Metadata } from "next";
import { Instrument_Serif, Montserrat } from "next/font/google";
import { ProveedorTransicion } from "@/components/comun/Transicion";
import { AvisoVistaPrevia } from "@/components/edicion/AvisoVistaPrevia";
import { Marco } from "@/components/marco/Marco";
import { getAjustes } from "@/lib/datos/ajustes";
import { enVistaPrevia } from "@/lib/datos/cliente";
import "@/styles/tokens.css";
import "@/styles/web.css";
import "@/styles/edicion.css";

// Montserrat para todo el texto (lo pidió Josep) e Instrument Serif cursiva solo para la palabra de acento
const base = Montserrat({ variable: "--font-base", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const acento = Instrument_Serif({ variable: "--font-acento", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export async function generateMetadata(): Promise<Metadata> {
  const ajustes = await getAjustes();
  return {
    title: { default: `${ajustes.nombre} · ${ajustes.lema}`, template: `%s · ${ajustes.nombre}` },
    description: ajustes.lema,
    // Hasta el lanzamiento (fase 7) la web nueva no se indexa
    robots: { index: false, follow: false },
  };
}

export default async function LayoutWeb({ children }: { children: React.ReactNode }) {
  const [ajustes, previa] = await Promise.all([getAjustes(), enVistaPrevia()]);
  return (
    <div className={`${base.variable} ${acento.variable}`}>
      <ProveedorTransicion>
        <Marco ajustes={ajustes}>
          {children}
          {previa && <AvisoVistaPrevia />}
        </Marco>
      </ProveedorTransicion>
    </div>
  );
}
