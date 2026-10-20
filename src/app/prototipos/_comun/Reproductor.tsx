"use client";

import { useState } from "react";

/** Vídeo completo con sonido: se carga al pulsar, para que la ficha abra rápido. */
export function Reproductor({ id, poster, titulo, className = "" }: { id: string; poster: string; titulo: string; className?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className={`relative aspect-video overflow-hidden bg-black ${className}`}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={titulo}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" data-visor="Play">
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 text-white backdrop-blur transition-transform group-hover:scale-110">
            <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-current" />
          </span>
          <span className="sr-only">Ver {titulo}</span>
        </button>
      )}
    </div>
  );
}
