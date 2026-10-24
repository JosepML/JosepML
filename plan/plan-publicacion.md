# Plan hasta la publicación

2026-10-24. Pedido por Josep: qué falta antes de publicar, separando lo que hace Opus de lo que puede hacer Sonnet. Sustituye al orden de `plan/siguientes-pasos.md` (sus detalles siguen valiendo). Cada bloque es un hilo propio.

## Dónde estamos

Hecho: diseño, base de datos, todas las páginas públicas (Inicio, Trabajos y fichas, Servicios con sus especialidades, Recreaciones, Sobre mí, Blog) y el panel completo (edición en la propia web, proyectos, artículos, servicios, clientes, opiniones, canales, biblioteca con recorte, mensajes y ajustes).

Estado de la base (comprobado hoy): 18 proyectos publicados, 15 sin año; 95 de 101 imágenes siguen en ImgBB o Imgur; tipos de proyecto: Cortometraje, Videoclip, Publicidad, Documental, Eventos, Aftermovies y conciertos, Bodas, Redes sociales y Recreación.

Falta: contacto, legales y cookies, SEO y redirecciones, mover las imágenes a Supabase, copia de seguridad, los proyectos de este año, el repaso final y el lanzamiento.

## 1 · Opus, antes del hilo de proyectos con Sonnet

**O1 · Preparar el terreno para los proyectos nuevos** (un hilo, corto). Que Sonnet solo tenga que rellenar, sin decidir nada:

- Tipos de proyecto: decidir con Josep si hacen falta nuevos (por ejemplo «Eventos corporativos» o «Vídeo corporativo», separado de Publicidad) y en qué página de especialidad sale cada uno (`tipos` del bloque de proyectos de cada especialidad y categorías de `/trabajos`).
- Guía `plan/guia-proyecto-nuevo.md` para Sonnet: qué pide cada campo de la ficha, el criterio de textos ya aprobado (`plan/contenido/proyectos/README.md`: frases cortas, decisiones concretas, sin relleno ni fórmulas de IA, la frase final con acento), cómo elegir 4 a 8 fotogramas, qué tipo y servicios ponerle, cuándo marcar «con JUNO Media» y qué no se inventa nunca (premios, cifras, clientes).
- Comprobar que el panel aguanta lo que va a llegar: vídeos propios (límite de tamaño del bucket), reels de Instagram y Shorts, galerías largas, y que un proyecto nuevo aparece solo en Inicio, Trabajos, su servicio y su especialidad.
- Plantilla de lista para Josep: por cada proyecto, nombre, cliente, año, su papel, cámara, enlaces de vídeo, carpeta de fotos y dos o tres frases de lo que pasó. Con eso Sonnet escribe sin tener que preguntarle cada dato.

**Necesita de Josep:** la lista de proyectos del año (aunque sea en bruto) y las fotos o los enlaces de donde sacarlas.

## 2 · Sonnet: proyectos de este año

**P · Añadir los proyectos nuevos** (hilo con Sonnet, siguiendo O1). Crear cada proyecto desde el panel o con SQL revisado, en tandas de 3 o 4 que Josep aprueba en su vista previa. Al final, revisar que cada especialidad tenga sus proyectos y elegir los destacados de Inicio con Josep.

## 3 · El resto, en paralelo o después

| Id | Qué | Quién | Necesita |
| --- | --- | --- | --- |
| S10 | Contacto guiado y `/gracias`, aviso por correo | Sonnet | Que Josep elija cómo le llega el aviso (servicio de correo) |
| S2 | Copiar las 95 imágenes externas al bucket sin cambiar sus ids | Opus, en el PC de Josep (escribe en la base real) | Visto bueno de Josep antes de escribir |
| S11 | Privacidad, cookies y GA4 solo tras aceptar | Sonnet | Datos legales de Josep (nombre, NIF o no, correo) |
| S12 | SEO: metadatos, Schema.org, sitemap, robots e imagen para redes | Sonnet | Los proyectos nuevos ya cargados |
| S13 | Redirecciones de las direcciones antiguas `/#/project/<id>` | Sonnet | Nada |
| S18 | Copia de seguridad semanal fuera de Supabase | Sonnet | Dónde guardarla (su Google Drive, por ejemplo) |
| S19 | Guía del panel con capturas | Sonnet | Panel cerrado |
| T · Textos pendientes | Frases finales de las 4 recreaciones, ampliar el artículo de la luz, repasar los textos de servicios con los proyectos nuevos | Opus (es la voz de Josep) | Respuestas de Josep (abajo) |

## 4 · Opus, al final

- **S20 · Repaso final:** móvil, teclado, claro y oscuro, escalado de Windows al 150 %, velocidad (Lighthouse), accesibilidad, ningún «pendiente» ni texto de relleno visible, ninguna imagen fuera de Supabase, enlaces rotos. Informe y arreglos.
- **F · Lanzamiento** (`plan/fase-7-lanzamiento.md`), solo con tu orden: dominio, alojamiento, copia de la web antigua en la etiqueta `web-antigua`, fusión con `master`, comprobación en directo y vuelta atrás preparada.

## Lo que depende de Josep

Para no frenar nada, cuanto antes:

1. Ejecutar `supabase/datos/10-especialidades-fotos.sql` (fotos de las especialidades).
2. La lista de proyectos del año, con sus fotos o enlaces.
3. Elegir cómo te llegan los mensajes del formulario (S10).
4. Dominio y alojamiento para el lanzamiento (F).
5. Vídeo de portada en mp4, retrato y fotos de rodaje para «Sobre mí», y los logos que faltan.
6. Datos sueltos: años de los 15 proyectos sin año, cámara de Sin Piedad, festivales de Kiboko, permiso para nombrar a Disney y al CVJ en los reels, enlace de «Del Fan Para el Fan».

## Orden propuesto

1. **O1** (Opus), en cuanto tengas la lista de proyectos.
2. **P** (Sonnet), en tandas. A la vez, S10, S11, S13 y S18 en sus hilos de Sonnet, y S2 con Opus en tu PC.
3. **T** (Opus) y **S12, S19** (Sonnet) cuando estén los proyectos.
4. **S20** (Opus) y, con tu orden, **F**.
