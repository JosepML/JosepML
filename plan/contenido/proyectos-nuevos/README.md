# Proyectos nuevos de este año

2026-10-24. Base preparada con lo que Josep contó por mensaje. **Nada está en la web ni en la base de datos todavía:** faltan vídeos, fotos y datos (ver `cuestionario.md`). Mañana se completan y se cargan, en tandas de 3 o 4 que Josep aprueba en su vista previa.

Formato de las fichas: el mismo de `../proyectos/` (cabecera con los campos de la ficha técnica, `Tarjeta`, `El proyecto`, `Decisiones clave`, `El reto`, `Resultado`). Solo hay texto donde Josep dio datos: no se inventan cifras, premios ni decisiones. Lo que dice `[pendiente]` o `[confirmar]` no se publica.

## Cambios de estructura propuestos (Josep los confirma en G1 y G2)

- **Tipo nuevo `corporativo`** («Corporativo y eventos de empresa»): se añade a los `tipos` de la página de especialidad «Spots y vídeo corporativo» (`filmmaker-spots-y-corporativo`), junto a `publicidad`. Para eventos de empresa y colegios.
- **Tipo nuevo `visuales-e-ia`** («Visuales e IA»): vídeo generado con inteligencia artificial y animaciones para pantallas. Sale en Edición y en el filtro de Trabajos.
- **Conciertos:** cada orquesta, su proyecto. La ficha genérica «Conciertos» (3 piezas y un vídeo del proceso) se oculta o se convierte en «cómo grabo un concierto». La página de especialidad pasa a mostrar el primer proyecto grande y el resto en rejilla.
- **Eventos deportivos:** la ficha existente pasa a ser la de Ocisport (Shimano Super Cup Massi, La Nucía), con el mismo vídeo.
- **Filtros de Trabajos:** categorías nuevas en el bloque de la página `trabajos` (Corporativo, Visuales e IA); lo hace el SQL de carga.
- **Con JUNO Media** (`con_juno`): Albir Confort, El Xato, EP Color, ICE, Grupo LON (lavandería y evento).

## Tabla

| # | Slug | Tipo | Servicios | Estado |
| --- | --- | --- | --- | --- |
| 1 | frimar-evento-fotografia | corporativo (nuevo) | DF (confirmar) | Solo fotos. Base escrita |
| 2 | eventos-deportivos (revisión) | eventos | Filmmaker, Edición | Reescrito como Ocisport |
| 3 | flama-contenido-cinematografico-ia | visuales-e-ia (nuevo) | Edición | Proceso escrito |
| 4 | albir-confort-real-estate | publicidad | Filmmaker, Edición | Un proyecto con varios vídeos (a confirmar) |
| 5 | atavicas-trailer-obra-de-teatro | publicidad | Filmmaker, Edición | Nombre de la obra por confirmar |
| 6 | (contenido para redes, sin ficha) | redes-sociales | | Faltan datos |
| 7 | ep-color-adrian-munoz | videoclip | DF, Filmmaker, Edición | Escrito |
| 8 | redencion | cortometraje | DF | Gaffer. Base escrita |
| 9 | el-xato-evento-boda | publicidad | Filmmaker, Edición | Base escrita |
| 10 | mandalorian-grogu-reel | redes-sociales | Filmmaker, Edición | Permiso de nombrar a Disney |
| 11 | restaurante-evento-publicitario | redes-sociales | Filmmaker, Edición | Falta nombre |
| 12 | lavanderia-grupo-lon | publicidad | Edición | Proyecto grupal |
| 13 | ice-international-school-10-anos | corporativo (nuevo) | Filmmaker, Edición | Base escrita |
| 14 | englobe-evento-redes | redes-sociales | Edición | Faltan datos |
| 15 | cortometraje-alejandro-palacios | cortometraje | DF | Faltan título y compañero |
| 16 | evento-grupo-lon-el-langui | redes-sociales | Filmmaker, Edición | Base escrita |
| 17 | flama-benissa-video-oficial, la-vibra-video-oficial, otra-movida-video-oficial, madison-video-oficial, azahara-video-oficial, flama-aftermovie | conciertos | Filmmaker, Edición | Seis fichas, casi vacías |
| 18 | aguita-de-coco-visuales | visuales-e-ia (nuevo) | Edición | Faltan datos |

Lectura de dictados que hay que confirmar: «Atávicas» (la obra), «El Xato» (no «Chato»), «Albir Confort», «Azahara», «ICE International School», «Tamilah y Fluxà», «Englobe».

## Cuando lleguen vídeos, fotos y respuestas

1. Josep contesta `cuestionario.md` y trae los enlaces y las fotos.
2. Se completa cada ficha y se escribe una frase final con acento (`frase`), corta y sin fórmulas.
3. Se carga como las anteriores: SQL revisado (`supabase/datos/`) o desde el panel. Para fotos: subirlas a la biblioteca (no más ImgBB).
4. Se añaden los tipos nuevos a las páginas de especialidad y a los filtros de Trabajos.
5. Josep revisa en su vista previa, por tandas.
