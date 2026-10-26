-- Página «JUNO Media» (/juno-media): explica la colaboración de Josep con JUNO Media. La etiqueta «con JUNO MEDIA» de
-- los proyectos y el apartado de Clientes llevan a ella. Es una página de bloques, editable en su sitio. Repetible.
begin;

insert into public.paginas (slug, titulo, seo_titulo, seo_descripcion, estado, publicado_en)
values ('juno-media', 'JUNO Media', $t$Mi colaboración con JUNO Media · Josep Mira Lozano$t$,
  $t$Trabajo en sinergia con JUNO Media, productora audiovisual: una colaboración estrecha para que los proyectos de gran envergadura cuenten con una productora.$t$, 'publicado', now())
on conflict (idioma, slug) do nothing;

insert into public.bloques (pagina_id, orden, tipo, visible, datos)
select pg.id, b.orden, b.tipo::public.tipo_bloque, true, b.datos
from public.paginas pg
cross join lateral (values
  (0, 'texto', $json${"estilo": "cabecera", "antetitulo": "En sinergia con JUNO Media", "titulo": "Una colaboración *muy estrecha*", "texto": "JUNO Media es una productora audiovisual y cinematográfica. No formo parte de ella, pero trabajamos codo con codo. Es una conexión personal, artística y profesional.\n\nMuchos de mis proyectos nacen mano a mano con JUNO Media. Así puedo ofrecerte algo más que mis manos cuando el proyecto lo pide."}$json$::jsonb
     || jsonb_strip_nulls(jsonb_build_object('imagen', (select imagen_id::text from public.proyectos where slug = 'ep-oscuridad-adrian-munoz' and idioma = 'es')))),
  (1, 'proceso', $json${"antetitulo": "Cómo trabajamos juntos", "titulo": "Cuando el proyecto *pide más*", "pasos": [
    {"titulo": "Una conexión de verdad", "texto": "No es una relación de encargos sueltos: nos conocemos y trabajamos juntos de forma muy estrecha."},
    {"titulo": "Proyectos de gran envergadura", "texto": "Si tu proyecto es grande, puedes asegurarte la producción de una productora audiovisual como JUNO Media."},
    {"titulo": "Tú eliges", "texto": "Siempre puedes escoger esa opción. Y si prefieres hablar solo conmigo, también."},
    {"titulo": "Yo te lo propongo", "texto": "Si veo que tu proyecto necesita las manos de una productora, te lo digo y lo preparamos con ellos."}]}$json$::jsonb),
  (2, 'texto', $json${"estilo": "tarjeta", "antetitulo": "Su web", "titulo": "Conoce a *JUNO Media*", "texto": "Una productora audiovisual y cinematográfica, a la medida de cada cliente. Aquí puedes ver quiénes son y qué hacen.", "enlace": {"texto": "Ir a la web de JUNO Media", "href": "https://junomedia.es"}}$json$::jsonb),
  (3, 'llamada', coalesce((select x.datos from public.bloques x join public.paginas i on i.id = x.pagina_id where i.slug = 'inicio' and i.idioma = 'es' and x.tipo = 'llamada' order by x.orden limit 1), '{}'::jsonb))
) as b(orden, tipo, datos)
where pg.slug = 'juno-media' and pg.idioma = 'es'
  and not exists (select 1 from public.bloques x where x.pagina_id = pg.id);

-- El apartado de JUNO en Clientes (Inicio y Sobre mí) lleva a la página
update public.bloques b set datos = jsonb_set(b.datos, '{juno,enlace}', '{"texto": "Así trabajamos", "href": "/juno-media"}'::jsonb, true)
from public.paginas p
where b.pagina_id = p.id and p.idioma = 'es' and b.tipo = 'clientes' and p.slug in ('inicio', 'sobre-mi')
  and coalesce(b.datos #>> '{juno,enlace,href}', '') = '';

commit;
