# Fase 3: Dirección visual

**Estado:** En revisión: prototipo D · Cristal en `/prototipos/d`, falta el visto bueno de Josep
**Depende de:** fase 1. Puede ir en paralelo con las fases 2 y 4.

## Objetivo

Elegir el estilo visual y de animación de la web con prototipos de portada que Josep vea en `localhost`.

## Dirección actual: D · Cristal

La web antigua (Inter muy gruesa, rojo de marca, cristal, esquinas redondas, modo claro/oscuro) llevada a un acabado tipo página de producto de Apple: dinámica, cinematográfica, cálida y personal, con más peso de venta de servicios. Sustituye a A, B y C, que Josep descartó (ver *Registro*).

| Token | Oscuro | Claro |
| --- | --- | --- |
| Fondo | `#09090b` | `#f5f5f7` |
| Texto | `#f5f5f7` | `#1d1d1f` |
| Acento (rojo de la web antigua) | `#e50914` | `#e50914` |
| Acento cálido (degradados) | `#ff8a3d` | `#ff8a3d` |
| Cristal | blanco 6 % + desenfoque 28 px + saturación 170 % + borde blanco 12 % + reflejo arriba | blanco 55 % + borde blanco 90 % |
| Orbes de fondo | rojo 32 %, naranja 22 %, violeta 14 % | a la mitad |

- **Tipos:** Inter (800-900, interletraje muy cerrado) para todo; Instrument Serif cursiva solo para la palabra de acento de cada titular.
- **Formas:** píldoras (`rounded-full`) para botones y chips; tarjetas de 28 a 48 px de radio.
- **Curva de animación:** `cubic-bezier(0.22, 1, 0.36, 1)`, entre 0,5 y 0,9 s.
- Código: `src/app/prototipos/d/` (tokens en `cristal.css`). Se pasarán a `globals.css` cuando Josep dé el visto bueno.

## Animaciones (D · Cristal)

| Dónde | Animación |
| --- | --- |
| Portada | El reel vive en una tarjeta redondeada que se aleja con el scroll (escala y radio); el titular entra palabra a palabra con desenfoque; palabra que rota (director de fotografía / filmmaker / editor) |
| Servicios | Tarjetas que se abren al pasar el ratón: la elegida crece, arranca su clip y enseña lo que aporto, para quién es y "Hablemos de tu proyecto" |
| Trabajos | Galería horizontal fijada (el scroll vertical la mueve de lado) con filtro por servicio; clip al pasar el ratón; en móvil, carrusel con el dedo |
| Cambio de página | La imagen de la tarjeta crece con sus esquinas redondas hasta ser la cabecera de la ficha, con el fondo desenfocado |
| Cifras | Números que cuentan al entrar y premios con laurel |
| Proceso | Título fijo con el número del paso; el paso activo se ilumina con el scroll |
| Sobre mí | Retrato que se inclina con el ratón y se desplaza con el scroll |
| Opiniones y clientes | Marquesinas de tarjetas de cristal (se paran al pasar el ratón) |
| Siempre | Foco de luz que sigue al ratón en las tarjetas; orbes de color que se mueven despacio; menú de cristal que se compacta y se esconde al bajar |

Límites: con "reducir movimiento" todo pasa a fundidos simples (sin vídeo, sin fijados, sin marquesinas); en móvil se simplifica.

## Tareas

- [x] Crear 2 o 3 variantes de portada en rutas de prueba con contenido real
- [x] Variar entre ellas: paleta, tipografía y estilo de animación
- [x] Incluir en cada una: apertura, cabecera con vídeo, tarjetas con clip al pasar el ratón, una transición de página
- [x] Comprobar "reducir movimiento" y móvil
- [x] Josep descarta A, B y C → nueva dirección D · Cristal (portada a partir de bloques editables, modo edición de demostración)
- [x] Borrar los prototipos descartados (A, B y C)
- [ ] Josep da el visto bueno a D (o pide cambios); fijar los tokens definitivos en `globals.css`

## Entregable

Prototipo en `localhost:3000/prototipos/d` y, tras el visto bueno, el sistema de diseño fijado.

## Revisión de Josep

- [ ] Da el visto bueno a la dirección visual

## Registro

### 2026-10-20 · Prototipos A, B y C (descartados)

