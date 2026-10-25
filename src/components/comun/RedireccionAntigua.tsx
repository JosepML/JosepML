"use client";

import { useEffect } from "react";

// La web antigua usaba rutas con # (`/#/project/<id>`). El servidor no ve el # y entrega la portada,
// así que se traducen aquí al cargar. Los slugs de proyecto coinciden con los ids antiguos; si alguno
// cambia, se resolverá con `id_antiguo` (tarea S13).
const RUTAS: Record<string, string> = { "/portfolio": "/trabajos", "/blog": "/blog" };

export function RedireccionAntigua() {
  useEffect(() => {
    const m = window.location.hash.match(/^#(\/[^?#]*)/);
    if (!m) return;
    const ruta = m[1].replace(/\/+$/, "") || "/";
    const proyecto = ruta.match(/^\/project\/([^/]+)$/);
    const destino = proyecto ? `/trabajos/${proyecto[1]}` : RUTAS[ruta];
    if (destino) window.location.replace(destino);
  }, []);
  return null;
}
