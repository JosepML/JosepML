import { filas } from "./cliente";
import { getMedios, listaMedios, medio } from "./medios";
import type { Premio, Proyecto, VideoExtra } from "./tipos";
import { lista, objeto, texto } from "./util";

/** Proyectos publicados (incluidas las recreaciones), en el orden de Trabajos */
export async function getProyectos(): Promise<Proyecto[]> {
  const [proyectos, tipos, enlaces, servicios, medios] = await Promise.all([
    filas("proyectos"),
    filas("tipos_proyecto"),
    filas("proyecto_servicios"),
    filas("servicios"),
    getMedios(),
  ]);
  // Solo los servicios publicados: un proyecto no enlaza a una página de servicio que no existe
  const slugServicio = new Map(servicios.map((s) => [s.id, s.slug]));

  return proyectos
    .sort((a, b) => a.orden - b.orden)
    .map((p) => {
      const tipo = tipos.find((t) => t.id === p.tipo_id);
      const galeria = listaMedios(medios, p.galeria);
      return {
        id: p.id,
        slug: p.slug,
        titulo: p.titulo,
        tipo: tipo ? { slug: tipo.slug, nombre: tipo.nombre, enListadoGeneral: tipo.en_listado_general } : null,
        servicios: enlaces
          .filter((e) => e.proyecto_id === p.id && slugServicio.has(e.servicio_id))
          .map((e) => ({ slug: slugServicio.get(e.servicio_id)!, orden: e.orden, destacado: e.destacado })),
        anio: p.anio,
        direccion: p.direccion,
        productora: p.productora,
        papel: p.papel,
        camara: p.camara,
        youtubeId: p.youtube_id,
        youtubeInicio: p.youtube_inicio,
        poster: medio(medios, p.imagen_id) ?? galeria[0]?.imagen ?? null,
        galeria,
        detrasDeCamaras: listaMedios(medios, p.detras_de_camaras),
        clip: medio(medios, p.clip_id),
        videoPortada: medio(medios, p.video_portada_id),
        videos: lista<VideoExtra>(p.videos),
        videosDebajoDelTexto: p.videos_debajo_del_texto,
        premios: lista(p.premios)
          .map((x): Premio => {
            const o = objeto(x);
            return { nombre: texto(o.nombre), tipo: texto(o.tipo), festival: texto(o.festival), anio: typeof o.anio === "number" ? o.anio : null };
          })
          .filter((x) => x.nombre),
        destacadoOrden: p.destacado_orden,
        orden: p.orden,
        frase: p.frase,
        textos: {
          tarjeta: p.tarjeta,
          historia: p.historia,
          miPapel: p.mi_papel,
          comoLoHicimos: p.como_lo_hicimos,
          elReto: p.el_reto,
          elResultado: p.el_resultado,
        },
        titulosSeccion: Object.fromEntries(Object.entries(objeto(p.titulos_seccion)).map(([k, v]) => [k, texto(v)])),
        seo: { titulo: p.seo_titulo, descripcion: p.seo_descripcion },
      };
    });
}

export async function getProyecto(slug: string) {
  return (await getProyectos()).find((p) => p.slug === slug) ?? null;
}
