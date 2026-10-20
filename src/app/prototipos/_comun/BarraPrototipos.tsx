"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VARIANTES = [
  { letra: "a", nombre: "Sala" },
  { letra: "b", nombre: "Papel" },
  { letra: "c", nombre: "Contraste" },
];

/** Barra flotante para saltar entre prototipos durante la revisión. No va en la web final. */
export function BarraPrototipos() {
  const ruta = usePathname();
  const actual = ruta.split("/")[2];
  if (!actual) return null;

  return (
    <nav
      aria-label="Prototipos"
      className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/75 p-1 font-sans text-[11px] text-white/80 shadow-lg backdrop-blur"
    >
      <Link href="/prototipos" className="rounded-full px-3 py-1.5 hover:text-white">
        Índice
      </Link>
      {VARIANTES.map((v) => (
        <Link
          key={v.letra}
          href={`/prototipos/${v.letra}`}
          className={`rounded-full px-3 py-1.5 ${actual === v.letra ? "bg-white text-black" : "hover:text-white"}`}
        >
          {v.letra.toUpperCase()} <span className="hidden sm:inline">· {v.nombre}</span>
        </Link>
      ))}
      <button
        type="button"
        onClick={() => {
          window.location.href = `/prototipos/${actual}?apertura`;
        }}
        className="whitespace-nowrap rounded-full px-3 py-1.5 hover:text-white"
      >
        <span className="hidden sm:inline">Ver </span>apertura
      </button>
    </nav>
  );
}
