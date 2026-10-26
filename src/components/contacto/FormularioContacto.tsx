"use client";

import { useActionState } from "react";
import { enviarContacto, type EstadoContacto } from "@/lib/contacto/enviar";

const CAMPO = "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none";

const SERVICIOS = [
  { valor: "", texto: "Elige un servicio (opcional)" },
  { valor: "filmmaker", texto: "Filmmaker" },
  { valor: "direccion-de-fotografia", texto: "Dirección de fotografía" },
  { valor: "edicion", texto: "Edición" },
  { valor: "otro", texto: "Otra cosa" },
];

export function FormularioContacto() {
  const [estado, accion, enviando] = useActionState<EstadoContacto, FormData>(enviarContacto, {});

  return (
    <form action={accion} className="cristal grid gap-5 rounded-[28px] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">
          Nombre
          <input name="nombre" required minLength={2} autoComplete="name" className={CAMPO} />
        </label>
        <label className="grid gap-2 text-sm text-white/80">
          Correo
          <input name="correo" type="email" required autoComplete="email" className={CAMPO} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/80">
          Teléfono (opcional)
          <input name="telefono" type="tel" autoComplete="tel" className={CAMPO} />
        </label>
        <label className="grid gap-2 text-sm text-white/80">
          ¿Qué necesitas?
          <select name="servicio" defaultValue="" className={CAMPO}>
            {SERVICIOS.map((s) => (
              <option key={s.valor} value={s.valor} className="bg-neutral-900">
                {s.texto}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm text-white/80">
        Cuéntame tu proyecto
        <textarea name="mensaje" required minLength={10} rows={6} className={`${CAMPO} resize-y`} />
      </label>
      <label className="flex items-start gap-3 text-sm text-white/70">
        <input name="acepta" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-white" />
        <span>Acepto que guardes mis datos para responderme.</span>
      </label>
      {estado.error && (
        <p role="alert" className="text-sm text-red-300">
          {estado.error}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="justify-self-start rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-900 transition-opacity disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
