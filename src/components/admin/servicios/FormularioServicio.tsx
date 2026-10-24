"use client";

import type { ParaEditar } from "@/lib/admin/contenido";
import { RUTAS } from "@/lib/rutas";
import { FormularioContenido } from "../FormularioContenido";
import { SECCIONES_SERVICIO } from "./esquema";

export function FormularioServicio({ id, inicial }: { id: string; inicial: ParaEditar }) {
  // «Título de Mi mirada» llega con la migración servicios_titulo_mirada: sin la columna, el campo no se enseña
  // (el borrador no admite campos que la tabla no tiene)
  const secciones = "titulo_mirada" in inicial.fila ? SECCIONES_SERVICIO : SECCIONES_SERVICIO.map((s) => ({ ...s, campos: s.campos.filter((c) => c.clave !== "titulo_mirada") }));
  return (
    <FormularioContenido
      tabla="servicios"
      id={id}
      inicial={inicial}
      secciones={secciones}
      volver={{ href: "/admin/servicios", texto: "Volver a Servicios" }}
      rutaPublica={(d) => (typeof d.slug === "string" && d.slug ? RUTAS.servicio(d.slug) : null)}
      titulo={(d) => String(d.nombre ?? "")}
    />
  );
}
