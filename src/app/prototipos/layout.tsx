import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { BarraPrototipos } from "./_comun/BarraPrototipos";
import { SuavizadoScroll } from "./_comun/SuavizadoScroll";
import { ProveedorTransicion } from "./_comun/Transicion";
import "./prototipos.css";

// Tipografías extra de las variantes B (Instrument Serif + IBM Plex Mono) y C (Anton + JetBrains Mono).
// La A usa las de la base: Cormorant Garamond e Inter.
const serifB = Instrument_Serif({ variable: "--font-b-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const monoB = IBM_Plex_Mono({ variable: "--font-b-mono", subsets: ["latin"], weight: ["400", "500"] });
const displayC = Anton({ variable: "--font-c-display", subsets: ["latin"], weight: "400" });
const monoC = JetBrains_Mono({ variable: "--font-c-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Prototipos · Dirección visual",
  robots: { index: false, follow: false },
};

export default function LayoutPrototipos({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serifB.variable} ${monoB.variable} ${displayC.variable} ${monoC.variable}`}>
      <ProveedorTransicion>
        <SuavizadoScroll />
        {children}
        <BarraPrototipos />
      </ProveedorTransicion>
    </div>
  );
}
