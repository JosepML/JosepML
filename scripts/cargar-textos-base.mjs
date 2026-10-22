// Tarea S4: genera el SQL que carga en Supabase los 18 proyectos y los 2 artículos, en borrador.
// Uso: node --experimental-strip-types --no-warnings scripts/cargar-textos-base.mjs
// Salida: supabase/datos/proyectos_y_articulos.sql (se ejecuta en el proyecto "Web Josep Mira", nunca en JML Studio).
//
// De dónde sale cada cosa:
// - Textos: plan/contenido/proyectos/*.md y plan/contenido/articulos/*.md (sin «Para revisar», que no se publica).
// - Ficha técnica, frase final, vídeo y fotogramas: src/app/prototipos/d/datos.ts (revisada con Josep en el prototipo).
// - Lo que el prototipo no tiene (las 4 recreaciones, más fotogramas y vídeos extra): legacy/constants.ts.
//
// El SQL se puede volver a ejecutar: crea lo que falta y actualiza solo las filas que siguen en borrador.
// Nunca borra nada ni toca lo publicado.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ARTICULOS, PROYECTOS } from "../src/app/prototipos/d/datos.ts";
import { PROJECTS as LEGACY } from "../legacy/constants.ts";

const SALIDA = "supabase/datos/proyectos_y_articulos.sql";

// Secciones del .md → columnas de `proyectos`. Los títulos visibles van en `titulos_seccion`.
const SECCIONES = {
  Tarjeta: "tarjeta",
  "El proyecto": "historia",
  "Decisiones clave": "como_lo_hicimos",
  "El reto": "el_reto",
  Resultado: "el_resultado",
};
const TITULOS_SECCION = {
  historia: "El proyecto",
  como_lo_hicimos: "Decisiones clave",
  el_reto: "El reto",
  el_resultado: "Resultado",
};

// Premios con el formato de plan/esquema.md. Sin festival ni año inventados: si falta, no se pone.
const PREMIOS = {
  "y-el-ano-que-viene-que": [{ anio: 2024, nombre: "Podio", tipo: "podio", festival: "ESCAC Dreammakers Contest" }],
  "el-cirujano": [{ nombre: "Mejor fotografía", tipo: "ganado", festival: "On Duty International Film Festival" }],
  kiboko: [{ anio: 2026, nombre: "Nominación a mejor montaje", tipo: "nominación" }],
};

// Imágenes que no se cargan: la de iili.io ya no existe y la de rbgescuela no es de Josep.
const DESCARTADAS = new Set([
  "https://iili.io/BmoHrCl.png",
  "https://rbgescuela.com/wp-content/uploads/claves-reels-atractivos-instagram.jpg",
]);
// Pósteres que cambian: el de El Padrino era una URL firmada que caduca; Reels usa la miniatura de uno de sus vídeos.
const POSTER = {
  "recreacion-el-padrino": "https://i.ytimg.com/vi/WnSCN4aXDKA/maxresdefault.jpg",
  "reels-redes-sociales": "https://i.ytimg.com/vi/rUv-Ql7NxCQ/hqdefault.jpg",
};

const leer = (ruta) => readFileSync(ruta, "utf8").replace(/\r\n/g, "\n");

