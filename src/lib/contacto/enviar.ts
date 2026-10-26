"use server";

// Envío del formulario de contacto: lo guarda en `mensajes` (la base lo limita a 30 por hora y valida los campos) y
// avisa a Josep por correo con el formulario de Formspree que ya usaba la web antigua (el identificador es público).
// Si el aviso falla, el mensaje ya está guardado en el panel y quien escribe no ve ningún error.

import { redirect } from "next/navigation";
import { RUTAS } from "@/lib/rutas";
import { createClient } from "@/lib/supabase/server";

export type EstadoContacto = { error?: string };

const FORMSPREE = "https://formspree.io/f/mrblvlpb";

async function avisarPorCorreo(m: { nombre: string; correo: string; telefono: string; servicio: string; mensaje: string }) {
  try {
    await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Web nueva · mensaje de ${m.nombre}`,
        _replyto: m.correo,
        nombre: m.nombre,
        correo: m.correo,
        telefono: m.telefono || "—",
        servicio: m.servicio || "—",
        mensaje: m.mensaje,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // El mensaje ya está en el panel de Mensajes
  }
}

export async function enviarContacto(_previo: EstadoContacto, datos: FormData): Promise<EstadoContacto> {
  const texto = (clave: string) => String(datos.get(clave) ?? "").trim();
  const nombre = texto("nombre");
  const correo = texto("correo");
  const telefono = texto("telefono");
  // Lo que se eligió en las pastillas («Filmmaker, Videoclip»): texto libre, acotado al límite de la base
  const servicio = texto("servicio").slice(0, 120);
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
    servicio,
    mensaje,
    origen: "contacto",
    acepta_privacidad: true,
  });
  if (error) return { error: "No se ha podido enviar ahora mismo. Prueba de nuevo en un rato." };

  await avisarPorCorreo({ nombre, correo, telefono, servicio, mensaje });
  redirect(RUTAS.gracias);
}