Tres portadas con su ficha: **A · Sala** (negro cálido y tungsteno, Cormorant Garamond), **B · Papel** (papel claro y tinta, Instrument Serif + IBM Plex Mono) y **C · Contraste** (blanco, negro y rojo, Anton). Código borrado; queda en el historial de git (commit `a2d59fa`).

**Por qué no:** a Josep no le gustó ninguna. Se alejaban demasiado de su web anterior; las vio muy estáticas, poco modernas y con aire de plantilla de portfolio. Quiere seguir con la estética tipo Apple (cristal, formas redondeadas) y llevar su idea original al máximo: más profesional, más mezcla de portfolio y venta de sus servicios audiovisuales, cinematográfica, bonita y elegante, pero cálida y personal, no empresarial. Y que todo salga de una base de datos que pueda editar (crear artículos, secciones...): una página viva.

**Descubrimiento importante:** el PC de Josep tiene desactivados los "Efectos de animación" de Windows (Configuración › Accesibilidad › Efectos visuales). Los navegadores lo traducen en "reducir movimiento", así que A, B y C se le mostraban casi sin animaciones. Desde ahora los prototipos muestran las animaciones aunque Windows las tenga desactivadas (`useReducir` en `_comun/hooks.ts`), con un interruptor en la barra inferior ("Animaciones: sí / según Windows"). En la web final se respetará siempre el ajuste del visitante.

### 2026-10-20 · Prototipo D · Cristal

**Hecho**

- `/prototipos/d`: portada completa y ficha de proyecto (`/prototipos/d/<slug>`) con 6 proyectos reales (*Y el año que viene, ¿qué?*, *100 Baladas*, *El Cirujano*, *Lovva*, *EP Oscuridad*, *Kiboko*), los 3 servicios, cifras y premios, proceso, sobre mí, opiniones, clientes, blog y llamada final. Modo claro/oscuro.
- **Portada hecha de bloques** con la forma de la futura tabla `bloques` (`pagina`, `orden`, `tipo`, `visible`, `datos`): `src/app/prototipos/d/datos.ts`. Cada tipo de bloque es un componente (`PortadaD.tsx`). Tipos: portada, servicios, trabajos, cifras, proceso, sobre-mi, opiniones, clientes, blog, texto (sección libre), llamada.
- **Modo edición de demostración** (botón "Editar página"): arrastrar para reordenar secciones, ocultarlas, cambiar sus textos, crear secciones nuevas de cualquier tipo, borrar y restablecer. Los cambios se guardan solo en el navegador; en la fase 6 será el panel real contra Supabase.
- Venta sin precios: servicios con "Lo que aporto", "Ideal para" y "Hablemos de tu proyecto"; llamada final con chips "¿Qué tienes en mente?" que rellenan el asunto del correo y el mensaje de WhatsApp; chip "Disponible para nuevos proyectos"; en cada ficha, "¿Quieres algo así para tu proyecto?".
- Ficha: cabecera redondeada con clip, ficha técnica de cristal, frase, fotogramas con visor ampliado, antes/después del color (LOG simulado), siguiente proyecto con la misma transición.
- Comprobado en el navegador a 1024×768 y 375×812, en claro y oscuro, con y sin "reducir movimiento", sin errores de consola. `npm run lint`, `npx tsc --noEmit` y `npm run build` pasan.

**Decisiones técnicas para las fases 4, 5 y 6**

- Tabla `bloques` (o `secciones`): `id`, `pagina`, `orden`, `tipo`, `visible`, `datos jsonb`. El panel ofrece un catálogo de tipos (`CATALOGO` en `datos.ts`); un tipo nuevo en el futuro = un componente nuevo.
- Reel y clips: archivos propios cortos (mp4/webm, sin sonido, 3-5 s) más póster, no YouTube (`clip_url` en `proyectos`). Cada servicio también necesita imagen y clip.
- Imágenes con `<img>` en los prototipos; en la fase 5, `next/image` con el almacenamiento de Supabase.

**Queda**

- Visto bueno de Josep a D o lista de cambios. Después: pasar los tokens a `globals.css` y la tipografía a `layout.tsx`.
- Datos pendientes ("Pendiente" en las fichas): año de *El Cirujano*, *Lovva*, *100 Baladas*, *EP Oscuridad* y *Kiboko*; productora de *Lovva*, *EP Oscuridad* y *Kiboko*; dirección de *Kiboko*; cámara de todos.
