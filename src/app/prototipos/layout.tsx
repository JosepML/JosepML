import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { BarraPrototipos } from "./_comun/BarraPrototipos";
import { ProveedorTransicion } from "./_comun/Transicion";
import "./prototipos.css";

// Serif cursiva para las palabras de acento del prototipo D (el texto va en Inter, de la base)
const acento = Instrument_Serif({ variable: "--font-acento", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Prototipos · Dirección visual",
  robots: { index: false, follow: false },
};

export default function LayoutPrototipos({ children }: { children: React.ReactNode }) {
  return (
    <div className={acento.variable}>
      <ProveedorTransicion>
        {children}
        <BarraPrototipos />
      </ProveedorTransicion>
    </div>
  );
}
