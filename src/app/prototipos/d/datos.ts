// Prototipo D · Cristal. Los datos tienen la misma forma que las tablas de la base de datos (fase 4):
// ajustes, servicios, proyectos, articulos, opiniones y, sobre todo, `bloques`: la portada (y cualquier
// página) es una lista ordenada de bloques que Josep puede reordenar, ocultar, editar o crear desde el panel.

export type ServicioD = {
  slug: string;
  nombre: string;
  frase: string;
  resumen: string;
  aporto: string[];
  paraQuien: string[];
  imagen: string;
  youtubeId: string;
  inicioClip: number;
};

export type ProyectoD = {
  slug: string;
  titulo: string;
  tipo: string;
  servicios: string[];
  anio?: number;
  direccion: string;
  productora: string;
  papel: string;
  camara?: string;
  youtubeId: string;
  inicioClip: number;
  poster: string;
  fotogramas: string[];
  frase: string;
  laurel?: { premio: string; festival: string };
};

export type ArticuloD = { slug: string; titulo: string; fecha: string; resumen: string; categoria: string };

export const AJUSTES = {
  nombre: "Josep Mira Lozano",
  whatsapp: "34618867115",
  correo: "josep.mira@gmail.com",
  reel: { youtubeId: "dHp3YUb1x2I", inicio: 12, poster: "https://i.imgur.com/ESU7wLA.jpeg" },
};

export const SERVICIOS: ServicioD[] = [
  {
    slug: "direccion-de-fotografia",
    nombre: "Dirección de fotografía",
    frase: "La luz cuenta la mitad de la historia.",
    resumen: "Decido qué siente quien mira: la luz, el encuadre y el color al servicio de tu historia.",
    aporto: [
      "Una propuesta visual propia: referencias, paleta y luz",
      "Desglose de cámara y luz secuencia a secuencia",
      "Cámara, ópticas y material según lo que pida la historia",
      "Acompañamiento del color hasta el final",
    ],
    paraQuien: ["Cortometrajes", "Videoclips", "Spots"],
    imagen: "https://www.platinocrowdfunding.com/storage/project/5454/img/eO2uv54rRAQy1AgsNjm0ybjXLN92jg4mkW9zFxZR.png",
    youtubeId: "9uyjeDnqixo",
    inicioClip: 40,
  },
  {
    slug: "filmmaker",
    nombre: "Filmmaker",
    frase: "De la primera idea al último fotograma.",
    resumen: "Idea, rodaje y montaje con una sola mirada de principio a fin. Nada se pierde por el camino.",
    aporto: [
      "La idea y el guion, si aún no existen",
      "Una forma de contarlo que no se parezca a lo de siempre",
      "Rodaje discreto cuando hace falta, ambicioso cuando se puede",
      "Versiones para redes del mismo material",
    ],
    paraQuien: ["Marcas", "Artistas", "Eventos", "Bodas"],
    imagen: "https://i.ytimg.com/vi/AWHJJA92MXM/maxresdefault.jpg",
    youtubeId: "AWHJJA92MXM",
    inicioClip: 25,
  },
  {
    slug: "edicion",
    nombre: "Edición",
    frase: "El ritmo es lo que hace que no puedas dejar de mirar.",
    resumen: "Percusionista desde los 3 años: monto con el ritmo por dentro, como una partitura.",
    aporto: [
      "Una lectura del material para encontrar la historia",
      "Montaje con estructura y ritmo pensados para dónde se verá",
      "Color con identidad",
      "Sonido y música, la mitad de lo que sentimos",
    ],
    paraQuien: ["Documentales", "Aftermovies", "Contenido para redes"],
    imagen: "https://i.ibb.co/vx4gxGQh/Captura-de-pantalla-2026-05-12-201300.png",
    youtubeId: "O-TDpUpxIGw",
    inicioClip: 30,
  },
];

