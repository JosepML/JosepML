# Fase 4: Base de datos y migración

**Estado:** Pendiente
**Depende de:** fase 1. Puede ir en paralelo con las fases 2 y 3 (los textos nuevos de la fase 2 se cargan cuando estén).

## Objetivo

Crear todas las tablas en Supabase y pasar automáticamente todo el contenido actual a ellas, sin perder nada.

## Modelo de datos

| Tabla | Guarda |
| --- | --- |
| servicios | nombre, slug, frase, descripción, qué incluye, pasos, preguntas frecuentes, cabecera, orden (sin precio: ver `00-contexto.md`) |
| proyectos | título, slug, cliente, año, servicios y tipos, rol, contexto, proceso, retos, resultados, títulos de sección propios, vídeos (YouTube/Instagram/HTML), vídeo de proceso, clip de tarjeta, galería, destacado, publicado, orden, id antiguo |
| articulos | título, slug, fecha, extracto, contenido, categoría, publicado, SEO |
| paginas y secciones | páginas libres con bloques ordenables (texto, imagen, vídeo, galería, proyectos, CTA) |
| opiniones | cliente, texto, proyecto relacionado, publicado |
| ajustes | ya existe: clave/valor (portada, menú, redes, contacto, SEO por defecto) |
| mensajes | peticiones del formulario de contacto |
| medios | biblioteca de archivos con texto alternativo |

Seguridad: RLS en todas las tablas. Lectura pública solo de lo publicado; escritura solo para el usuario administrador (Josep). `mensajes`: inserción pública, lectura solo admin.

## Tareas

- [ ] Diseñar el esquema SQL (preparado para varios idiomas) y aplicarlo como migraciones con las herramientas de Supabase; guardar el SQL también en `supabase/migrations/`
- [ ] Crear el bucket de Storage `medios` (lectura pública)
- [ ] Script `scripts/migrar-legacy.ts` que lee `legacy/constants.ts` y carga proyectos y artículos conservando el `id` antiguo (para las redirecciones)
- [ ] Copiar las ~90 imágenes de ImgBB e Imgur al bucket y reescribir las URLs (ejecutar en el PC de Josep si el contenedor no puede descargarlas)
- [ ] Cargar los textos fijos de `legacy/pages/*` y, si ya existen, los de `plan/contenido/`
- [ ] Revisar avisos de seguridad de Supabase (advisors) y corregirlos
- [ ] Generar los tipos de TypeScript de la base de datos en `src/lib/supabase/tipos.ts`
- [ ] Informe de migración en este archivo: recuento (21/21 proyectos, 3/3 artículos, imágenes copiadas) y datos que falten

## Entregable

Base de datos completa con todo el contenido y el informe de recuento.

## Revisión de Josep

- [ ] Confirma que no falta nada

## Registro

(vacío)
