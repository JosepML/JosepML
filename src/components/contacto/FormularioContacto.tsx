"use client";

import { useActionState, useState } from "react";
import { enviarContacto, type EstadoContacto } from "@/lib/contacto/enviar";
import { Icono } from "../Iconos";

const CAMPO =
  "w-full rounded-2xl border border-[var(--jm-borde)] bg-white/[0.04] px-4 py-3.5 text-base text-[var(--jm-texto)] outline-none transition-colors placeholder:text-[var(--jm-tenue)] hover:border-white/30 focus:border-[var(--jm-acento)] focus:bg-white/[0.07]";

const SERVICIOS = [
  { valor: "filmmaker", texto: "Filmmaker" },
  { valor: "direccion-de-fotografia", texto: "Dirección de fotografía" },
  { valor: "edicion", texto: "Edición" },
  { valor: "otro", texto: "Otra cosa" },
];

function Etiqueta({ texto, opcional, children }: { texto: string; opcional?: boolean; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--jm-suave)]">
      <span>
        {texto}
        {opcional && <span className="ml-2 text-xs font-normal text-[var(--jm-tenue)]">opcional</span>}
      </span>
      {children}
    </label>
  );
}

export function FormularioContacto() {
  const [estado, accion, enviando] = useActionState<EstadoContacto, FormData>(enviarContacto, {});
  const [servicio, setServicio] = useState("");

  return (
    <form action={accion} className="cristal grid gap-6 rounded-[32px] p-6 sm:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <Etiqueta texto="Nombre">
          <input name="nombre" required minLength={2} autoComplete="name" placeholder="Cómo te llamas" className={CAMPO} />
        </Etiqueta>
        <Etiqueta texto="Correo">
          <input name="correo" type="email" required autoComplete="email" placeholder="tu@correo.com" className={CAMPO} />
        </Etiqueta>
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-1 text-sm font-medium text-[var(--jm-suave)]">
          ¿Qué necesitas?<span className="ml-2 text-xs font-normal text-[var(--jm-tenue)]">opcional</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {SERVICIOS.map((s) => {
            const activo = servicio === s.valor;
            return (
              <label
                key={s.valor}
                className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--jm-acento)] ${
                  activo
                    ? "border-[var(--jm-acento)] bg-[var(--jm-acento)] text-white"
                    : "border-[var(--jm-borde)] bg-white/[0.04] text-[var(--jm-suave)] hover:border-white/30 hover:text-[var(--jm-texto)]"
                }`}
              >
                <input
                  type="radio"
                  name="servicio"
                  value={s.valor}
                  checked={activo}
                  // Pulsar el elegido otra vez lo quita: el servicio es opcional
                  onClick={() => activo && setServicio("")}
                  onChange={() => setServicio(s.valor)}
                  className="sr-only"
                />
                {s.texto}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Etiqueta texto="Cuéntame tu proyecto">
        <textarea
          name="mensaje"
          required
          minLength={10}
          rows={6}
          placeholder="Qué quieres contar, para quién y para cuándo. Cuanto más me cuentes, mejor."
          className={`${CAMPO} resize-y leading-relaxed`}
        />
      </Etiqueta>

      <Etiqueta texto="Teléfono" opcional>
        <input name="telefono" type="tel" autoComplete="tel" placeholder="Si prefieres que te llame" className={CAMPO} />
      </Etiqueta>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-[var(--jm-suave)]">
        <input name="acepta" type="checkbox" required className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[var(--jm-acento)]" />
        <span>Acepto que guardes mis datos para responderme.</span>
      </label>

      {estado.error && (
        <p role="alert" className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {estado.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={enviando} className="boton boton-acento px-8 py-4 text-base disabled:opacity-60">
          {enviando ? "Enviando…" : "Enviar mensaje"}
          {!enviando && <Icono nombre="flecha" className="h-5 w-5" />}
        </button>
        <p className="text-xs text-[var(--jm-tenue)]">Te respondo personalmente, normalmente en menos de 24 horas.</p>
      </div>
    </form>
  );
}
