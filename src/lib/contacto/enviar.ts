"use server";

// Envío del formulario de contacto: lo guarda en `mensajes` (la base lo limita a 30 por hora y valida los campos)

import { redirect } from "next/navigation";
import { RUTAS } from "@/lib/rutas";
import { createClient } from "@/lib/supabase/server";

export type EstadoContacto = { error?: string };

const SERVICIOS = ["filmmaker", "direccion-de-fotografia", "edicion", "otro"];

export async function enviarContacto(_previo: EstadoContacto, datos: FormData): Promise<EstadoContacto> {
  const texto = (clave: string) => String(datos.get(clave) ?? "").trim();
  const nombre = texto("nombre");
  const correo = texto("correo");
  const telefono = texto("telefono");
  const servicio = texto("servicio");
  const mensaje = texto("mensaje");

  if (nombre.length < 2) return { error: "Dime tu nombre, por favor." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return { error: "Revisa el correo: parece que le falta algo." };
  if (mensaje.length < 10) return { error: "Cuéntame un poco más sobre tu proyecto (al menos unas líneas)." };
  if (datos.get("acepta") !== "on") return { error: "Necesito que aceptes que guarde tus datos para responderte." };

  const s = await createClient();
  const { error } = await s.from("mensajes").insert({
    nombre,
    correo,
    telefono,
    servicio: SERVICIOS.includes(servicio) ? servicio : "",
    mensaje,
    origen: "contacto",
    acepta_privacidad: true,
  });
  if (error) return { error: "No se ha podido enviar ahora mismo. Prueba de nuevo en un rato." };

  redirect(RUTAS.gracias);
}
