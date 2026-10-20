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

### 2026-10-20 · D: visto bueno al camino y pasada de rendimiento

Josep: "me parece muy buen camino", pero "va MUY petada" (pesada, con tirones).

**Cambios**

- **Cristal sin `backdrop-filter`** en las tarjetas (`.cristal`): base translúcida + brillo en diagonal + borde y reflejo. El desenfoque real queda solo en `.cristal-fuerte` (menú, editor, botón de editar). Antes había decenas de capas desenfocando lo que tenían detrás, algunas moviéndose (marquesinas de opiniones, galería horizontal, tarjetas de servicios que cambian de ancho).
- **Orbes del fondo** con degradados radiales en vez de `filter: blur(90px)` animado.
- Sin desenfoque en los elementos que se mueven: barra de datos y chips de las tarjetas de trabajos, chips del retrato, iconos de servicios. Círculos de luz decorativos (llamada, premios, ficha) con degradado radial en vez de `blur-3xl`/`blur-[100px]`.
- Animaciones de entrada (`Revelar`, ficha) y palabra que rota sin `filter: blur`: solo opacidad y desplazamiento. El desenfoque de entrada queda solo en el titular de la portada, una vez.
- Transición de página: velo oscuro con opacidad en vez de animar un desenfoque a pantalla completa.
- El reel (y el clip de la cabecera de la ficha) se desmonta al salir de pantalla; antes seguía reproduciéndose el iframe de YouTube.
- Foco de luz del ratón: como mucho una actualización por fotograma.
- Servicios: la tarjeta se abre si el ratón se queda 160 ms, no al cruzarla.
- Josep revisa ahora con la **versión de producción** (`npm run build` + `npm run start`), no con el modo de desarrollo, que es mucho más lento. Tras cada cambio hay que volver a compilar.

**Medición** (Chrome en el PC de Josep, RTX 5070 a 165 Hz, pantalla 2048×1152): recorriendo la página fotograma a fotograma, el hilo principal va holgado antes y después (p95 de 6 ms por fotograma; en móvil simulado con CPU ×4, p95 de 18 ms). Lo que se ha quitado es trabajo de composición en la GPU, que esa medida no recoge; hay que confirmarlo con Josep mirando la web.

### 2026-10-20 · D: segunda ronda de cambios de Josep

Josep: "es una buena base, pero sigue faltando mucho trabajo". Lo que pidió y lo que se hizo:

- **Tipografía (lo más importante):** Inter no se estaba aplicando. `cristal.css` y `globals.css` apuntaban a `var(--font-sans)`, que con `@theme inline` de Tailwind no existe como variable CSS, y la web salía con la fuente del sistema (Segoe UI en Windows). Ahora usan `var(--font-sans-face)`. Inter en todo; la única cursiva es la palabra de acento de los titulares (Instrument Serif). Fuera la serif de la palabra que rota, la cita de Sobre mí, las frases de servicio, las obras premiadas y las comillas de las opiniones.
- **Textos cortados:** los titulares iban con degradado recortado al texto e interlineado de 0,95-0,98, y se comían tildes, "¿" y letras con rabito. Ahora van en color sólido con interlineado 1,02-1,08 y `text-wrap: balance`; la palabra de acento lleva relleno para que la cursiva no se corte, y los signos de cierre quedan fuera de la cursiva.
- **Controles de YouTube al entrar:** el vídeo solo se deja ver cuando YouTube avisa de que se está reproduciendo (API por `postMessage`), y se oculta si se para o termina el bucle. Debajo siempre está el póster. El reel se recorta más (`escala` 1,45) porque el provisional tiene bandas negras con subtítulos.
- **Scroll de la portada:** zona fijada de 200svh a 135svh; solo escala (de 1 a 0,9) y fundido del texto; indicador "Desliza" con una línea por la que baja una luz. Fuera Lenis: scroll nativo (`scroll-behavior: smooth` solo para los enlaces internos).
- **Rendimiento:** el radio de la tarjeta del reel ya no se anima (obligaba a repintar el vídeo en cada fotograma). Los clips de YouTube al pasar el ratón (servicios y trabajos) se sustituyen por un fundido entre fotogramas con zoom lento: cada clip cargaba un reproductor de YouTube entero. Solo queda un iframe vivo (el reel) y se desmonta fuera de pantalla.
- **Palabra que rota** ("Soy director de fotografía / filmmaker / editor"): fundido cruzado lento (1,1 s, cada 3,4 s) con un leve desplazamiento y desenfoque, en Inter, sin que la línea cambie de ancho.
- **Servicios:** sin texto vertical ni cambios de tamaño de letra al abrir; la tarjeta se ensancha en 0,9 s y el detalle entra después, con un ancho mínimo fijo para que no se recoloque. Botón "Ver proyectos y detalles".
- **Página de cada servicio** (`/prototipos/d/servicios/<slug>`): cabecera con fotogramas, mi mirada, lo que aporto, con quién trabajo, sus proyectos, cómo trabajamos, preguntas frecuentes, llamada con el servicio ya marcado y enlaces a los otros servicios. Textos de `plan/contenido/servicio-*.md`.
- **Selección:** ya no va ligada al scroll vertical. Carrusel con flechas de cristal, arrastre con el ratón y ajuste a cada tarjeta. Cada filtro tiene su propia selección y orden (`SELECCION` en `datos.ts`, de "Destacados por servicio"), con transición al cambiar. Se añaden los demás proyectos (EXPÁNDE(TE), Sin Tiempo, El Viajero, Sin Piedad, Conciertos, Eventos deportivos, Reels, Bodas).
- **En números:** "+7 años" (no 15), 1,39 M, los dos premios y dos tarjetas de los canales de YouTube ("Del Fan, Para el Fan" y "Josep Mira"). Fuera "18 proyectos". "Más de quince años" pasa a "más de siete años" en la portada, Sobre mí, `inicio.md` y `sobre-mi.md`.
- **Cómo trabajamos:** el paso activo sale del avance del scroll por la columna de pasos (antes cada tarjeta detectaba si estaba a la vista y, con dos a medias, parpadeaba); el número cambia con un fundido sin esperas. En móvil, lista normal.
- Los bloques guardados en el navegador usan otra clave (`proto-d-bloques-v2`) para que los textos nuevos no queden tapados por los antiguos.

**Dudas**

- Cifras de suscriptores y enlace de "Del Fan, Para el Fan": pendientes de Josep (no se inventan).
- Los textos dicen "más de ocho años en YouTube" (inicio, Sobre mí) y "más de nueve años creando contenido" (FAQ de Filmmaker), que no cuadran del todo con "más de 7 años". Pendiente de que Josep diga qué cifra usar en cada sitio.

**Queda**

- Que Josep lo revise (versión de producción en `localhost:3000/prototipos/d`). Después: pasar los tokens a `globals.css` y la tipografía a `layout.tsx`.
- Datos pendientes ("Pendiente" en las fichas): año de *El Cirujano*, *Lovva*, *100 Baladas*, *EP Oscuridad* y *Kiboko*; productora de *Lovva*, *EP Oscuridad* y *Kiboko*; dirección de *Kiboko*; cámara de todos.
