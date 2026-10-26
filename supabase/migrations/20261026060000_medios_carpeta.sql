-- Carpeta de cada foto en la biblioteca (solo para organizar el panel; la web no la usa). Vacía = sin carpeta.
-- Aditiva: la columna nueva no cambia nada de lo que ya hay.
alter table public.medios add column carpeta text not null default '' check (char_length(carpeta) <= 120);

comment on column public.medios.carpeta is 'Carpeta de la biblioteca del panel (p. ej. el nombre del proyecto). Vacía = sin carpeta';