export const PROYECTOS: ProyectoD[] = [
  {
    slug: "y-el-ano-que-viene-que",
    titulo: "Y el año que viene, ¿qué?",
    tipo: "Cortometraje",
    servicios: ["direccion-de-fotografia", "filmmaker", "edicion"],
    anio: 2024,
    direccion: "Josep Mira Lozano",
    productora: "Proyecto propio · ESCAC Dreammakers, Cupra",
    papel: "Dirección, fotografía y montaje",
    youtubeId: "dHp3YUb1x2I",
    inicioClip: 30,
    poster: "https://i.imgur.com/ESU7wLA.jpeg",
    fotogramas: ["https://i.imgur.com/ESU7wLA.jpeg", "https://i.imgur.com/qtM2MCm.jpg", "https://i.imgur.com/FdyOIDU.jpg"],
    frase: "Una carta de amor al cine escrita, rodada y montada en quince días, a partir de tres palabras: ojo, cine y Barcelona.",
    laurel: { premio: "Podio", festival: "ESCAC Dreammakers 2024" },
  },
  {
    slug: "100-baladas-arkano",
    titulo: "100 Baladas, Arkano",
    tipo: "Videoclip",
    servicios: ["filmmaker", "edicion"],
    direccion: "Josep Mira Lozano",
    productora: "Idea original de Álex Gómez",
    papel: "Dirección, cámara y montaje",
    youtubeId: "AWHJJA92MXM",
    inicioClip: 25,
    poster: "https://i.ytimg.com/vi/AWHJJA92MXM/maxresdefault.jpg",
    fotogramas: ["https://i.ytimg.com/vi/AWHJJA92MXM/maxresdefault.jpg"],
    frase: "Transformar una idea en un videoclip donde la imagen respira al ritmo de la música.",
  },
  {
    slug: "el-cirujano",
    titulo: "El Cirujano",
    tipo: "Cortometraje",
    servicios: ["direccion-de-fotografia"],
    direccion: "Kevin Ramos y Emilio Graña",
    productora: "Impulsos Creativos",
    papel: "Dirección de fotografía",
    youtubeId: "9uyjeDnqixo",
    inicioClip: 40,
    poster: "https://www.platinocrowdfunding.com/storage/project/5454/img/eO2uv54rRAQy1AgsNjm0ybjXLN92jg4mkW9zFxZR.png",
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
    servicios: ["direccion-de-fotografia", "edicion"],
    direccion: "Ángela Manzano",
    productora: "Pendiente",
    papel: "Fotografía y montaje",
    youtubeId: "8E1R23u8jjc",
    inicioClip: 44,
    poster: "https://i.ibb.co/nN1R7bkV/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-12-047.jpg",
    fotogramas: [
      "https://i.ibb.co/6RLX7RwQ/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-05-391.jpg",
      "https://i.ibb.co/hJ70TfQW/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-02-20-863.jpg",
      "https://i.ibb.co/tPwcqPyC/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-00-44-400.jpg",
      "https://i.ibb.co/Wp7ZCfxz/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-01-25-345.jpg",
      "https://i.ibb.co/TDs4pBhq/No-Se-Esta-Tan-Mal-LOVVA-V4-4k-mp4-snapshot-02-41-047.jpg",
    ],
    frase: "Una luz suave, casi una burbuja, para que el artista pudiera abrirse. Siete sets, siete esquemas de luz, una sola atmósfera.",
  },
  {
    slug: "ep-oscuridad-adrian-munoz",
    titulo: "EP Oscuridad, Adrián Muñoz",
    tipo: "Videoclip",
    servicios: ["direccion-de-fotografia"],
    direccion: "Adrián Muñoz",
    productora: "Pendiente",
    papel: "Dirección de fotografía",
    youtubeId: "At7qqcIhdHw",
    inicioClip: 30,
    poster: "https://i.imgur.com/MgsvdAf.png",
    fotogramas: ["https://i.imgur.com/MgsvdAf.png"],
    frase: "Siete vídeos y un solo descenso: la luz va apagándose canción a canción hasta llegar a la oscuridad.",
    laurel: { premio: "1,39 M visualizaciones", festival: "YouTube y plataformas" },
  },
  {
    slug: "kiboko",
    titulo: "Kiboko",
    tipo: "Documental",
    servicios: ["edicion"],
    direccion: "Pendiente",
    productora: "Pendiente",
    papel: "Montaje",
    youtubeId: "O-TDpUpxIGw",
    inicioClip: 30,
    poster: "https://i.ibb.co/vx4gxGQh/Captura-de-pantalla-2026-05-12-201300.png",
    fotogramas: ["https://i.ibb.co/vx4gxGQh/Captura-de-pantalla-2026-05-12-201300.png"],
    frase: "Tejer horas de entrevistas reales con escenas de ficción sin que se noten las costuras.",
    laurel: { premio: "Nominación a mejor montaje", festival: "Festival pendiente" },
  },
];

