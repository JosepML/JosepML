// Contenido real de 3 proyectos (de legacy/constants.ts y plan/contenido/) para los prototipos de la fase 3.
// En la fase 5 todo esto saldrá de la base de datos.

export type Laurel = { premio: string; festival: string };

export type ProyectoProto = {
  slug: string;
  titulo: string;
  tipo: string;
  anio?: number;
  direccion: string;
  productora: string;
  papel: string;
  camara?: string;
  youtubeId: string;
  /** Segundo del vídeo donde empieza el clip mudo de la tarjeta */
  inicioClip: number;
  poster: string;
  fotogramas: string[];
  frase: string;
  laurel?: Laurel;
};

export const PROYECTOS: ProyectoProto[] = [
  {
    slug: "y-el-ano-que-viene-que",
    titulo: "Y el año que viene, ¿qué?",
    tipo: "Cortometraje",
    anio: 2024,
    direccion: "Josep Mira Lozano",
    productora: "Proyecto propio · ESCAC Dreammakers, Cupra",
    papel: "Dirección, fotografía y montaje",
    youtubeId: "dHp3YUb1x2I",
    inicioClip: 30,
    poster: "https://i.imgur.com/ESU7wLA.jpeg",
    fotogramas: [
      "https://i.imgur.com/ESU7wLA.jpeg",
      "https://i.imgur.com/qtM2MCm.jpg",
      "https://i.imgur.com/FdyOIDU.jpg",
    ],
    frase: "Una carta de amor al cine escrita, rodada y montada en quince días, a partir de tres palabras: ojo, cine y Barcelona.",
    laurel: { premio: "Podio", festival: "ESCAC Dreammakers Contest 2024" },
  },
  {
    slug: "el-cirujano",
    titulo: "El Cirujano",
    tipo: "Cortometraje",
    direccion: "Kevin Ramos y Emilio Graña",
    productora: "Impulsos Creativos",
    papel: "Dirección de fotografía",
    youtubeId: "9uyjeDnqixo",
    inicioClip: 40,
    poster:
      "https://www.platinocrowdfunding.com/storage/project/5454/img/eO2uv54rRAQy1AgsNjm0ybjXLN92jg4mkW9zFxZR.png",
    fotogramas: [
      "https://www.platinocrowdfunding.com/storage/project/5454/img/eO2uv54rRAQy1AgsNjm0ybjXLN92jg4mkW9zFxZR.png",
      "https://www.platinocrowdfunding.com/storage/project/5454/img/bj9n3eW3a65uyo5krgOrW1dhpgJAtqk8bvY5x687.png",
      "https://iili.io/BmoHrCl.png",
    ],
    frase: "Llevamos el rojo hasta el infierno para meternos en la cabeza del asesino. La luz no sale de las lámparas: sale de su mente.",
    laurel: { premio: "Mejor fotografía", festival: "On Duty International Film Festival" },
  },
  {
    slug: "no-se-esta-tan-mal-lovva",
    titulo: "No se está tan mal, Lovva",
    tipo: "Videoclip",
    direccion: "Ángela Manzano",
    productora: "Pendiente",
    papel: "Fotografía y montaje",
    youtubeId: "8E1R23u8jjc",
    inicioClip: 44,
    poster:
      "https://i.ibb.co/nN1R7bkV/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-12-047.jpg",
    fotogramas: [
      "https://i.ibb.co/6RLX7RwQ/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-05-391.jpg",
      "https://i.ibb.co/hJ70TfQW/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-02-20-863.jpg",
      "https://i.ibb.co/tPwcqPyC/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-44-400.jpg",
      "https://i.ibb.co/Wp7ZCfxz/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-01-25-345.jpg",
      "https://i.ibb.co/TDs4pBhq/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-02-41-047.jpg",
    ],
    frase: "Una luz suave, casi una burbuja, para que el artista pudiera abrirse. Siete sets, siete esquemas de luz, una sola atmósfera.",
  },
];

export const REEL = {
  youtubeId: "dHp3YUb1x2I",
  inicio: 12,
  poster: "https://i.imgur.com/ESU7wLA.jpeg",
};

export const PORTADA = {
  antetitulo: "Josep Mira Lozano · Director de fotografía y filmmaker",
  frase: "Historias hechas de luz.",
  intro:
    "Me llamo Josep y llevo más de quince años contando historias con luz, encuadre y ritmo. Cada plano que firmo lleva algo de mí.",
};

export const RECONOCIMIENTOS: { premio: string; donde: string; obra: string }[] = [
  { premio: "Mejor fotografía", donde: "On Duty International Film Festival", obra: "El Cirujano" },
  { premio: "Podio", donde: "ESCAC Dreammakers Contest 2024", obra: "Y el año que viene, ¿qué?" },
  { premio: "Nominación a mejor montaje", donde: "Festival pendiente", obra: "Kiboko" },
  { premio: "1,39 millones de visualizaciones", donde: "YouTube y plataformas", obra: "EP Oscuridad, Adrián Muñoz" },
];

export const PASOS = [
  { titulo: "Escucho", texto: "Me cuentas la historia, el tono y lo que quieres que sienta el espectador." },
  { titulo: "Imagino", texto: "Te propongo una mirada: referencias, luz, encuadres." },
  { titulo: "Ruedo", texto: "Me encargo de la imagen para que tú puedas centrarte en dirigir." },
  { titulo: "Cuido el final", texto: "Acompaño el color para que el resultado sea el que soñamos." },
];

export function getProyecto(slug: string) {
  return PROYECTOS.find((p) => p.slug === slug);
}

/** Filas de la ficha técnica, en el orden de los créditos de cine */
export function fichaTecnica(p: ProyectoProto): [string, string][] {
  return [
    ["Año", p.anio ? String(p.anio) : "Pendiente"],
    ["Tipo", p.tipo],
    ["Dirección", p.direccion],
    ["Productora", p.productora],
    ["Mi papel", p.papel],
    ["Cámara", p.camara ?? "Pendiente"],
  ];
}
