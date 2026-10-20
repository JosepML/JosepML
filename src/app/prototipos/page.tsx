import Link from "next/link";

const VARIANTES = [
  {
    letra: "a",
    nombre: "Sala",
    paleta: ["#0d0b09", "#efe8dd", "#d9a35b"],
    resumen: "Negro cálido y tungsteno, como una sala de cine antes de empezar.",
    detalles: [
      "Tipos: Cormorant Garamond + Inter",
      "Apertura: rótulo de crédito y bandas que se abren a 2.39:1",
      "Portada: reel en panorámico, titular en capas que se separan con el scroll",
      "Trabajos: tarjetas grandes con clip mudo al pasar el ratón y cursor visor",
      "Transición: la imagen de la tarjeta crece hasta ser la cabecera de la ficha",
    ],
  },
  {
    letra: "b",
    nombre: "Papel",
    paleta: ["#ece6da", "#1b1712", "#9c3d1c"],
    resumen: "Papel claro y tinta, como un guion o una revista de cine.",
    detalles: [
      "Tipos: Instrument Serif + IBM Plex Mono (créditos como hoja de rodaje)",
      "Apertura: claqueta que se cierra y sube como un telón",
      "Portada: titular gigante palabra a palabra; la ventana del reel se abre con el scroll",
      "Trabajos: índice de títulos; el clip flota junto al ratón",
      "Transición: cortinilla de tinta con el título del proyecto. Incluye antes/después del color",
    ],
  },
  {
    letra: "c",
    nombre: "Contraste",
    paleta: ["#000000", "#ffffff", "#ff2a1f"],
    resumen: "Blanco y negro con rojo, como una sala de montaje o un visor de cámara.",
    detalles: [
      "Tipos: Anton + JetBrains Mono + Inter",
      "Apertura: cola de película 3, 2, 1 y fotograma en blanco",
      "Portada: reel en blanco y negro con datos de visor y código de tiempo",
      "Trabajos: bandas a todo el ancho que pasan a color y se mueven al pasar el ratón",
      "Transición: corte seco a negro con código de tiempo",
    ],
  },
];

export default function IndicePrototipos() {
  return (
    <main className="min-h-svh px-6 py-16 sm:px-12">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Fase 3 · Dirección visual</p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl">Tres portadas para elegir</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Las tres usan el mismo contenido real (reel provisional y tres proyectos) para que solo cambie la forma. Pulsa en
        cualquier proyecto para ver la transición y la ficha. La apertura sale solo la primera vez; con el botón
        &quot;Ver apertura&quot; de la barra inferior la repites.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {VARIANTES.map((v) => (
          <Link
            key={v.letra}
            href={`/prototipos/${v.letra}`}
            className="group flex flex-col border border-white/10 p-6 transition-colors hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-4xl">
                {v.letra.toUpperCase()} · {v.nombre}
              </span>
              <span className="flex gap-1">
                {v.paleta.map((c) => (
                  <span key={c} className="h-5 w-5 rounded-full border border-white/20" style={{ background: c }} />
                ))}
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground/85">{v.resumen}</p>
            <ul className="mt-4 flex flex-col gap-1.5 text-xs leading-relaxed text-muted">
              {v.detalles.map((d) => (
                <li key={d}>· {d}</li>
              ))}
            </ul>
            <span className="mt-6 text-xs uppercase tracking-[0.25em] text-accent">Ver prototipo →</span>
          </Link>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted">
        Los vídeos de los prototipos vienen de YouTube. En la web final, el reel y los clips de las tarjetas serán
        archivos propios cortos (sin marca de YouTube y mucho más rápidos).
      </p>
    </main>
  );
}
