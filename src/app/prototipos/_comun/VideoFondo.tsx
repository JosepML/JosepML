"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePantallaAncha, useReducir } from "./hooks";
import { VideoYouTube } from "./VideoYouTube";

type Props = {
  id: string;
  inicio?: number;
  poster: string;
  className?: string;
  /** Filtro CSS para el póster y el vídeo (p. ej. blanco y negro) */
  filtro?: string;
};

/**
 * Reel de fondo. Primero se pinta el fotograma (carga rápida en móvil);
 * en pantallas anchas y sin "reducir movimiento" entra el vídeo encima.
 * Fuera de pantalla el vídeo se desmonta para no seguir decodificando.
 */
export function VideoFondo({ id, inicio, poster, className = "", filtro }: Props) {
  const ancha = usePantallaAncha();
  const reducir = useReducir();
  const caja = useRef<HTMLDivElement>(null);
  const visible = useInView(caja, { margin: "100px" });
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setListo(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  const video = listo && ancha && !reducir && visible;

  return (
    <div ref={caja} className={`absolute inset-0 overflow-hidden bg-black ${className}`} style={{ filter: filtro }}>
      <img
        src={poster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${reducir || video ? "" : "animate-[kenburns_24s_ease-in-out_infinite_alternate]"}`}
        fetchPriority="high"
      />
      <VideoYouTube id={id} inicio={inicio} activo={video} />
    </div>
  );
}
