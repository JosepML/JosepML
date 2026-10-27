# Traspaso del proyecto · web nueva de Josep Mira

Fecha: 2026-10-27. Para: otra IA que retome el trabajo sin el contexto de estos hilos.
Lee antes: `CLAUDE.md`, `plan/README.md`, `plan/00-contexto.md`, `plan/hoja-de-ruta.md` y `plan/plan-publicacion.md`. Este archivo resume lo que hay en ellos y en la memoria del proyecto. Si algo no cuadra, manda lo que dice Josep en el hilo.

## 1. Objetivo

- Web nueva de Josep Mira Lozano: director de fotografía, filmmaker y editor. Sustituye a la web estática de `master` (GitHub Pages).
- Mezcla portfolio y página de venta. Tono personal, cálido y cinematográfico.
- La web le muestra a él: su ojo, su oficio y su gusto. No es un catálogo de servicios.
- Todo lo editable sale de Supabase y se cambia desde el panel `/admin` o con «Editar página» en la propia web.
- La web en vivo no se toca hasta el lanzamiento (fase 7).

## 2. Reglas de Josep

- **Sin precios.** Cada presupuesto se hace a medida. Nada de «pide presupuesto» ni tramos de tarifa.
- **Sin sección de equipo.** La cámara va en los créditos de cada proyecto.
- **Textos:** frases cortas, con decisiones concretas y sin relleno. Primera persona. Nada de fórmulas que suenen a IA. Nunca se inventan premios, cifras ni nombres de clientes.
- **Experiencia:** «más de nueve años» o «+9». No presumir del número de proyectos (18). No destacar «percusionista desde los 3 años».
- **Movimiento:** animaciones suaves y elegantes, sin cortes bruscos. Josep tiene desactivadas las animaciones de Windows, así que el navegador dice «reducir movimiento». Por eso `useReducir()` devuelve `false` y la web siempre anima. Compara el comportamiento, no solo la captura.
- **Solo Josep edita.** Su cuenta es la única administradora. El registro público está cerrado.
- **JUNO Media:** Josep trabaja «en sinergia» con JUNO Media, pero no forma parte de la empresa. La relación es contexto interno: no se publica tal cual. Tono profesional, elegante y fresco.
- **PR #1** (`claude/project-thread-9vb26d` → `master`) es un borrador titulado «NO FUSIONAR hasta la fase 7». No se fusiona ni se marca como listo. Cuando Josep dice «fusionar con la web», se refiere a integrar cambios en la rama de trabajo, no a PR #1.

## 3. Repositorio y ramas

- Rama de trabajo: `claude/project-thread-9vb26d`. Nunca `master`.
- Cada hilo hace commits pequeños en español y sube a la rama de trabajo.
- Antes de cada commit: `npm run lint`, `npx tsc --noEmit` y `npm run build`.
- Carpetas clave: `src/app/(web)/` (web pública), `src/app/admin/` (panel), `src/components/`, `src/lib/datos/` (lectura de datos), `supabase/migrations/`, `supabase/datos/` (SQL numerado), `plan/` (todo lo de planificación), `scripts/`.

## 4. Estado de las fases

| Fase | Estado |
| --- | --- |
| 1 · Preparación | Hecha |
| 2 · Contenido y textos | En revisión. Faltan fotos de Josep, un reel nuevo y los nombres de festivales de Kiboko |
| 3 · Dirección visual | Hecha (2026-10-22). Diseño D · Cristal, tokens en `src/styles/tokens.css` |
| 4 · Base de datos | En curso. Esquema y seguridad hechos. Contenido cargado casi entero |
| 5 y 6 · Web pública y panel | Se hacen por tareas (ver abajo) |
| 7 · Lanzamiento | Bloqueada. Solo con orden expresa de Josep |

## 5. Tareas A a E

