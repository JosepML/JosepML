import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las imágenes de los proyectos aún viven en servidores externos (en la fase 4 pasan a Supabase).
  // El optimizador de Next las sirve al tamaño que se muestran y en WebP/AVIF: los originales son PNG
  // enormes que la GPU tardaba 20-40 ms en rasterizar al entrar en pantalla.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "iili.io" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "www.platinocrowdfunding.com" },
      { protocol: "https", hostname: "rbgescuela.com" },
    ],
  },
};

export default nextConfig;
