# Fase 3: Dirección visual

**Estado:** Pendiente
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

- [ ] Crear 2 o 3 variantes de portada en rutas de prueba (`/prototipos/a`, `/prototipos/b`, `/prototipos/c`) con contenido real de 3 proyectos (de `legacy/constants.ts`)
- [ ] Variar entre ellas: paleta (cálida oscura / papel claro / contraste alto), tipografía y estilo de animación
- [ ] Incluir en cada una: apertura, cabecera con vídeo, tarjetas con clip al pasar el ratón, una transición de página
- [ ] Comprobar "reducir movimiento" y móvil
- [ ] Josep elige una o pide mezcla; fijar los tokens de diseño definitivos (colores, tipos, espaciados, curvas de animación) en `globals.css` y documentarlos aquí
- [ ] Borrar los prototipos descartados

## Entregable

Prototipos en `localhost:3000/prototipos/...` y, tras la elección, el sistema de diseño fijado.

## Revisión de Josep

- [ ] Elige dirección visual

## Registro

(vacío)
