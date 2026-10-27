import type { NextConfig } from "next";

// Imitación local de Supabase (scripts/supabase-local, solo para probar en el contenedor de Claude)
const local = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http://localhost");

const nextConfig: NextConfig = {
  // Las imágenes viven en el bucket `medios` de Supabase; mientras dura la migración (tarea S2), algunas
  // siguen en servidores externos (medios.url_origen).
  // El optimizador de Next las sirve al tamaño que se muestran y en WebP/AVIF: los originales son PNG
  // enormes que la GPU tardaba 20-40 ms en rasterizar al entrar en pantalla.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "oadmqwtnxpbotxcgzaoo.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i9.ytimg.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.edigitalagency.com.au" },
      { protocol: "https", hostname: "iili.io" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "www.platinocrowdfunding.com" },
      { protocol: "https", hostname: "rbgescuela.com" },
      ...(local ? [{ protocol: "http" as const, hostname: "localhost", port: "54321" }] : []),
    ],
  },
  // Redirecciones permanentes de rutas antiguas sin # (por si algún enlace externo quitó el # o viene de /JosepML)
  async redirects() {
    return [
      { source: "/portfolio", destination: "/trabajos", permanent: true },
      { source: "/project/:id", destination: "/trabajos/:id", permanent: true },
      { source: "/recreations", destination: "/recreaciones", permanent: true },
      { source: "/about", destination: "/sobre-mi", permanent: true },
      { source: "/contact", destination: "/contacto", permanent: true },
      { source: "/thanks", destination: "/gracias", permanent: true },
      { source: "/privacy", destination: "/privacidad", permanent: true },
      { source: "/JosepML", destination: "/", permanent: true },
      { source: "/JosepML/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