- **A · Remates de dirección visual:** hecha. Visto bueno de Josep el 2026-10-22.
- **B · Base de datos, RLS y acceso:** hecha. Tablas, `es_admin()`, bucket `medios`, tipos generados y advisors de seguridad a cero. Josep es administrador.
- **C · Esqueleto público e Inicio desde la base:** hecha en código. Pendiente: el vídeo de portada como mp4 propio (de momento usa YouTube).
- **D · Sistema de edición:** hecha en código. «Editar página» en Inicio y Sobre mí, y el panel completo. Josep lo probó en su PC el 2026-10-24 y le gustó.
- **E · Textos de proyectos y artículos:** en revisión. Los textos están en la base. Josep revisa en tandas. Los 26 textos nuevos salen de sus respuestas al cuestionario (`supabase/datos/19-textos-completos.sql` y `19b`). Faltan la frase final de las 4 recreaciones y ampliar el artículo de la luz.

## 6. Tareas S1 a S20

**Hechas:**
- S1 (carga de proyectos y artículos), S4 (textos en la base).
- S2 (imágenes externas copiadas al bucket `medios`, 2026-10-26). Quedan 0 URLs externas de imagen en la base, salvo miniaturas de YouTube en algunas fichas.
- S5 (`/trabajos` y fichas), S6 (servicios), S7 (recreaciones), S8 (`/sobre-mi`, falta su retrato), S9 (blog).
- S14 (artículos con editor), S15 (servicios, clientes, opiniones, canales, ajustes), S16 (biblioteca con recorte), S17 (mensajes; con datos reales cuando exista S10).
- S3 está casi hecha.

**Pendientes, en orden:**
- **S10 · Contacto y `/gracias`:** guarda en `mensajes` y avisa por correo. Falta que Josep elija cómo le llega el aviso (no hay servicio de correo configurado).
- **S11 · Privacidad, cookies y GA4 (`G-RKBDRMVL1J`):** GA4 solo tras aceptar. Faltan los datos legales de Josep: nombre, si tiene NIF y correo.
- **S12 · SEO** (metadatos, Schema.org, sitemap, robots, imágenes para redes) y **S13 · redirecciones** de `/#/project/<id>`. S12 va después de cargar los proyectos nuevos.
- **S18 · Copia de seguridad semanal** fuera de Supabase. Falta decidir dónde (¿su Google Drive?).
- **S19 · Guía del panel** con capturas.
- **S20 · Repaso final:** móvil, teclado, claro y oscuro, escalado de Windows al 150 %, Lighthouse, accesibilidad y reducir movimiento. Ningún texto de relleno visible.
- **P · Proyectos del año:** depende de O1 (guía y tipos nuevos, en Opus) y de la lista que Josep no ha enviado todavía. Ver sección 8.
- **T · Textos pendientes:** frases finales de recreaciones, artículo de la luz y textos de servicios con los proyectos nuevos.

## 7. Vista previa local en el PC de Josep

- Carpeta: `C:\Users\Josep\Documents\WEB JOSEP MIRA`. Se ve en `http://localhost:3000`.
- Para ver un cambio: cerrar la ventana del servidor y ejecutar `scripts\iniciar-prototipos.bat`. Ese script hace `git pull` y reconstruye. **Ctrl+F5 no basta.**
- Los hilos no pueden hacer `git pull` en su equipo (el proxy da 403 hacia GitHub). Por eso Josep tiene que ejecutar el script.
- Remote Control solo funciona si Josep escribe en el mismo hilo. Un mensaje del coordinador no cuenta.
- Para probar en el contenedor, usar el emulador `scripts/supabase-local/` (su README explica cómo arrancarlo). Los procesos mueren entre sesiones: hay que volver a levantar PostgreSQL, `servidor.mjs` y Next.
- Nunca escribir datos de prueba en producción.

## 8. Supabase

