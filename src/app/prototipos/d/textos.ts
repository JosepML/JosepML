// Textos de los proyectos para la ficha del prototipo. Generado con scripts/textos-prototipo.mjs a partir de
// plan/contenido/proyectos/*.md (no editar a mano). Cuando exista la base de datos, esto sale de la tabla `proyectos`.
export type BloqueTexto = { t: "p"; x: string } | { t: "li"; x: string[] };
export type TextosProyecto = { tarjeta: string; secciones: { titulo: string; bloques: BloqueTexto[] }[] };

export const TEXTOS: Record<string, TextosProyecto> = {
  "100-baladas-arkano": {
    "tarjeta": "Videoclip de Arkano producido por JUNO Media. Lo dirigí, llevé la cámara y lo monté. Más de 17.000 visualizaciones.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "*100 Baladas* es un single personal de Arkano, escrito con su pareja y estrenado el 14 de febrero. La idea era de Álex Gómez; yo la adapté al formato y al ritmo de un videoclip. Producción de Noelia Fluxà y Julie-Estel Soard."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La distancia entre los dos como hilo**: plano a plano se acercan, hasta el final del tema.",
              "**Cortes sobre los cambios de la canción**, no a un ritmo fijo."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Dirigir una idea que no era mía sin perder lo que la hacía especial."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Más de 17.000 visualizaciones en YouTube."
          }
        ]
      }
    ]
  },
  "bodas": {
    "tarjeta": "Bodas contadas como un tráiler documental de unos 20 minutos, con música elegida con cada pareja. Por privacidad, aquí solo hay fotogramas.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "He grabado muchas bodas, siempre con muy buenas valoraciones. Cubro el día entero y monto la película."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Discreción**: que los novios se olviden de la cámara.",
              "**Tráiler documental** ágil en lugar de una crónica lineal.",
              "**Música a medida**, con cada transición ajustada a la imagen."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en los momentos que no se repiten sin que se note."
          }
        ]
      }
    ]
  },
  "conciertos": {
    "tarjeta": "Aftermovies de conciertos y orquestas. Grabo y monto a partir de la música, y soy músico.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Un aftermovie cuenta un directo en poco tiempo: el espectáculo, la entrega de los artistas y el público. Clientes: Tamilah y Fluxà (Agüita de Coco y Flama), Mapache Events, Orquesta Azara y Miami Show."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Primero el audio**: un mix con los temas más potentes y cambios de tempo es el esqueleto del vídeo.",
              "**Grabar pensando en el montaje**: hablo con los artistas, cubro muchos encuadres y tomo el playback.",
              "**Lo más rompedor al principio y lo más espectacular al cierre**, con ambiente del público para sentir la primera fila."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que tenga ritmo y cuente el concierto en vez de ser una lista de clips."
          }
        ]
      }
    ]
  },
  "el-cirujano": {
    "tarjeta": "Thriller de Impulsos Creativos. Mi fotografía ganó el premio a mejor fotografía en el On Duty International Film Festival.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Una inspectora persigue a un asesino en serie que convierte a sus víctimas en obras de arte, y las pistas apuntan a su compañero. Dirigido por Kevin Ramos y Emilio Graña. Yo hice la dirección de fotografía."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Luz que no sale de ningún sitio** en los espacios del asesino: es su mente la que ilumina.",
              "**Rojo intenso** en las escenas más oscuras, como aviso de peligro.",
              "**Investigación fría y analítica**, para que se note la doble vida de los personajes."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que el mundo casi sobrenatural de los crímenes y la investigación realista convivieran sin romper la tensión. Lo resolví separándolos por luz y color."
          }
        ]
      }
    ]
  },
  "el-viajero": {
    "tarjeta": "Corto de ciencia ficción en los años 50, mi proyecto final del ciclo de Realización. Cuatro personas de equipo. Más de 22.000 visualizaciones.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Un relojero obsesivo construye una máquina del tiempo y su yo del futuro vuelve para advertirle. Idea, guion, dirección y fotografía míos. Equipo: Alba Gisbert, Sebastian Alonso Pérez, Mar Garrido, Lara Ruiz Martín y Andreu Pastor. Música de David Bellido y Jesús Jiménez."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Los 50 sin presupuesto**: apartamento antiguo y atrezo de casas de familiares.",
              "**Máquina hecha a mano**, con manivela, engranajes y tuberías que funcionan.",
              "**La bombilla de la máquina como luz principal**, en clave baja.",
              "**Música con un clic de reloj** que recorre todo el corto. Cámara: Canon C200 con un 50 mm fijo."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Hacer creíble una máquina del tiempo sin dinero."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Más de 22.000 visualizaciones en YouTube. Final abierto, con puerta a una secuela."
          }
        ]
      }
    ]
  },
  "ep-oscuridad-adrian-munoz": {
    "tarjeta": "Siete visualizers y un tráiler para el EP de Adrián Muñoz (JUNO Media). Hice la dirección de fotografía. Más de 1,39 millones de visualizaciones.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "*Oscuridad* cuenta cómo se rompe una pareja: el enfado, la soledad, la ruptura, las cicatrices y la resignación. Una canción, un vídeo."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pantalla partida**: el artista a un lado y bucles con la pareja al otro, encuadrados e iluminados para leerse juntos.",
              "**De color a blanco y negro**: cada tema pierde saturación hasta el séptimo, que es blanco y negro.",
              "**Una luz por emoción**, con contraste cuidado y atmósfera densa."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Siete vídeos que funcionan sueltos en redes y que, juntos, forman un solo descenso."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "p",
            "x": "1.392.400 visualizaciones entre YouTube, Instagram y Spotify."
          }
        ]
      }
    ]
  },
  "eventos-deportivos": {
    "tarjeta": "Cobertura de ciclismo de élite, como la Shimano Super Cup Massi en La Nucía, para Ocisport. Piezas para redes y para televisión.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "En una carrera la acción pasa una sola vez y muy rápido. Grabo a pie de pista y monto."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Elegir sitio** en los puntos más espectaculares del circuito.",
              "**Cámara rápida y cerrada** para que se note la velocidad.",
              "**Un pack de piezas**: reels para redes y piezas largas con calidad de emisión.",
              "**Sonido realzado** (ruedas, esfuerzo, público) sobre una base musical fuerte."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en el sitio justo en el momento justo y condensar la carrera sin perder tensión."
          }
        ]
      }
    ]
  },
  "expandete-spot-juno-media": {
    "tarjeta": "Spot narrativo para JUNO Media: guion, casting, localizaciones, dirección y montaje míos. Pieza de muestra, no comercializada.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "JUNO Media quería contar su lema, \"cine para sanar\", sin que pareciera un anuncio. Escribí una fábula: una niña con ideas infinitas ayuda a su vecino, bloqueado, a liberar las suyas. La fotografía fue de Juanfran Jiménez, con quien preparé el rodaje."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Tres actos y giro final**: nadie sabe que es publicidad hasta que aparecen las fundadoras, Noelia Fluxà y Julie-Estel Soard.",
              "**Dos casas enfrentadas**, con las dos habitaciones conectadas por la mirada a través de la ventana.",
              "**Casting con oficio**: Amaia Miranda como niña, para rodar rápido y natural."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Encontrar las dos viviendas que la historia necesitaba."
          }
        ]
      }
    ]
  },
  "kiboko": {
    "tarjeta": "Docuficción de JUNO Media sobre el bar Kiboko de La Vila Joiosa en los 80. La monté yo. Estreno con aforo completo en junio de 2026.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Dirigida por Noelia Fluxá y Julie-Estel Soard. El Kiboko fue un refugio de libertad y música; lo cuenta Ana, una cronista ficticia que hoy investiga su historia. Rodada en ARRI. Yo hice el montaje."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Ordenar primero**: sincronizar, cribar y estructurar horas de entrevistas junto a la ficción.",
              "**Testimonio y ficción en diálogo**: las entrevistas responden a lo que Ana investiga.",
              "**Dos ritmos**: vibrante y con banda sonora en el bar de 1986; pausado en las entrevistas."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Pasar del testimonio a la ficción sin que se note el salto ni se pierda la emoción."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Estreno con aforo completo en el Teatre Auditori de La Vila Joiosa (6 de junio de 2026).",
              "Selección en festivales y nominación a mejor montaje."
            ]
          }
        ]
      }
    ]
  },
  "no-se-esta-tan-mal-lovva": {
    "tarjeta": "Videoclip de Lovva (dirección de Ángela Manzano). Hice la fotografía y el montaje: siete sets, cada uno con su luz, en una sola atmósfera.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Una canción sobre aceptarse a uno mismo. La directora pedía una \"burbuja\" visual donde el artista pudiera mostrarse vulnerable sin perder fuerza."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Luz puntual en vez de plana**: contraluces, destellos suaves y puntos de luz que envuelven al artista.",
              "**Cristal y agua** para dar textura con reflejos y refracciones.",
              "**Un esquema de luz por set**, y un montaje que enlaza los siete sin romper el ritmo."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que siete espacios distintos se sintieran como un mismo lugar emocional."
          }
        ]
      }
    ]
  },
  "recreacion-el-padrino": {
    "tarjeta": "El plano de Vito Corleone en su despacho, con la luz de Gordon Willis, en un sótano y con la rejilla de una estufa como ventana.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Quise estudiar cómo ilumina Willis recreando su plano más conocido. Dirigí, fotografié y construí el set."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Ventana**: rejilla de estufa de butano con cinta negra, papel de horno de difusor y LED detrás.",
              "**Ojos en sombra**: Aputure 300d II con softbox cenital y negativo en el suelo.",
              "**Temperatura**: cámara hacia cálido y fondo compensado con geles fríos.",
              "**Color**: soy daltónico, así que igualé pieles y sombras en DaVinci Resolve con el fotograma original."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Recrear la luz de una ventana que no existía, y un color que no veo como los demás."
          }
        ]
      }
    ]
  },
  "recreacion-nosferatu": {
    "tarjeta": "Una escena de *Nosferatu* recreada con Comboi Films, con cartón, una rampa de madera y un soplador de hojas.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "En mi canal recreo planos de cine con muy pocos medios. Aquí, la sombra del vampiro en la ventana y la protagonista que levita. Yo dirigí y coordiné."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Sombra de cartón y cinta**, escalada para encajar en la ventana y proyectada con un spotlight a distancia y ángulo medidos.",
              "**Levitación con rampa de madera**, escondida por el ángulo y la luz.",
              "**Luz general**: Aputure 300D con softbox."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "La cortina debía moverse con el viento y esa noche no soplaba. Hilos y cartones no funcionaron; un soplador de hojas dio el viento dosificable, y hilos finos movían la silueta al compás."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Un plano muy parecido al original con unos 100 € de material."
          }
        ]
      }
    ]
  },
  "recreacion-star-wars-luke-vader": {
    "tarjeta": "El duelo de Luke y Vader en la Ciudad Nube, para el 45.º aniversario de *El Imperio Contraataca*: maqueta, siluetas y sables fotograma a fotograma.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Idea, dirección, fotografía y postproducción míos, con medios caseros."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Maqueta en miniatura**, como las películas originales.",
              "**Muchas pruebas de diafragma e ISO** hasta exponer y enfocar bien algo tan pequeño.",
              "**Siluetas al aire libre** contra una pared blanca, tras fallar en interior.",
              "**Sables y personajes** añadidos fotograma a fotograma."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Espacio y luz: dar a una maqueta pequeña la profundidad de un set real."
          }
        ]
      }
    ]
  },
  "recreacion-star-wars-sin-cgi": {
    "tarjeta": "Luke en la Ciudad de las Nubes sin CGI: pilares de alfombra, tuberías de ferretería y fondo de papel perforado.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Llevo una década haciendo contenido de Star Wars. Aquí recreé el plano más icónico de Luke solo con recursos físicos: dirección, fotografía, atrezo y postproducción."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pilares** de alfombra enrollada forrada de goma EVA; **tuberías** de fontanería.",
              "**Luces de fondo** con papel gris perforado y desenfoque que convierte los agujeros en halos.",
              "**Luz**: LED magnético para el contraluz, modificador concentrado para sombras duras y negativo en el suelo.",
              "**Óptica**: repetí el rodaje entero al pasar de 85 a 55 mm."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "La perspectiva: con el 85 mm las proporciones no eran las del original."
          }
        ]
      }
    ]
  },
  "reels-redes-sociales": {
    "tarjeta": "Reels y shorts verticales para Disney, el Consell Valencià de la Joventut y creadores de YouTube.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Más de nueve años haciendo contenido para redes. Un vídeo vertical se juega la atención en tres segundos, y cada cliente necesita sonar distinto."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Gancho** en los tres primeros segundos.",
              "**Sin tiempos muertos**: cortes a la música, zooms digitales y diseño sonoro.",
              "**Cada cliente, su tono**: cambio luz, color, subtítulos y ritmo (frescura, magia o claridad)."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Cambiar de registro entre clientes sin perder el ritmo de cada plataforma."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Cientos de miles de visualizaciones entre todas las piezas."
          }
        ]
      }
    ]
  },
  "sin-piedad": {
    "tarjeta": "Corto de Ángela Manzano sobre el abuso laboral. Hice la fotografía, casi toda sobre un ciclorama blanco. En preparación para festivales.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Un hombre machacado en su trabajo decide secuestrar a su jefa. Se cuenta desde su cabeza, con tono onírico."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Un ciclorama, muchos lugares**: cada espacio lo crea la luz.",
              "**Oficina como limbo**: luz uniforme y fría sobre el blanco.",
              "**Prisión mental**: sombras duras de persiana y tonos azulados, sin paredes.",
              "**Secuestro**: contraluz intenso, como un halo teatral."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que un solo espacio blanco pareciera varios lugares con carga emocional distinta."
          }
        ]
      }
    ]
  },
  "sin-tiempo-peiko": {
    "tarjeta": "Videoclip narrativo de Peiko, proyecto de estudios. Lo dirigí y lo fotografié: dos casas opuestas y una celda.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Una canción sobre el paso del tiempo y la distancia entre el éxito y el fracaso, contada con una historia dramática. Rodado con Canon C200 y un 50 mm fijo."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Casa moderna frente a casa podrida**: dos atmósferas opuestas que muestran la fractura del personaje.",
              "**Cámara y óptica planificadas desde la canción**, al servicio del arco del personaje.",
              "**Final en una celda**, con luz más fría y Peiko cantando agarrado a los barrotes."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que la caída se viera en la imagen y no solo en la letra."
          }
        ]
      }
    ]
  },
  "y-el-ano-que-viene-que": {
    "tarjeta": "Mi corto para el ESCAC Dreammakers Contest 2024 de Cupra: lo escribí, dirigí, fotografié, monté y protagonicé. Podio.",
    "secciones": [
      {
        "titulo": "El proyecto",
        "bloques": [
          {
            "t": "p",
            "x": "Tres palabras obligatorias (*Ojo*, *Cine* y *Barcelona*) y un mes para hacer un corto. Las uní con mi relación con el cine, en un relato autobiográfico con voz en off. Me ayudaron Adrià Mira Lozano y Lara Ruiz Martín."
          }
        ]
      },
      {
        "titulo": "Decisiones clave",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Voz en off escrita antes que nada**, con *Amélie* de referencia: cálida y cercana.",
              "**Montaje acelerado contra una voz tranquila**: ese contraste da la energía.",
              "**Encuadres planificados a la vez que voz y montaje**, porque en un corto así las tres cosas se deciden juntas."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Unos 15 días reales para idear, rodar, montar y entregar. Me quedé solo con lo que contaba la historia."
          }
        ]
      },
      {
        "titulo": "Resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Podio del concurso.",
              "Beca de la ESCAC como puerta abierta."
            ]
          }
        ]
      }
    ]
  }
};
