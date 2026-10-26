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

  await avisar({ nombre, correo, telefono, servicio, mensaje });
  redirect(RUTAS.gracias);
}

/**
 * Aviso por correo con Resend. Si falta la clave o el correo de destino no hace nada, y si falla
 * no se lo mostramos al cliente: el mensaje ya está guardado en el panel.
 */
async function avisar(datos: { nombre: string; correo: string; telefono: string; servicio: string; mensaje: string }) {
  const clave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_CORREO;
  if (!clave || !destino) return;

  const lineas = [
    `Nombre: ${datos.nombre}`,
    `Correo: ${datos.correo}`,
    datos.telefono ? `Teléfono: ${datos.telefono}` : "",
    datos.servicio ? `Servicio: ${datos.servicio}` : "",
    "",
    datos.mensaje,
  ].filter(Boolean);

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Web Josep Mira <onboarding@resend.dev>",
        to: [destino],
        reply_to: datos.correo,
        subject: `Nuevo mensaje de ${datos.nombre}`,
        text: lineas.join("\n"),
      }),
    });
  } catch {
    // El mensaje ya está en el panel; un fallo del correo no debe tumbar el envío
  }
}
