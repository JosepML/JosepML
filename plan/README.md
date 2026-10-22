# Plan de la web nueva: ejecución por fases

Cada fase se ejecuta en **un chat (hilo) distinto** del proyecto de Claude. Así cada chat empieza limpio y solo carga lo que necesita.

Plan completo y razonado (documento para leer y comentar): https://claude.ai/code/artifact/24bd3f90-f611-4cdc-994b-6ee619bea682

## Estado de las fases

**Orden de trabajo desde el 2026-10-22:** [hoja-de-ruta.md](hoja-de-ruta.md) (tareas para Opus y para Sonnet, cada una en su hilo).

| Fase | Archivo | Estado |
| --- | --- | --- |
| 1. Preparación | [fase-1-preparacion.md](fase-1-preparacion.md) | Hecha |
| 2. Contenido y textos | [fase-2-contenido-y-textos.md](fase-2-contenido-y-textos.md) | En revisión: textos en `plan/contenido/`, faltan datos de Josep |
| 3. Dirección visual | [fase-3-direccion-visual.md](fase-3-direccion-visual.md) | En revisión: A, B y C descartados; nuevo prototipo D · Cristal en `localhost:3000/prototipos/d`, falta el visto bueno de Josep |
| 4. Base de datos y migración | [fase-4-base-de-datos-y-migracion.md](fase-4-base-de-datos-y-migracion.md) | En curso: esquema y seguridad hechos (`plan/esquema.md`); falta cargar el contenido (S1 a S3) |
| 5. Web pública | [fase-5-web-publica.md](fase-5-web-publica.md) | Bloqueada por 2, 3 y 4 |
| 6. Panel privado | [fase-6-panel-privado.md](fase-6-panel-privado.md) | Bloqueada por 4 y 5 |
| 7. Pruebas y lanzamiento | [fase-7-lanzamiento.md](fase-7-lanzamiento.md) | Bloqueada por 6 |

Las fases 2, 3 y 4 pueden hacerse en paralelo, cada una en su chat.

## Cómo arrancar el chat de una fase

Crea un mensaje nuevo en el proyecto y pega esto, cambiando el número de fase:

```
Ejecuta la fase N del plan de la web nueva.
Trabaja en la rama claude/project-thread-9vb26d del repositorio JosepML/JosepML (no en master): haz checkout de esa rama y sube ahí tus cambios.
Antes de nada lee CLAUDE.md, plan/README.md, plan/00-contexto.md y el archivo de la fase N, y sigue el protocolo de plan/README.md.
```

## Protocolo para cada chat (lo sigue Claude)

1. **Al empezar:** hacer checkout de `claude/project-thread-9vb26d` y `git pull`. Leer este README, `00-contexto.md` y el archivo de la fase. No leer los archivos de otras fases salvo que la fase lo pida.
2. **Comprobar dependencias:** si la tabla de arriba marca una fase previa necesaria como no hecha, avisar a Josep antes de seguir.
3. **Trabajar** siguiendo las tareas del archivo de la fase, marcando `- [x]` cada tarea al terminarla.
4. **Nunca** tocar `master` ni publicar nada hasta la fase 7. Nunca tocar el proyecto de Supabase "JML Studio" (es la app de facturación).
5. **Al cerrar la sesión o al terminar la fase:** actualizar en el archivo de la fase la sección *Registro* (fecha, qué se hizo, qué queda, decisiones de Josep) y, si cambia, el estado en la tabla de arriba. Las decisiones que afecten a otras fases van también a `00-contexto.md`.
6. **Revisión:** cada fase termina con la revisión de Josep en `http://localhost:3000` en su PC. Una fase solo pasa a "Hecha" cuando Josep da el visto bueno.
7. Commits pequeños y descriptivos, en español, subidos a la rama de trabajo.

## Si trabajas desde Claude Code en tu PC

También puedes abrir Claude Code directamente en `C:\Users\Josep\Documents\WEB JOSEP MIRA`. Allí `CLAUDE.md` se lee solo; basta con escribir "Continuamos con la fase N". Antes, haz `git pull` para tener la última versión de estos archivos.
