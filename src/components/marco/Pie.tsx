import type { Ajustes } from "@/lib/datos/tipos";

/** Pie de todas las páginas: nombre, lo que hace, dónde y las redes de los ajustes. */
export function Pie({ ajustes }: { ajustes: Ajustes }) {
  const redes = [
    { nombre: "Instagram", url: ajustes.redes.instagram },
    { nombre: "YouTube", url: ajustes.redes.youtube },
    { nombre: "LinkedIn", url: ajustes.redes.linkedin },
  ].filter((r): r is { nombre: string; url: string } => Boolean(r.url));

  return (
    <footer className="px-4 pb-24 pt-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-[var(--jm-borde)] pt-8 text-sm text-[var(--jm-suave)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-extrabold text-[var(--jm-texto)]">{ajustes.nombre}</span> · {ajustes.lema}
          {ajustes.ubicacion ? ` · ${ajustes.ubicacion}` : ""}
        </p>
        {redes.length > 0 && (
          <div className="flex gap-5">
            {redes.map((r) => (
              <a key={r.nombre} href={r.url} target="_blank" rel="noreferrer" className="hover:text-[var(--jm-texto)]">
                {r.nombre}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
