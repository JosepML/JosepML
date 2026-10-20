"use client";

import Link from "next/link";
import { type EstiloTransicion, useTransicion } from "./Transicion";

type Props = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  estilo: EstiloTransicion;
  rotulo?: string;
};

/**
 * Enlace que navega con la transición del prototipo.
 * Si dentro hay una imagen con data-transicion, es la que "crece" hasta la cabecera.
 */
export function Enlace({ href, estilo, rotulo, onClick, ...resto }: Props) {
  const ir = useTransicion();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        const imagen = e.currentTarget.querySelector<HTMLImageElement>("img[data-transicion]");
        ir(href, { estilo, imagen, rotulo });
      }}
      {...resto}
    />
  );
}