function partir(md) {
  const fin = md.indexOf("\n---\n", 4);
  const cabecera = {};
  for (const linea of md.slice(4, fin).split("\n")) {
    const m = linea.match(/^([\wñ_]+):\s*(.*)$/);
    if (m) cabecera[m[1]] = m[2].trim();
  }
  return { cabecera, cuerpo: md.slice(fin + 5).split(/^## Para revisar/m)[0].trim() };
}

// Cada párrafo en una línea; las listas, un elemento por línea.
function limpiar(texto) {
  return texto
    .trim()
    .split(/\n\s*\n/)
    .map((b) => (b.trim().startsWith("- ") ? b.trim() : b.replace(/\s*\n\s*/g, " ").trim()))
    .filter(Boolean)
    .join("\n\n");
}

function secciones(cuerpo) {
  const salida = {};
  for (const trozo of cuerpo.split(/^## /m).slice(1)) {
    const [titulo, ...resto] = trozo.split("\n");
    const campo = SECCIONES[titulo.trim()];
    if (!campo) throw new Error(`Sección desconocida: ${titulo}`);
    salida[campo] = limpiar(resto.join("\n"));
  }
  return salida;
}

// Markdown básico → documento del editor (ProseMirror/TipTap): párrafos, títulos, *cursiva* y **negrita**.
function enLinea(texto) {
  const nodos = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    if (m.index > ultimo) nodos.push({ type: "text", text: texto.slice(ultimo, m.index) });
    nodos.push({ type: "text", text: m[1] ?? m[2], marks: [{ type: m[1] ? "bold" : "italic" }] });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) nodos.push({ type: "text", text: texto.slice(ultimo) });
  return nodos;
}

function documento(cuerpo) {
  const content = limpiar(cuerpo)
    .split("\n\n")
    .map((b) =>
      b.startsWith("## ")
        ? { type: "heading", attrs: { level: 2 }, content: enLinea(b.slice(3)) }
        : { type: "paragraph", content: enLinea(b) },
    );
  return { type: "doc", content };
}

const sinPendiente = (v) => (v && !/pendiente/i.test(v) ? v : "");
const anio = (v) => (/^\d{4}$/.test(v ?? "") ? Number(v) : null);

// Medios: una fila por URL, con un título neutro (slug-NN) que sirve de nombre de archivo en la tarea S2.
const medios = new Map();
function medio(url, slug, alt) {
  if (!url || DESCARTADAS.has(url)) return null;
  if (!medios.has(url)) {
    const n = [...medios.values()].filter((m) => m.titulo.startsWith(`${slug}-`)).length + 1;
    medios.set(url, { url, titulo: `${slug}-${String(n).padStart(2, "0")}`, alt });
  }
  return url;
}

const DIR = "plan/contenido/proyectos";
const archivos = readdirSync(DIR).filter((f) => f.endsWith(".md") && f !== "README.md");
const RECREACIONES = ["recreacion-nosferatu", "recreacion-star-wars-luke-vader", "recreacion-el-padrino", "recreacion-star-wars-sin-cgi"];
const orden = [...PROYECTOS.map((p) => p.slug), ...RECREACIONES];

const proyectos = archivos.map((archivo) => {
  const { cabecera: c, cuerpo } = partir(leer(join(DIR, archivo)));
  const slug = c.slug;
  const d = PROYECTOS.find((p) => p.slug === slug);
  const l = LEGACY.find((p) => p.id === c.id_antiguo);
  if (!l) throw new Error(`Sin proyecto antiguo para ${slug}`);
  if (!orden.includes(slug)) throw new Error(`Sin orden para ${slug}`);

  const titulo = d?.titulo ?? c.titulo;
  const alt = slug === "bodas" ? "Fotograma de una boda" : `Fotograma de ${titulo}`;
  const poster = medio(POSTER[slug] ?? d?.poster ?? l.thumbnailUrl, slug, alt);
  const galeria = [...new Set([...(d?.fotogramas ?? []), ...(l.images ?? [])])]
    .map((u) => medio(u, slug, alt))
    .filter(Boolean);

  const videos = (l.multipleVideos ?? []).map((v) =>
    v.type === "instagram"
      ? { tipo: "instagram", url: v.customHtml.match(/https:\/\/www\.instagram\.com\/reel\/[\w-]+\//)[0], titulo: v.title }
      : { tipo: v.type ?? "youtube", id: v.id, titulo: v.title },
  );
  if (l.processVideoId) videos.push({ tipo: "youtube", id: l.processVideoId, titulo: "Proceso", rol: "proceso" });

  const destacado = Number(c.destacado) || null;
  return {
    slug,
    id_antiguo: c.id_antiguo,
    titulo,
    tipo: c.tipo,
    servicios: d?.servicios ?? c.servicios.replace(/[[\]]/g, "").split(",").map((s) => s.trim()),
    anio: d?.anio ?? anio(c.año),
    direccion: d?.direccion ?? c.direccion,
    productora: d?.productora ?? sinPendiente(c.productora_cliente),
    papel: d?.papel ?? c.mi_papel,
    camara: d ? (d.camara ?? "") : sinPendiente(c.camara),
    premios: PREMIOS[slug] ?? [],
    ...{ tarjeta: "", historia: "", como_lo_hicimos: "", el_reto: "", el_resultado: "", ...secciones(cuerpo) },
    frase: d?.frase ?? "",
    titulos_seccion: TITULOS_SECCION,
    youtube_id: d ? (d.youtubeId ?? null) : (l.youtubeVideoId ?? null),
    youtube_inicio: d?.inicioClip ?? null,
    videos,
    videos_debajo_del_texto: !!l.videosBelowText,
    poster,
    galeria,
    destacado_orden: destacado,
    orden: orden.indexOf(slug) + 1,
  };
});

const articulos = readdirSync("plan/contenido/articulos")
  .filter((f) => f.endsWith(".md"))
  .map((archivo) => {
    const { cabecera: c, cuerpo } = partir(leer(join("plan/contenido/articulos", archivo)));
    const d = ARTICULOS.find((a) => a.slug === c.slug);
    if (!d) throw new Error(`Artículo sin ficha en datos.ts: ${c.slug}`);
    return {
      slug: c.slug,
      id_antiguo: c.id_antiguo,
      titulo: d.titulo,
      fecha: c.fecha,
      extracto: d.resumen,
      categoria: c.categoria,
      contenido: documento(cuerpo),
      imagen: medio(d.imagen, `blog-${c.slug}`, `Imagen del artículo «${d.titulo}»`),
    };
  });

// Cada sentencia lleva sus datos dentro (`with d as (...)`) para poder ejecutarlas una a una desde el MCP de
// Supabase, que no guarda variables entre llamadas. Van separadas porque el disparador que valida la galería
// tiene que ver las imágenes ya creadas.
const datosSql = (lista) => {
  const json = JSON.stringify(lista);
  if (json.includes("$datos$")) throw new Error("El texto contiene el delimitador $datos$");
  return `with d as (select $datos$${json}$datos$::jsonb as j)`;
};
const trozos = (lista, n) => Array.from({ length: Math.ceil(lista.length / n) }, (_, i) => lista.slice(i * n, i * n + n));

const sentencias = [
  `-- 1. Imágenes: una fila de \`medios\` por URL, con la URL de origen hasta que la tarea S2 la suba al bucket.
${datosSql([...medios.values()])}
insert into public.medios (url_origen, tipo, titulo, texto_alternativo)
select m ->> 'url', 'imagen', m ->> 'titulo', m ->> 'alt'
from d, jsonb_array_elements(d.j) m
where not exists (select 1 from public.medios x where x.url_origen = m ->> 'url');`,

  ...trozos(proyectos, 5).map(
    (lote, i) => `-- 2.${i + 1}. Proyectos (${lote.map((p) => p.slug).join(", ")})
${datosSql(lote)}
insert into public.proyectos as t (
  idioma, slug, id_antiguo, titulo, tipo_id, anio, direccion, productora, papel, camara, premios,
  tarjeta, historia, como_lo_hicimos, el_reto, el_resultado, frase, titulos_seccion,
  youtube_id, youtube_inicio, videos, videos_debajo_del_texto, imagen_id, galeria, destacado_orden, orden, estado
)
select 'es', p ->> 'slug', p ->> 'id_antiguo', p ->> 'titulo',
  (select id from public.tipos_proyecto where slug = p ->> 'tipo'),
  (p ->> 'anio')::int, p ->> 'direccion', p ->> 'productora', p ->> 'papel', p ->> 'camara', p -> 'premios',
  p ->> 'tarjeta', p ->> 'historia', p ->> 'como_lo_hicimos', p ->> 'el_reto', p ->> 'el_resultado', p ->> 'frase',
  p -> 'titulos_seccion', p ->> 'youtube_id', (p ->> 'youtube_inicio')::int, p -> 'videos',
  (p ->> 'videos_debajo_del_texto')::boolean,
  (select id from public.medios where url_origen = p ->> 'poster' order by creado_en limit 1),
  coalesce((
    select jsonb_agg(jsonb_build_object('medio', m.id, 'pie', '') order by g.n)
    from jsonb_array_elements_text(p -> 'galeria') with ordinality g(url, n)
    cross join lateral (select id from public.medios where url_origen = g.url order by creado_en limit 1) m
  ), '[]'::jsonb),
  (p ->> 'destacado_orden')::int, (p ->> 'orden')::int, 'borrador'
from d, jsonb_array_elements(d.j) p
on conflict (idioma, slug) do update set
  id_antiguo = excluded.id_antiguo, titulo = excluded.titulo, tipo_id = excluded.tipo_id, anio = excluded.anio,
  direccion = excluded.direccion, productora = excluded.productora, papel = excluded.papel, camara = excluded.camara,
  premios = excluded.premios, tarjeta = excluded.tarjeta, historia = excluded.historia,
  como_lo_hicimos = excluded.como_lo_hicimos, el_reto = excluded.el_reto, el_resultado = excluded.el_resultado,
  frase = excluded.frase, titulos_seccion = excluded.titulos_seccion, youtube_id = excluded.youtube_id,
  youtube_inicio = excluded.youtube_inicio, videos = excluded.videos,
  videos_debajo_del_texto = excluded.videos_debajo_del_texto, imagen_id = excluded.imagen_id,
  galeria = excluded.galeria, destacado_orden = excluded.destacado_orden, orden = excluded.orden
where t.estado = 'borrador';`,
  ),

  `-- 3. Servicios de cada proyecto: solo enlaza los que ya existan en \`servicios\` (los carga la tarea S3).
-- Si S3 llega después, basta con volver a ejecutar esta sentencia.
${datosSql(proyectos.map((p) => ({ slug: p.slug, servicios: p.servicios })))}
insert into public.proyecto_servicios (proyecto_id, servicio_id, orden)
select pr.id, s.id, x.n
from d, jsonb_array_elements(d.j) p
join public.proyectos pr on pr.idioma = 'es' and pr.slug = p ->> 'slug' and pr.estado = 'borrador'
cross join lateral jsonb_array_elements_text(p -> 'servicios') with ordinality x(slug, n)
join public.servicios s on s.idioma = 'es' and s.slug = x.slug
on conflict do nothing;`,

  `-- 4. Artículos
${datosSql(articulos)}
insert into public.articulos as t (idioma, slug, id_antiguo, titulo, fecha, extracto, contenido, categoria_id, imagen_id, estado)
select 'es', a ->> 'slug', a ->> 'id_antiguo', a ->> 'titulo', (a ->> 'fecha')::date, a ->> 'extracto', a -> 'contenido',
  (select id from public.categorias_articulo where idioma = 'es' and nombre = a ->> 'categoria'),
  (select id from public.medios where url_origen = a ->> 'imagen' order by creado_en limit 1),
  'borrador'
from d, jsonb_array_elements(d.j) a
on conflict (idioma, slug) do update set
  id_antiguo = excluded.id_antiguo, titulo = excluded.titulo, fecha = excluded.fecha, extracto = excluded.extracto,
  contenido = excluded.contenido, categoria_id = excluded.categoria_id, imagen_id = excluded.imagen_id
where t.estado = 'borrador';`,

  `-- 5. Recuento
select
  (select count(*) from public.medios) as medios,
  (select count(*) from public.proyectos) as proyectos,
  (select count(*) from public.proyecto_servicios) as servicios_enlazados,
  (select count(*) from public.articulos) as articulos;`,
];

const sql = `-- Tarea S4: proyectos y artículos en borrador. Generado con scripts/cargar-textos-base.mjs (no editar a mano).
-- Proyecto de Supabase "Web Josep Mira" (oadmqwtnxpbotxcgzaoo). Se puede volver a ejecutar: no borra nada
-- y solo actualiza filas que siguen en borrador. Lo publicado no se toca. Las sentencias van en orden.

${sentencias.join("\n\n")}
`;

mkdirSync("supabase/datos", { recursive: true });
writeFileSync(SALIDA, sql);
console.log(`${proyectos.length} proyectos, ${articulos.length} artículos y ${medios.size} imágenes -> ${SALIDA}`);
