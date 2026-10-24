"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { usePantallaAncha, useReducir, useVideoAbierto } from "./hooks";
import { VideoYouTube } from "./VideoYouTube";
import { img } from "./imagen";

type Props = {
  /** Vídeo propio (mp4 o webm del bucket `medios`): es lo preferido. Si no hay, YouTube; sin ninguno, el póster */
  archivo?: string | null;
  youtubeId?: string | null;
  inicio?: number;
  poster?: string | null;
  className?: string;
  /** Filtro CSS para el póster y el vídeo (p. ej. blanco y negro) */
  filtro?: string;
  /** Zoom extra del vídeo de YouTube, para recortar bandas negras del original */
  escala?: number;
};

/**
 * Vídeo de fondo. Primero se pinta el póster (carga rápida en móvil); en pantallas anchas entra el vídeo
 * encima. Fuera de pantalla, o con el vídeo grande abierto, el vídeo se pausa (no se desmonta: rehacer el iframe daba tirones).
 * Con "reducir movimiento" el vídeo sigue (es la imagen de la web), pero el póster no hace zoom.
 */
export function VideoFondo({ archivo, youtubeId, inicio, poster, className = "", filtro, escala }: Props) {
  const ancha = usePantallaAncha();
  const reducir = useReducir();
  const caja = useRef<HTMLDivElement>(null);
  const propio = useRef<HTMLVideoElement>(null);
  const enPantalla = useInView(caja, { margin: "100px" });
  // Con el vídeo grande abierto encima, el de fondo se pausa como si estuviera fuera de pantalla
  const videoAbierto = useVideoAbierto();
  const visible = enPantalla && !videoAbierto;
  const [listo, setListo] = useState(false);
  const [propioListo, setPropioListo] = useState(false);

  // Crear el reproductor de YouTube bloquea la GPU unos 250 ms, así que solo se crea con el vídeo a la
  // vista y la página quieta un momento: nunca en mitad de un scroll. Una vez creado se queda.
  useEffect(() => {
    if (listo || !visible) return;
    let t = window.setTimeout(() => setListo(true), 700);
    const reiniciar = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setListo(true), 700);
    };
    window.addEventListener("scroll", reiniciar, { passive: true });
    window.addEventListener("wheel", reiniciar, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", reiniciar);
      window.removeEventListener("wheel", reiniciar);
    };
  }, [listo, visible]);

  // El vídeo propio también se pausa fuera de pantalla
  useEffect(() => {
    const v = propio.current;
    if (!v) return;
    if (visible) v.play().catch(() => {});
    else v.pause();
  }, [visible, archivo]);

  const conVideo = listo && ancha;

  return (
    <div ref={caja} className={`absolute inset-0 overflow-hidden bg-black ${className}`} style={{ filter: filtro }}>
      {poster && (
        <img
          src={img(poster, 3840)}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${reducir || conVideo || !visible ? "" : "animate-[kenburns_24s_ease-in-out_infinite_alternate]"}`}
          fetchPriority="high"
        />
      )}
      {archivo ? (
        <video
          ref={propio}
          src={archivo}
          poster={poster ? img(poster, 1920) : undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          onPlaying={() => setPropioListo(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: propioListo ? 1 : 0 }}
        />
      ) : (
        youtubeId && <VideoYouTube id={youtubeId} inicio={inicio} activo={conVideo} escala={escala} pausado={!visible} />
      )}
    </div>
  );
}