export const ARTICULOS: ArticuloD[] = [
  {
    slug: "ia-artesano-audiovisual",
    titulo: "El artesano y la inteligencia artificial en el cine",
    fecha: "13 may 2025",
    categoria: "Reflexión",
    resumen: "Qué cambia la IA en la producción audiovisual y por qué el trabajo artesano sigue importando.",
  },
  {
    slug: "el-arte-de-contar-historias-con-luz",
    titulo: "Dirección de fotografía: el arte de contar historias con luz",
    fecha: "15 jul 2024",
    categoria: "Oficio",
    resumen: "La luz es el pincel del director de fotografía. Cómo un esquema de luz cambia lo que sentimos.",
  },
  {
    slug: "dslr-vs-cine",
    titulo: "DSLR contra cine: la cámara no hace al cineasta",
    fecha: "28 jun 2024",
    categoria: "Equipo",
    resumen: "Por qué la mirada de quien graba importa más que la cámara que lleva en las manos.",
  },
];

export const OPINIONES = [
  { texto: "La verdad que es increíble, nos ha encantado. Ha quedado realmente precioso, es espectacular.", quien: "Novios", tipo: "Vídeo de boda" },
  { texto: "Jo, me he emocionado. Me encanta. Es simplemente... PERFECTO. Mil gracias.", quien: "Cliente", tipo: "Proyecto audiovisual" },
  { texto: "GUUUAAAUUUUU, brutaaaaaal.", quien: "Organización", tipo: "Vídeo resumen de evento" },
  { texto: "He visto el vídeo resumen y muy chulo. Muy guapos los cambios.", quien: "Organización", tipo: "Vídeo resumen de evento" },
  { texto: "Está superguay, Josep. Muy chulo, muy chulo, muy chulo.", quien: "Artista", tipo: "Aftermovie" },
];

export const CLIENTES = ["Disney", "Star Wars", "Consell Valencià de la Joventut", "Kinepolis", "Ocisport", "Mediterra Cinema", "JUNO Media"];

export const PASOS = [
  { titulo: "Escucho", texto: "Me cuentas la historia, el tono y lo que quieres que sienta quien la vea. Sin prisas y sin formularios eternos." },
  { titulo: "Imagino", texto: "Te propongo una mirada: referencias, luz, encuadres, ritmo. Lo vemos juntos antes de grabar nada." },
  { titulo: "Ruedo", texto: "Me encargo de la imagen para que tú puedas centrarte en lo tuyo. Discreto cuando toca, ambicioso cuando se puede." },
  { titulo: "Cuido el final", texto: "Montaje, color y sonido con el mismo mimo que el rodaje, hasta que el resultado sea el que soñamos." },
];

// ---------------------------------------------------------------------------
// Bloques: así se guardará cada sección en la tabla `bloques` (pagina, orden, tipo, visible, datos jsonb)

export type TipoBloque =
  | "portada"
  | "servicios"
  | "trabajos"
  | "cifras"
  | "proceso"
  | "sobre-mi"
  | "opiniones"
  | "clientes"
  | "blog"
  | "texto"
  | "llamada";

export type Bloque = {
  id: string;
  tipo: TipoBloque;
  visible: boolean;
  datos: { antetitulo?: string; titulo: string; texto?: string; imagen?: string };
};

