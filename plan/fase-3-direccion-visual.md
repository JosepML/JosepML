# Fase 3: Dirección visual

**Estado:** En revisión: prototipos listos en `/prototipos`, falta que Josep elija
**Depende de:** fase 1. Puede ir en paralelo con las fases 2 y 4.

## Objetivo

Elegir el estilo visual y de animación de la web con 2 o 3 prototipos de portada que Josep vea en `localhost`.

## Punto de partida

- Fondo negro cálido `#0d0b09`, texto `#efe8dd`, acento tungsteno `#d9a35b` (en `src/app/globals.css`)
- Tipografías: Cormorant Garamond (títulos) e Inter (texto), en `src/app/layout.tsx`
- Formato panorámico 2.39:1, grano de película sutil, viñeteado suave

## Animaciones previstas

| Dónde | Animación |
| --- | --- |
| Entrada | Apertura en negro con el título como rótulo de crédito (< 1,5 s, solo primera visita) |
| Portada | Reel en bucle de fondo, texto entrando en capas con el scroll |
| Scroll | Secciones con fundido y leve desplazamiento |
| Tarjetas de proyecto | Clip mudo de 3 a 5 s al pasar el ratón |
| Cambio de página | Corte o fundido a negro; la imagen de la tarjeta crece hasta ser la cabecera |
| Recreaciones | Deslizador antes/después |
| Proceso de trabajo | Línea de pasos que se dibuja con el scroll |
| Cursor y botones | Cursor tipo visor sobre vídeos, micro-respuestas en botones |

Límites: ninguna animación bloquea ni dura más de 1 s salvo la apertura; con "reducir movimiento" todo pasa a fundidos simples; en móvil se simplifican; portada visible en menos de 2,5 s en móvil.

## Tareas

- [x] Crear 2 o 3 variantes de portada en rutas de prueba (`/prototipos/a`, `/prototipos/b`, `/prototipos/c`) con contenido real de 3 proyectos (de `legacy/constants.ts`)
- [x] Variar entre ellas: paleta (cálida oscura / papel claro / contraste alto), tipografía y estilo de animación
- [x] Incluir en cada una: apertura, cabecera con vídeo, tarjetas con clip al pasar el ratón, una transición de página
- [x] Comprobar "reducir movimiento" y móvil
- [ ] Josep elige una o pide mezcla; fijar los tokens de diseño definitivos (colores, tipos, espaciados, curvas de animación) en `globals.css` y documentarlos aquí
- [ ] Borrar los prototipos descartados

## Entregable

Prototipos en `localhost:3000/prototipos/...` y, tras la elección, el sistema de diseño fijado.

## Revisión de Josep

- [ ] Elige dirección visual

## Registro

### 2026-10-20 · Prototipos

**Hecho**

- Índice en `/prototipos` y tres portadas con su ficha de proyecto (`/prototipos/{a,b,c}` y `/prototipos/{a,b,c}/<slug>`), con contenido real de *Y el año que viene, ¿qué?*, *El Cirujano* y *No se está tan mal, Lovva* (datos en `src/app/prototipos/_comun/datos.ts`).
  - **A · Sala** (cálida oscura): Cormorant Garamond + Inter, negro `#0d0b09`, crema `#efe8dd`, tungsteno `#d9a35b`, grano y viñeta. Apertura con rótulo de crédito y bandas que se abren a 2.39:1; titular en capas que se separan con el scroll; tarjetas con clip mudo y cursor visor; la imagen de la tarjeta crece hasta la cabecera de la ficha; línea de proceso que se dibuja.
  - **B · Papel** (papel claro): Instrument Serif + IBM Plex Mono, papel `#ece6da`, tinta `#1b1712`, óxido `#9c3d1c`. Apertura con claqueta; titular palabra a palabra; la ventana del reel se abre al hacer scroll; índice de títulos con el clip flotando junto al ratón; cortinilla de tinta con el título; ficha técnica como hoja de rodaje; deslizador antes/después del color (LOG simulado).
  - **C · Contraste** (contraste alto): Anton + JetBrains Mono + Inter, negro, blanco y rojo `#ff2a1f`. Apertura con cola de película 3-2-1; reel en blanco y negro con datos de visor y código de tiempo; marquesina de premios; bandas a todo el ancho que pasan a color con el clip; corte seco con código de tiempo.
- Piezas comunes en `src/app/prototipos/_comun/`: reel de fondo (fotograma primero; vídeo solo en pantallas anchas y sin "reducir movimiento"), clip al pasar el ratón (espera 350 ms, solo con ratón), transiciones de página, cursor visor, antes/después, scroll suave con Lenis (solo con ratón).
- Apertura solo en la primera visita de la sesión (`sessionStorage`); `?apertura` la fuerza. Barra flotante para cambiar de prototipo y repetir la apertura (solo en prototipos).
- "Reducir movimiento": sin apertura animada, sin vídeo de fondo ni clips, sin capas ni scroll suave; las transiciones pasan a un fundido a negro de 0,3 s. Móvil: sin bandas panorámicas, sin clips al pasar el ratón, el fotograma va dentro de cada fila.
- Comprobado con capturas en 1440×900, 390×844 y con "reducir movimiento" (sin errores de consola), y la navegación tarjeta → ficha en las tres. `npm run lint`, `npx tsc --noEmit` y `npm run build` pasan.

**Decisiones técnicas para la fase 5**

- Los prototipos usan YouTube para el reel y los clips. En la web final deben ser **clips propios cortos** (mp4/webm de 3 a 5 s, sin sonido, ~1-2 MB) más un fotograma de póster: YouTube enseña su marca al arrancar, pesa mucho y no deja un bucle limpio. La tabla `proyectos` necesita un campo `clip_url` (fase 4).
- Las imágenes externas se pintan con `<img>` (regla de ESLint desactivada solo en `src/app/prototipos/`); en la fase 5 se pasa a `next/image` con el almacenamiento de Supabase.

**Queda**

- Josep elige una dirección o pide mezcla. Después: fijar tokens definitivos en `globals.css`, documentarlos aquí y borrar los prototipos descartados.
- Datos pendientes que salen como "Pendiente" en las fichas: año de *El Cirujano* y *Lovva*, productora de *Lovva*, cámara de los tres.

