"use client";

import { useEffect, useState } from "react";

type Props = {
  id: string;
  inicio?: number;
  activo: boolean;
  /** Espera tras cargar antes de mostrarse, para ocultar el rótulo inicial de YouTube */
  retraso?: number;
};

/**
 * Vídeo de YouTube mudo, en bucle y sin controles, que cubre su contenedor.
 * Solo para los prototipos: en la web final irán clips propios (mp4/webm) más ligeros.
 */
export function VideoYouTube({ id, inicio = 0, activo, retraso = 900 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!activo) setVisible(false);
  }, [activo]);

  if (!activo) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    loop: "1",
    playlist: id,
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    disablekb: "1",
    iv_load_policy: "3",
    start: String(inicio),
  });

  return (
    <div className="yt-marco" aria-hidden>
      <iframe
        className="yt-cubrir transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
        src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        title=""
        onLoad={() => window.setTimeout(() => setVisible(true), retraso)}
      />
    </div>
  );
}
