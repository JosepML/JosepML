# Copias de seguridad de la web (`oadmqwtnxpbotxcgzaoo`)

Esta carpeta guarda las copias de seguridad locales de la base de datos y de los archivos del bucket `medios` de Supabase. Los volcados están ignorados en Git (`.gitignore`) para no subir datos privados ni archivos pesados al repositorio.

## Cómo hacer una copia de seguridad

### Opción 1 · Doble clic en Windows
Ejecuta `scripts\hacer-copia-seguridad.bat`. Creará una subcarpeta con la fecha y hora actual (por ejemplo `copias-seguridad/2026-10-27_17-00/`) con:
- `datos.json`: todas las tablas de contenido de la web (`ajustes`, `servicios`, `tipos_proyecto`, `proyectos`, `proyecto_servicios`, `categorias_articulo`, `articulos`, `paginas`, `bloques`, `clientes`, `opiniones`, `canales`, `medios`).
- `resumen.json`: fecha, recuento de filas por tabla y comprobación de integridad.
- `archivos/` (si se ejecuta con `--con-archivos`): copia de las imágenes y vídeos del bucket `medios`.

### Opción 2 · Desde la terminal
```bash
# Copia rápida de toda la base de datos (segundos)
node scripts/copia-seguridad.mjs

# Copia completa incluyendo los archivos del bucket medios
node scripts/copia-seguridad.mjs --con-archivos

# Verificar una copia existente
node scripts/copia-seguridad.mjs --verificar copias-seguridad/ultima
```

> **Nota sobre mensajes y borradores privados:** si en `.env.local` añades `SUPABASE_SERVICE_ROLE_KEY=...` (solo en tu PC, nunca se sube a Git), la copia incluirá también la tabla privada `mensajes` y las filas en estado `borrador`. Sin ella, usa la clave pública de `.env` y guarda todo el contenido publicado.
