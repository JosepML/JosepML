-- Esquema sólido, parte 0: borra las tablas de 20261022144748_esquema_inicial.
-- Estaban vacías (comprobado antes de borrar). Las sustituyen las partes 1, 2 y 3.

-- 0. Quitar el esquema anterior (vacío) ---------------------------------------------
-- Se conservan: ajustes, administradores, es_admin() y fijar_actualizado_en().

drop policy if exists "Medios: lectura pública" on storage.objects;
drop policy if exists "Medios: escritura solo administrador" on storage.objects;
drop policy if exists "Escritura de ajustes solo administrador" on public.ajustes;

drop table if exists
  public.borradores, public.mensajes, public.medios, public.canales, public.opiniones, public.clientes,
  public.bloques, public.paginas, public.articulos, public.proyectos, public.servicios
  cascade;

drop function if exists public.limitar_mensajes();
