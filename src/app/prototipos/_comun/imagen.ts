/**
 * URL de una imagen redimensionada por el optimizador de Next (ver images en next.config.ts) al ancho que
 * se muestra, en WebP/AVIF. Las URL que no son externas se devuelven tal cual.
 * Anchos válidos: los de Next por defecto (256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840).
 */
export function img(url: string, ancho: 256 | 384 | 640 | 750 | 828 | 1080 | 1200 | 1920 | 2048 | 3840 = 1200, calidad = 75) {
  if (!url.startsWith("http")) return url;
  return `/_next/image?url=${encodeURIComponent(url)}&w=${ancho}&q=${calidad}`;
}