/** Catálogo de tipos de bloque: lo que el panel ofrece al pulsar "Añadir sección" */
export const CATALOGO: Record<TipoBloque, { nombre: string; descripcion: string; datos: Bloque["datos"] }> = {
  portada: { nombre: "Portada con reel", descripcion: "Vídeo a pantalla completa y frase principal", datos: { antetitulo: "Director de fotografía · Filmmaker · Editor", titulo: "Historias hechas de luz.", texto: "Me llamo Josep y llevo más de quince años contando historias con luz, encuadre y ritmo. Cada plano que firmo lleva algo de mí." } },
  servicios: { nombre: "Servicios", descripcion: "Lo que ofreces, con lo que aportas y para quién", datos: { antetitulo: "Lo que hago", titulo: "¿En qué te puedo ayudar?", texto: "Tres formas de trabajar juntos. Elige una y la vemos con calma." } },
  trabajos: { nombre: "Trabajos", descripcion: "Carrusel de proyectos con filtro por servicio", datos: { antetitulo: "Selección", titulo: "Trabajos de los que estoy orgulloso" } },
  cifras: { nombre: "Cifras y premios", descripcion: "Números que cuentan tu trayectoria", datos: { antetitulo: "En números", titulo: "Quince años detrás de la cámara" } },
  proceso: { nombre: "Cómo trabajo", descripcion: "Pasos que se iluminan con el scroll", datos: { antetitulo: "Cómo trabajamos", titulo: "De tu idea a la pantalla, paso a paso" } },
  "sobre-mi": { nombre: "Sobre mí", descripcion: "Retrato y presentación personal", datos: { antetitulo: "Quién soy", titulo: "Hola, soy Josep", texto: "Empecé con la música y la interpretación, y en el vídeo encontré la forma de juntarlo todo. Desde entonces he rodado cortos, videoclips, spots, conciertos y bodas, y llevo más de ocho años en YouTube recreando planos míticos del cine con cuatro duros. Me gusta trabajar en equipo, resolver problemas en el set y que la gente se olvide de que hay una cámara.", imagen: "https://i.postimg.cc/Qh3FMz10/Captura-de-pantalla-2026-05-13-161052.png" } },
  opiniones: { nombre: "Opiniones", descripcion: "Frases de clientes en movimiento", datos: { antetitulo: "Opiniones", titulo: "Lo que dicen quienes han confiado en mí" } },
  clientes: { nombre: "Clientes", descripcion: "Franja de marcas con las que has trabajado", datos: { titulo: "Han confiado en mí" } },
  blog: { nombre: "Blog", descripcion: "Los últimos artículos publicados", datos: { antetitulo: "Blog", titulo: "Lo que aprendo por el camino" } },
  texto: { nombre: "Sección libre", descripcion: "Título, texto e imagen opcional, para lo que quieras", datos: { antetitulo: "Nuevo", titulo: "Una sección nueva", texto: "Escribe aquí lo que quieras contar: una novedad, un proyecto en marcha, una oferta para festivales..." } },
  llamada: { nombre: "Llamada a la acción", descripcion: "Invitación a escribirte, con WhatsApp y correo", datos: { titulo: "¿Tienes una historia que contar?", texto: "Cuéntamela. Me encantará escucharla y pensar cómo llevarla a la pantalla." } },
};

const ORDEN_INICIAL: TipoBloque[] = ["portada", "servicios", "trabajos", "cifras", "proceso", "sobre-mi", "opiniones", "clientes", "blog", "llamada"];

export const BLOQUES_INICIALES: Bloque[] = ORDEN_INICIAL.map((tipo) => ({
  id: tipo,
  tipo,
  visible: true,
  datos: { ...CATALOGO[tipo].datos },
}));

export const getProyectoD = (slug: string) => PROYECTOS.find((p) => p.slug === slug);

export function fichaTecnicaD(p: ProyectoD): [string, string][] {
  return [
    ["Año", p.anio ? String(p.anio) : "Pendiente"],
    ["Tipo", p.tipo],
    ["Dirección", p.direccion],
    ["Productora", p.productora],
    ["Mi papel", p.papel],
    ["Cámara", p.camara ?? "Pendiente"],
  ];
}
