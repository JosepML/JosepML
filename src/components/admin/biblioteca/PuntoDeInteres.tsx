"use client";

// Punto de interés de una foto: lo que tiene que quedar visible cuando la foto se recorta a un formato (tarjeta,
// portada, cabecera). Se marca pulsando o arrastrando sobre la foto y se guarda al soltar. Abajo se ve cómo
// queda en un 16:9 y en un 4:5.

import { useRef, useState } from "react";
import { enfoque, img } from "@/components/comun/imagen";
import { useDialogos } from "@/components/admin/Dialogos";
import { cambiarFoco, type MedioBiblioteca } from "@/lib/admin/medios";

type Foco = { x: number; y: number } | null;

const limitar = (v: number) => Math.min(100, Math.max(0, v));

export function PuntoDeInteres({ medio, alCambiar }: { medio: MedioBiblioteca; alCambiar: (c: Partial<MedioBiblioteca>) => void }) {
  const { avisar } = useDialogos();
  const [foco, setFoco] = useState<Foco>(medio.foco ?? null);
  const [arrastrando, setArrastrando] = useState(false);
  const marco = useRef<HTMLDivElement>(null);

  const enFoto = (e: React.PointerEvent): { x: number; y: number } | null => {
    const r = marco.current?.getBoundingClientRect();
    if (!r || !r.width) return null;
    return { x: limitar(((e.clientX - r.left) / r.width) * 100), y: limitar(((e.clientY - r.top) / r.height) * 100) };
  };

  const empezar = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setArrastrando(true);
    const p = enFoto(e);
    if (p) setFoco(p);
  };

  const mover = (e: React.PointerEvent) => {
    if (!arrastrando) return;
    const p = enFoto(e);
    if (p) setFoco(p);
  };

  const soltar = async (e: React.PointerEvent) => {
    if (!arrastrando) return;
    setArrastrando(false);
    const p = enFoto(e);
    if (!p) return;
    setFoco(p);
    const r = await cambiarFoco(medio.id, p);
    if (!r.ok) return avisar(r.error, "error");
    alCambiar({ foco: p });
  };

  const centrar = async () => {
    setFoco(null);
    const r = await cambiarFoco(medio.id, null);
    if (!r.ok) return avisar(r.error, "error");
    alCambiar({ foco: null });
    avisar("Foto centrada");
  };

  return (
    <div className="block">
      <div className="flex items-center justify-between gap-3">
        <span className="campo-etiqueta">Punto de interés</span>
        {foco && (
          <button type="button" onClick={centrar} className="text-xs font-semibold text-[var(--jm-suave)] underline-offset-4 hover:underline">
            Centrar
          </button>
        )}
      </div>
      <div
        ref={marco}
        className="relative mt-1.5 cursor-crosshair touch-none select-none overflow-hidden rounded-[14px] ring-1 ring-[var(--jm-borde)]"
        onPointerDown={empezar}
        onPointerMove={mover}
        onPointerUp={soltar}
        onPointerCancel={() => setArrastrando(false)}
      >
        <img src={img(medio.url, 640)} alt="" draggable={false} className="block w-full" />
        {foco && (
          <span
            className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--jm-acento)] shadow-[0_0_0_4px_rgba(0,0,0,0.25)]"
            style={{ left: `${foco.x}%`, top: `${foco.y}%` }}
          />
        )}
      </div>
      <p className="campo-ayuda">Pulsa o arrastra sobre la foto. Es lo que se ve al recortarla para tarjetas, portadas y cabeceras.</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {[
          { nombre: "16:9", clase: "aspect-[16/9]" },
          { nombre: "4:5", clase: "aspect-[4/5]" },
        ].map((v) => (
          <figure key={v.nombre} className="min-w-0">
            <div className={`${v.clase} overflow-hidden rounded-[12px] ring-1 ring-[var(--jm-borde)]`}>
              <img src={img(medio.url, 640)} alt="" draggable={false} className="h-full w-full object-cover" style={enfoque({ foco })} />
            </div>
            <figcaption className="mt-1 text-center text-[11px] text-[var(--jm-tenue)]">{v.nombre}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
