// Textos de los proyectos para la ficha del prototipo. Generado con scripts/textos-prototipo.mjs a partir de
// plan/contenido/proyectos/*.md (no editar a mano). Cuando exista la base de datos, esto sale de la tabla `proyectos`.
export type TextosProyecto = {
  tarjeta: string;
  proyecto: string[];
  decisiones: { titulo: string; texto: string }[];
  reto: string;
  resultado: string[];
};

export const TEXTOS: Record<string, TextosProyecto> = {
  "100-baladas-arkano": {
    "tarjeta": "Videoclip de Arkano producido por JUNO Media. Lo dirigí, llevé la cámara y lo monté. Más de 17.000 visualizaciones.",
    "proyecto": [
      "*100 Baladas* es un single personal de Arkano, escrito con su pareja y estrenado el 14 de febrero. La idea era de Álex Gómez; yo la adapté al formato y al ritmo de un videoclip. Producción de Noelia Fluxà y Julie-Estel Soard."
    ],
    "decisiones": [
      {
        "titulo": "La distancia como hilo",
        "texto": "Plano a plano, Arkano y su pareja se acercan hasta el final del tema."
      },
      {
        "titulo": "Montaje a la canción",
        "texto": "Los cortes siguen sus cambios, no un ritmo fijo."
      }
    ],
    "reto": "Dirigir una idea que no era mía sin perder lo que la hacía especial.",
    "resultado": [
      "Más de 17.000 visualizaciones en YouTube."
    ]
  },
  "bodas": {
    "tarjeta": "Bodas contadas como un tráiler documental de unos 20 minutos, con música elegida con cada pareja. Por privacidad, aquí solo hay fotogramas.",
    "proyecto": [
      "He grabado muchas bodas, siempre con muy buenas valoraciones. Cubro el día entero y monto la película."
    ],
    "decisiones": [
      {
        "titulo": "Discreción",
        "texto": "Los novios se olvidan de la cámara y los momentos salen solos."
      },
      {
        "titulo": "Tráiler documental",
        "texto": "Unos 20 minutos ágiles en lugar de una crónica lineal."
      },
      {
        "titulo": "Música a medida",
        "texto": "Elegida con la pareja, con cada transición ajustada a la imagen."
      }
    ],
    "reto": "Estar en los momentos que no se repiten sin que se note.",
    "resultado": []
  },
  "conciertos": {
    "tarjeta": "Aftermovies de conciertos y orquestas. Grabo y monto a partir de la música, y soy músico.",
    "proyecto": [
      "Un aftermovie cuenta un directo en poco tiempo: el espectáculo, la entrega de los artistas y el público. Clientes: Tamilah y Fluxà (Agüita de Coco y Flama), Mapache Events, Orquesta Azara y Miami Show."
    ],
    "decisiones": [
      {
        "titulo": "Primero el audio",
        "texto": "Un mix con los temas más potentes y cambios de tempo es el esqueleto del vídeo."
      },
      {
        "titulo": "Grabar para montar",
        "texto": "Hablo con los artistas, cubro muchos encuadres y tomo el playback."
      },
      {
        "titulo": "Estructura",
        "texto": "Lo más rompedor al principio y lo más espectacular al cierre, con el ambiente del público."
      }
    ],
    "reto": "Que tenga ritmo y cuente el concierto en vez de ser una lista de clips.",
    "resultado": []
  },
  "el-cirujano": {
    "tarjeta": "Thriller psicológico de Impulsos Creativos, con la luz y el color como mapa de la mente de un asesino.",
    "proyecto": [
      "Una inspectora persigue a un asesino en serie que convierte a sus víctimas en obras de arte, y las pistas apuntan a su compañero. Dirigido por Kevin Ramos y Emilio Graña. Yo hice la dirección de fotografía."
    ],
    "decisiones": [
      {
        "titulo": "Luz sin fuente",
        "texto": "En los espacios del asesino la luz no sale de lámparas ni ventanas: sale de su mente."
      },
      {
        "titulo": "Rojo infierno",
        "texto": "Un rojo intenso en las escenas más oscuras, como aviso de peligro."
      },
      {
        "titulo": "Investigación fría",
        "texto": "Una luz analítica que marca la doble vida de los personajes."
      }
    ],
    "reto": "Que el mundo casi sobrenatural de los crímenes y la investigación realista convivieran sin romper la tensión. Lo resolví separándolos por luz y color.",
    "resultado": [
      "Mejor fotografía en el On Duty International Film Festival."
    ]
  },
  "el-viajero": {
    "tarjeta": "Corto de ciencia ficción en los años 50, mi proyecto final del ciclo de Realización. Cuatro personas de equipo. Más de 22.000 visualizaciones.",
    "proyecto": [
      "Un relojero obsesivo construye una máquina del tiempo y su yo del futuro vuelve para advertirle. Idea, guion, dirección y fotografía míos. Equipo: Alba Gisbert, Sebastian Alonso Pérez, Mar Garrido, Lara Ruiz Martín y Andreu Pastor. Música de David Bellido y Jesús Jiménez."
    ],
    "decisiones": [
      {
        "titulo": "Los 50 sin presupuesto",
        "texto": "Un apartamento antiguo y atrezo de casas de familiares."
      },
      {
        "titulo": "Máquina hecha a mano",
        "texto": "Manivela, engranajes y tuberías que funcionan de verdad."
      },
      {
        "titulo": "La bombilla como luz principal",
        "texto": "Clave baja con la luz de la propia máquina."
      },
      {
        "titulo": "Un clic de reloj",
        "texto": "La música original repite ese motivo durante todo el corto."
      }
    ],
    "reto": "Hacer creíble una máquina del tiempo sin dinero.",
    "resultado": [
      "Más de 22.000 visualizaciones en YouTube."
    ]
  },
  "ep-oscuridad-adrian-munoz": {
    "tarjeta": "Siete visualizers y un tráiler para el EP de Adrián Muñoz (JUNO Media). Hice la dirección de fotografía. Más de 1,39 millones de visualizaciones.",
    "proyecto": [
      "*Oscuridad* cuenta cómo se rompe una pareja: el enfado, la soledad, la ruptura, las cicatrices y la resignación. Una canción, un vídeo."
    ],
    "decisiones": [
      {
        "titulo": "Pantalla partida",
        "texto": "El artista a un lado y la pareja al otro, encuadrados e iluminados para leerse juntos."
      },
      {
        "titulo": "De color a blanco y negro",
        "texto": "Cada tema pierde saturación hasta el séptimo."
      },
      {
        "titulo": "Una luz por emoción",
        "texto": "Contraste cuidado y atmósfera densa en cada bucle."
      }
    ],
    "reto": "Siete vídeos que funcionan sueltos en redes y que, juntos, forman un solo descenso.",
    "resultado": [
      "1.392.400 visualizaciones entre YouTube, Instagram y Spotify."
    ]
  },
  "eventos-deportivos": {
    "tarjeta": "Cobertura de ciclismo de élite, como la Shimano Super Cup Massi en La Nucía, para Ocisport. Piezas para redes y para televisión.",
    "proyecto": [
      "En una carrera la acción pasa una sola vez y muy rápido. Grabo a pie de pista y monto."
    ],
    "decisiones": [
      {
        "titulo": "Elegir sitio",
        "texto": "Me coloco en los puntos más espectaculares del circuito."
      },
      {
        "titulo": "Cámara rápida y cerrada",
        "texto": "Seguimiento preciso para que se note la velocidad."
      },
      {
        "titulo": "Un pack por canal",
        "texto": "Reels para redes y piezas largas con calidad de emisión."
      },
      {
        "titulo": "Sonido realzado",
        "texto": "Ruedas, esfuerzo y público sobre una base musical fuerte."
      }
    ],
    "reto": "Estar en el sitio justo en el momento justo y condensar la carrera sin perder tensión.",
    "resultado": []
  },
  "expandete-spot-juno-media": {
    "tarjeta": "Spot narrativo para JUNO Media: guion, casting, localizaciones, dirección y montaje míos. Pieza de muestra, no comercializada.",
    "proyecto": [
      "JUNO Media quería contar su lema, \"cine para sanar\", sin que pareciera un anuncio. Escribí una fábula: una niña con ideas infinitas ayuda a su vecino, bloqueado, a liberar las suyas. La fotografía fue de Juanfran Jiménez, con quien preparé el rodaje."
    ],
    "decisiones": [
      {
        "titulo": "Giro final",
        "texto": "Tres actos, y nadie sabe que es publicidad hasta que aparecen las fundadoras."
      },
      {
        "titulo": "Dos casas enfrentadas",
        "texto": "La niña y el adulto se miran a través de la ventana."
      },
      {
        "titulo": "Casting con oficio",
        "texto": "Amaia Miranda, actriz infantil con experiencia, para rodar rápido y natural."
      }
    ],
    "reto": "Encontrar las dos viviendas que la historia necesitaba.",
    "resultado": []
  },
  "kiboko": {
    "tarjeta": "Docuficción de JUNO Media sobre el bar Kiboko de La Vila Joiosa en los 80. La monté yo. Estreno con aforo completo en junio de 2026.",
    "proyecto": [
      "Dirigida por Noelia Fluxá y Julie-Estel Soard. El Kiboko fue un refugio de libertad y música; lo cuenta Ana, una cronista ficticia que hoy investiga su historia. Rodada en ARRI. Yo hice el montaje."
    ],
    "decisiones": [
      {
        "titulo": "Ordenar primero",
        "texto": "Sincronizar, cribar y estructurar horas de entrevistas junto a la ficción."
      },
      {
        "titulo": "Testimonio y ficción en diálogo",
        "texto": "Las entrevistas responden a lo que Ana investiga."
      },
      {
        "titulo": "Dos ritmos",
        "texto": "Vibrante en el bar de 1986; pausado en las entrevistas."
      }
    ],
    "reto": "Pasar del testimonio a la ficción sin que se note el salto ni se pierda la emoción.",
    "resultado": [
      "Estreno con aforo completo en el Teatre Auditori de La Vila Joiosa (6 de junio de 2026).",
      "Selección en festivales y nominación a mejor montaje."
    ]
  },
  "no-se-esta-tan-mal-lovva": {
    "tarjeta": "Videoclip de Lovva (dirección de Ángela Manzano). Hice la fotografía y el montaje: siete sets, cada uno con su luz, en una sola atmósfera.",
    "proyecto": [
      "Una canción sobre aceptarse a uno mismo. La directora pedía una \"burbuja\" visual donde el artista pudiera mostrarse vulnerable sin perder fuerza."
    ],
    "decisiones": [
      {
        "titulo": "Luz puntual, no plana",
        "texto": "Contraluces, destellos suaves y puntos de luz que envuelven al artista."
      },
      {
        "titulo": "Cristal y agua",
        "texto": "Reflejos y refracciones para dar textura."
      },
      {
        "titulo": "Un esquema por set",
        "texto": "Siete luces distintas, enlazadas en montaje sin romper el ritmo."
      }
    ],
    "reto": "Que siete espacios distintos se sintieran como un mismo lugar emocional.",
    "resultado": []
  },
  "recreacion-el-padrino": {
    "tarjeta": "El plano de Vito Corleone en su despacho, con la luz de Gordon Willis, en un sótano y con la rejilla de una estufa como ventana.",
    "proyecto": [
      "Quise estudiar cómo ilumina Willis recreando su plano más conocido. Dirigí, fotografié y construí el set."
    ],
    "decisiones": [
      {
        "titulo": "La ventana",
        "texto": "Rejilla de estufa de butano, cinta negra, papel de horno como difusor y LED detrás."
      },
      {
        "titulo": "Ojos en sombra",
        "texto": "Aputure 300d II con softbox cenital y un negativo en el suelo."
      },
      {
        "titulo": "Temperatura",
        "texto": "Cámara hacia cálido y fondo compensado con geles fríos."
      },
      {
        "titulo": "Color sin verlo",
        "texto": "Soy daltónico: igualé pieles y sombras en DaVinci Resolve con el fotograma original."
      }
    ],
    "reto": "Recrear la luz de una ventana que no existía, y un color que no veo como los demás.",
    "resultado": []
  },
  "recreacion-nosferatu": {
    "tarjeta": "Una escena de *Nosferatu* recreada con Comboi Films, con cartón, una rampa de madera y un soplador de hojas.",
    "proyecto": [
      "En mi canal recreo planos de cine con muy pocos medios. Aquí, la sombra del vampiro en la ventana y la protagonista que levita. Yo dirigí y coordiné."
    ],
    "decisiones": [
      {
        "titulo": "La sombra",
        "texto": "Silueta de cartón y cinta, escalada a la ventana y proyectada con un spotlight."
      },
      {
        "titulo": "La levitación",
        "texto": "Una rampa de madera, escondida por el ángulo y la luz."
      },
      {
        "titulo": "Luz general",
        "texto": "Aputure 300D con softbox."
      }
    ],
    "reto": "La cortina debía moverse con el viento y esa noche no soplaba. Hilos y cartones no funcionaron; un soplador de hojas dio el viento dosificable, y hilos finos movían la silueta al compás.",
    "resultado": [
      "Un plano casi idéntico al original con unos 100 € de material."
    ]
  },
  "recreacion-star-wars-luke-vader": {
    "tarjeta": "El duelo de Luke y Vader en la Ciudad Nube, para el 45.º aniversario de *El Imperio Contraataca*: maqueta, siluetas y sables fotograma a fotograma.",
    "proyecto": [
      "Idea, dirección, fotografía y postproducción míos, con medios caseros."
    ],
    "decisiones": [
      {
        "titulo": "Maqueta",
        "texto": "Un set en miniatura, como en las películas originales."
      },
      {
        "titulo": "Exposición",
        "texto": "Muchas pruebas de diafragma e ISO para enfocar algo tan pequeño."
      },
      {
        "titulo": "Siluetas",
        "texto": "Rodadas al aire libre contra una pared blanca, tras fallar en interior."
      },
      {
        "titulo": "Postproducción",
        "texto": "Sables y personajes añadidos fotograma a fotograma."
      }
    ],
    "reto": "Espacio y luz: dar a una maqueta pequeña la profundidad de un set real.",
    "resultado": []
  },
  "recreacion-star-wars-sin-cgi": {
    "tarjeta": "Luke en la Ciudad de las Nubes sin CGI: pilares de alfombra, tuberías de ferretería y fondo de papel perforado.",
    "proyecto": [
      "Llevo una década haciendo contenido de Star Wars. Aquí recreé el plano más icónico de Luke solo con recursos físicos: dirección, fotografía, atrezo y postproducción."
    ],
    "decisiones": [
      {
        "titulo": "Decorado de ferretería",
        "texto": "Pilares de alfombra forrada de goma EVA y tuberías de fontanería."
      },
      {
        "titulo": "Luces de fondo",
        "texto": "Papel gris perforado; el desenfoque convierte los agujeros en halos."
      },
      {
        "titulo": "Luz dura",
        "texto": "LED magnético de contraluz, modificador concentrado y negativo en el suelo."
      }
    ],
    "reto": "La perspectiva. Con un 85 mm las proporciones no eran las del original, así que rehíce el rodaje entero con un 55 mm.",
    "resultado": []
  },
  "reels-redes-sociales": {
    "tarjeta": "Reels y shorts verticales para Disney, el Consell Valencià de la Joventut y creadores de YouTube.",
    "proyecto": [
      "Más de nueve años haciendo contenido para redes. Un vídeo vertical se juega la atención en tres segundos, y cada cliente necesita sonar distinto."
    ],
    "decisiones": [
      {
        "titulo": "Gancho",
        "texto": "Lo más potente, en los tres primeros segundos."
      },
      {
        "titulo": "Sin tiempos muertos",
        "texto": "Cortes a la música, zooms digitales y diseño sonoro."
      },
      {
        "titulo": "Cada cliente, su tono",
        "texto": "Cambian la luz, el color, los subtítulos y el ritmo."
      }
    ],
    "reto": "Cambiar de registro entre clientes sin perder el ritmo de cada plataforma.",
    "resultado": [
      "Cientos de miles de visualizaciones entre todas las piezas."
    ]
  },
  "sin-piedad": {
    "tarjeta": "Corto de Ángela Manzano sobre el abuso laboral. Hice la fotografía, casi toda sobre un ciclorama blanco. En preparación para festivales.",
    "proyecto": [
      "Un hombre machacado en su trabajo decide secuestrar a su jefa. Se cuenta desde su cabeza, con tono onírico."
    ],
    "decisiones": [
      {
        "titulo": "Un ciclorama, muchos lugares",
        "texto": "Cada espacio lo crea la luz."
      },
      {
        "titulo": "Oficina como limbo",
        "texto": "Luz uniforme y fría sobre el blanco."
      },
      {
        "titulo": "Prisión mental",
        "texto": "Sombras de persiana y tonos azulados, sin paredes."
      },
      {
        "titulo": "Secuestro",
        "texto": "Contraluz intenso, como un halo teatral."
      }
    ],
    "reto": "Que un solo espacio blanco pareciera varios lugares con carga emocional distinta.",
    "resultado": []
  },
  "sin-tiempo-peiko": {
    "tarjeta": "Videoclip narrativo de Peiko, proyecto de estudios. Lo dirigí y lo fotografié: dos casas opuestas y una celda.",
    "proyecto": [
      "Una canción sobre el paso del tiempo y la distancia entre el éxito y el fracaso, contada con una historia dramática. Rodado con Canon C200 y un 50 mm fijo."
    ],
    "decisiones": [
      {
        "titulo": "Dos casas opuestas",
        "texto": "Una moderna y otra podrida, para mostrar la fractura del personaje."
      },
      {
        "titulo": "Plan desde la canción",
        "texto": "Cámara y óptica al servicio del arco del personaje."
      },
      {
        "titulo": "Final en una celda",
        "texto": "Luz más fría y Peiko agarrado a los barrotes."
      }
    ],
    "reto": "Que la caída se viera en la imagen y no solo en la letra.",
    "resultado": []
  },
  "y-el-ano-que-viene-que": {
    "tarjeta": "Mi corto para el ESCAC Dreammakers Contest 2024 de Cupra: lo escribí, dirigí, fotografié, monté y protagonicé. Podio.",
    "proyecto": [
      "Tres palabras obligatorias (*Ojo*, *Cine* y *Barcelona*) y un mes para hacer un corto. Las uní con mi relación con el cine, en un relato autobiográfico con voz en off. Me ayudaron Adrià Mira Lozano y Lara Ruiz Martín."
    ],
    "decisiones": [
      {
        "titulo": "La voz primero",
        "texto": "Una voz en off cálida, con *Amélie* como referencia."
      },
      {
        "titulo": "Contraste de ritmos",
        "texto": "Montaje acelerado contra una voz tranquila."
      }
    ],
    "reto": "Unos 15 días reales para idear, rodar, montar y entregar. Me quedé solo con lo que contaba la historia.",
    "resultado": [
      "Podio del ESCAC Dreammakers Contest 2024.",
      "Acceso a becas de la ESCAC."
    ]
  }
};
