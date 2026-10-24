// Direcciones de la web pública, en un solo sitio. Si cambia una ruta, se cambia aquí.
export const RUTAS = {
  inicio: "/",
  trabajos: "/trabajos",
  proyecto: (slug: string) => `/trabajos/${slug}`,
  servicio: (slug: string) => `/servicios/${slug}`,
  recreaciones: "/recreaciones",
  sobreMi: "/sobre-mi",
  blog: "/blog",
  articulo: (slug: string) => `/blog/${slug}`,
  contacto: "/contacto",
  gracias: "/gracias",
} as const;