- Proyecto de esta web: **`oadmqwtnxpbotxcgzaoo`** («Web Josep Mira»).
- **Nunca** tocar «JML Studio» (`jgolxrpxyuxpqqdyikwb`). Es su app de facturación.
- SQL destructivo (DROP, DELETE, renombrar políticas o cambios de roles) lo ejecuta Josep en el editor SQL de Supabase. No buscar otra vía para saltarse un permiso bloqueado.
- Los cambios aditivos y no destructivos se pueden hacer con el MCP de Supabase (autorizado por Josep el 2026-10-26). Si el MCP pide una aprobación que no llega al hilo, dar el SQL a Josep por trozos, en un artefacto con botón de copiar.
- Modelo de publicación: cada fila tiene `estado` (`borrador` o `publicado`). `publicar()` aplica el borrador en una transacción. `revisiones` guarda las últimas 30 versiones. Esquema en `plan/esquema.md`.
- SQL que espera a Josep:
  - `supabase/datos/10-especialidades-fotos.sql` (fotos de las especialidades).
  - Carga de los proyectos nuevos: migración, subida de fotos a la biblioteca y `supabase/datos/11-proyectos-nuevos.sql`. Ese archivo se genera con `scripts/generar-proyectos-nuevos.py`. Después de editar una ficha, volver a generarlo.

## 9. Pendientes abiertos

- **Biblioteca:** carpetas tipo Drive y buscador (commits `f22b735` a `ae7f674`). Pendiente de que Josep lo revise.
- **Punto de interés en las fotos:** implementado (`946699b`, `2423c50`, `fd7b7af`). Pendiente de que Josep lo confirme.
- **Foto pixelada de Dirección de fotografía:** hay un hilo bloqueado esperando a Josep.
- **Duplicado de Legends:** revisar que no haya dos fichas. Legends ya está publicada y enlazada (`b94548f`).
- **Vídeos en Cloudflare R2:** 29 vídeos (3,9 GB) en el bucket `jml-videos`, enlazados en el SQL de proyectos nuevos. La URL `r2.dev` es solo para pruebas. Antes del lanzamiento hace falta un dominio propio en el bucket. Hay un token sobrante llamado «jml-videos-subida» que Josep puede borrar. Azahara no se carga hasta que esté terminado su vídeo.
- **Datos legales** para S11 (ver sección 6).
- **Revisión en móvil y modo oscuro** (S20).
- **Datos que faltan:** festivales de Kiboko, reel nuevo, retrato y fotos de rodaje para «Sobre mí», vídeo de portada en mp4, logos de clientes que faltan y años de 15 proyectos sin año. Cámara de Sin Piedad: Blackmagic 4K Pocket, por confirmar.
- **Clientes:** tres «SOM Events» ocultos repetidos (borradores de pruebas). Josep puede borrarlos desde su menú.
- **Proyectos del año:** O1 (Opus) prepara la guía, los tipos nuevos y la plantilla de datos. Después, P (Sonnet) los carga en tandas que Josep aprueba. Hace falta la lista de Josep, aunque sea en bruto, con sus fotos o enlaces.

## 10. Hilos activos (27 de octubre)

- **Crear archivo de traspaso del proyecto:** este hilo. Crea este archivo.
- **Reescritura de textos de proyectos** (bloqueado desde el 26 de octubre): espera respuesta de Josep.
- **Corregir foto de portada pixelada** (bloqueado desde el 26 de octubre): espera respuesta de Josep.
- **Rehacer página de JUNO Media** (bloqueado desde el 26 de octubre): espera respuesta de Josep.
- **Revisión de textos en el prototipo** (bloqueado desde el 23 de octubre): espera respuesta de Josep.
- **Esqueleto público e Inicio** (bloqueado desde el 23 de octubre): espera respuesta de Josep.
- **Imágenes y fotos de la web** (listo para revisar): S2, pendiente de que Josep lo mire.
- **Elegir punto de interés en fotos** (terminado el 26 de octubre).
- **Fase del plan de la web** (bloqueado desde el 20 de octubre): es antiguo. Revisar antes de reabrirlo.
- Terminados: dirección visual, base de datos y panel, carga de contenido, textos de artículos y sistema de edición.

Cada hilo tiene su propio traspaso en `plan/traspaso-*.md`. Antes de retomar uno, léelo.
