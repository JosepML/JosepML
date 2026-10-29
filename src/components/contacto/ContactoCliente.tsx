"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SeccionContacto } from "@/components/contacto/SeccionContacto";
import { Revelar, Titular } from "@/components/piezas";
import type { Medio } from "@/lib/datos/tipos";

export function ContactoCliente({
  foto,
  opciones,
}: {
  foto: Medio | null;
  opciones: string[];
}) {
  const searchParams = useSearchParams();
  const marcados = useMemo(() => {
    const temas = searchParams.get("temas");
    return (temas ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => opciones.includes(t));
  }, [searchParams, opciones]);

  return (
    <SeccionContacto
      medio={foto}
      opciones={opciones}
      marcados={marcados}
      cabecera={
        <>
          <Titular nivel={1} antetitulo="Contacto" titulo="Hablemos de tu *proyecto*" />
          <Revelar retraso={0.12}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--jm-suave)]">
              Cuéntame qué tienes en mente, aunque aún no esté claro. Lo pensamos juntos y te propongo cómo llevarlo a la pantalla. Sin compromiso.
            </p>
          </Revelar>
        </>
      }
    />
  );
}
