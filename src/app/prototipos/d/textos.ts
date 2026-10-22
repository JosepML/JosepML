// Textos de los proyectos para la ficha del prototipo. Generado con scripts/textos-prototipo.mjs a partir de
// plan/contenido/proyectos/*.md (no editar a mano). Cuando exista la base de datos, esto sale de la tabla `proyectos`.
export type BloqueTexto = { t: "p"; x: string } | { t: "li"; x: string[] };
export type TextosProyecto = { tarjeta: string; secciones: { titulo: string; bloques: BloqueTexto[] }[] };

export const TEXTOS: Record<string, TextosProyecto> = {
  "100-baladas-arkano": {
    "tarjeta": "Videoclip de Arkano producido por JUNO Media. Lo dirigí, llevé la cámara y lo monté. Más de 17.000 visualizaciones en YouTube.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*100 Baladas* es una canción muy personal de Arkano, escrita junto a su pareja. El videoclip se estrenó el 14 de febrero, a propósito. La idea de partida era de Álex Gómez: Arkano y su pareja se van acercando a lo largo del tema. Mi trabajo fue convertir esa idea en un videoclip rodable y con ritmo."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Adapté la idea, dirigí el rodaje, operé la cámara y monté. En producción, Noelia Fluxà y Julie-Estel Soard, de JUNO Media."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La distancia como hilo:** la historia se cuenta con el espacio entre los dos. Plano a plano se acercan, hasta el final de la canción.",
              "**Montaje a la canción:** los cortes siguen los cambios del tema, no un ritmo fijo.",
              "**Cámara:** Sony FX3 con ópticas Tamron."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Dirigir una idea que no era mía. Había que respetar lo que Álex había imaginado y, a la vez, ajustarlo a la duración y al ritmo de un videoclip."
          }
        ]
      },
      {
        "titulo": "El resultado",
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
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "He grabado muchas bodas, siempre con muy buenas valoraciones. No hago el vídeo largo y lineal de siempre: la película principal es un tráiler documental de unos 20 minutos, ágil, que apetece volver a ver."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Cubro el día entero y monto la película."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Discreción:** busco que los novios se olviden de la cámara. Los mejores momentos salen así.",
              "**Tráiler documental:** montaje ágil en lugar de una crónica de principio a fin.",
              "**Música a medida:** elijo los temas con la pareja y ajusto cada transición al ritmo de las imágenes.",
              "**Cámara:** Sony FX3 con ópticas Tamron y Sony."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en los momentos que no se repiten sin que se note que estoy."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Si quieres ver una boda completa, escríbeme y te enseño referencias."
          }
        ]
      }
    ]
  },
  "conciertos": {
    "tarjeta": "Aftermovies de conciertos y orquestas para Tamilah y Fluxà, Mapache Events, Orquesta Azara y Miami Show. Grabo y monto a partir de la música.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Un aftermovie tiene que contar un directo en pocos minutos: el espectáculo, la entrega de los artistas y el público. Aquí hay tres (Miami Show, Flama y Legends) y un vídeo del proceso."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Grabación y montaje. Soy músico, y monto leyendo la estructura de las canciones: ritmos, acentos y cambios."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Primero el audio:** antes de tocar la imagen hago un mix con los temas más potentes y cambios de tempo. Ese mix es el esqueleto del vídeo.",
              "**Grabo pensando en el montaje:** pregunto a los artistas por los momentos fuertes del repertorio, cubro muchos encuadres y me aseguro de tener el playback para que labios e instrumentos cuadren.",
              "**Estructura:** lo más rompedor al principio y lo más espectacular al cierre.",
              "**Sonido:** efectos y ambiente del público para que se sienta la primera fila.",
              "**Cámara:** Sony FX3 con ópticas Tamron y Sony."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que el aftermovie tenga ritmo y cuente el concierto, en lugar de ser una lista de clips bonitos."
          }
        ]
      }
    ]
  },
  "el-cirujano": {
    "tarjeta": "Thriller de Kevin Ramos y Emilio Graña (Impulsos Creativos). Hice la dirección de fotografía, premiada como mejor fotografía en el On Duty International Film Festival.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Silvia, inspectora de policía, busca a un asesino en serie que convierte a sus víctimas en obras de arte. Las pistas apuntan a Gabriel, su compañero y su amante."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección de fotografía. Propuse dejar el naturalismo a un lado: la luz y el color cuentan lo que pasa dentro de la cabeza del asesino."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dos mundos de luz:** la investigación de Silvia, fría y analítica; los espacios del asesino, con otra lógica. El contraste marca la doble vida de los personajes.",
              "**Luz sin fuente:** en las escenas de los crímenes la luz no sale de una lámpara ni de una ventana. Es como si saliera de su mente.",
              "**Rojo:** en las escenas más oscuras, un rojo intenso que anuncia el peligro.",
              "**Cámara:** Sony FX3 con ópticas Tamron."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que la parte policial siguiera siendo creíble mientras la de los crímenes se vuelve casi sobrenatural. Los separé con luz y color, sin bajar la tensión del thriller."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Premio a mejor fotografía en el On Duty International Film Festival."
          }
        ]
      }
    ]
  },
  "el-viajero": {
    "tarjeta": "Corto de ciencia ficción en los años 50, mi proyecto final del ciclo de Realización. Idea, guion, dirección y fotografía, con un equipo de cuatro personas. Más de 22.000 visualizaciones en YouTube.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Pedro, un relojero obsesivo de los años 50, construye una máquina del tiempo. Altera el futuro, le sale mal, y su yo del futuro vuelve para advertirle."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Idea original, guion, dirección y dirección de fotografía."
          },
          {
            "t": "p",
            "x": "Equipo: Alba Gisbert (ayudante de dirección), Sebastian Alonso Pérez, Mar Garrido y Lara Ruiz Martín (actores) y Andreu Pastor (sonido). Música original de David Bellido y Jesús Jiménez."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Los 50 sin presupuesto:** un apartamento antiguo y atrezo sacado de casas de familiares, como un teléfono de mesa y una radio.",
              "**La máquina, hecha a mano:** la construimos desde cero, con manivela que funciona, engranajes y tuberías.",
              "**La bombilla como luz principal:** en las escenas de la máquina, clave baja con la bombilla de la propia máquina como fuente. Es creíble y sube la tensión.",
              "**Música:** inspirada en Ludwig Göransson (*Oppenheimer*), con un \"clic de reloj\" que recorre todo el corto.",
              "**Cámara:** Canon C200 con un 50 mm fijo."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Hacer creíble una máquina del tiempo sin dinero. Por eso la construimos con piezas que funcionan: el actor la toca y responde en el plano."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Más de 22.000 visualizaciones en YouTube.",
              "Final abierto, con la puerta a una secuela que me gustaría rodar."
            ]
          }
        ]
      }
    ]
  },
  "ep-oscuridad-adrian-munoz": {
    "tarjeta": "Siete visualizers y un tráiler para el EP de Adrián Muñoz, producidos por JUNO Media. Hice la dirección de fotografía. Más de 1,39 millones de visualizaciones.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*Oscuridad* es un EP conceptual sobre una pareja que se rompe: el enfado, la soledad, la ruptura, las cicatrices y, al final, la resignación de \"K le den a Cupido\". Cada canción tiene su visualizer."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección de fotografía de los siete vídeos y del tráiler. Tenían que funcionar por separado y, vistos seguidos, contar una caída."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pantalla partida:** a un lado, el artista cantando; al otro, bucles con la historia de la pareja. Encuadré e iluminé las dos mitades para que se leyeran juntas sin saturar.",
              "**De color a blanco y negro:** el primer tema va en color y cada uno de los siguientes, más desaturado, hasta el blanco y negro del séptimo.",
              "**Una luz por emoción:** cada bucle tiene su esquema (soledad, cicatrices…), siempre con contraste cuidado y atmósfera densa.",
              "**Cámara:** Sony FX3 con ópticas Tamron y Sony."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Siete vídeos que se ven sueltos en redes y tienen que funcionar solos, pero que juntos forman un solo arco. El paso del color al blanco y negro resuelve las dos cosas."
          }
        ]
      },
      {
        "titulo": "El resultado",
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
    "tarjeta": "Cobertura de ciclismo de élite, como la Shimano Super Cup Massi en La Nucía, para Ocisport. Grabo y monto piezas para redes y para televisión.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "En una carrera, la acción pasa una sola vez y muy rápido. Mi trabajo es captar la velocidad y el esfuerzo sin estorbar a los corredores."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Grabación a pie de pista y montaje."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Elegir sitio:** me coloco en los puntos más espectaculares del circuito, donde la carrera da más.",
              "**Cámara rápida y cerrada:** seguimiento preciso y encuadres cerrados para que se note la velocidad.",
              "**Un pack de piezas:** reels y clips cortos para redes, y piezas largas con calidad de emisión para televisión.",
              "**Sonido:** cortes sobre una base musical fuerte y el ambiente realzado: ruedas, esfuerzo, público.",
              "**Cámara:** Sony FX3 con ópticas Tamron y Sony."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en el sitio justo en el momento justo y, después, condensar la carrera sin perder la tensión."
          }
        ]
      }
    ]
  },
  "expandete-spot-juno-media": {
    "tarjeta": "Spot narrativo para JUNO Media. Escribí el guion, hice el casting y las localizaciones, lo dirigí y lo monté. Pieza de muestra, no comercializada.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "JUNO Media quería un spot que contara su lema, \"cine para sanar\", sin que pareciera un anuncio. Escribí una fábula: Juno, una niña con ideas infinitas (la productora), ayuda a su vecino, un adulto bloqueado (el cliente), a liberar las suyas."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección, producción y postproducción: guion, casting, localizaciones y montaje. La fotografía fue de Juanfran Jiménez, con quien preparé el rodaje."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**El anuncio se descubre al final:** tres actos y, hasta el giro final, nadie sabe que es publicidad. Ahí aparecen las fundadoras reales, Noelia Fluxà y Julie-Estel Soard.",
              "**Dos casas frente a frente:** la habitación de la niña y el estudio del adulto se ven a través de una ventana. Esa línea de mirada sostiene la relación entre los dos.",
              "**Casting:** Amaia Miranda, actriz infantil con experiencia, para rodar rápido sin perder naturalidad; y las fundadoras haciendo de sí mismas.",
              "**Cámara:** Blackmagic Pocket Cinema Camera 6K Pro."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Las localizaciones. La historia solo funcionaba con dos viviendas enfrentadas cuyas ventanas se vieran entre sí."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "No se llegó a comercializar. Lo enseño como muestra de cómo escribo y dirijo una pieza para una marca."
          }
        ]
      }
    ]
  },
  "kiboko": {
    "tarjeta": "Docuficción de Noelia Fluxá y Julie-Estel Soard (JUNO Media) sobre el bar Kiboko de La Vila Joiosa en los 80. La monté yo. Estreno con aforo completo en junio de 2026.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "El Kiboko fue un refugio de libertad, música y vanguardia en La Vila Joiosa de los años 80. La película lo cuenta a través de Ana, una cronista ficticia que hoy investiga su historia."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Montaje. Tenía que unir tres materiales en un solo relato: entrevistas reales a quienes vivieron el Kiboko, escenas de ficción recreadas y la voz en off de Ana. El material se rodó en ARRI."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Orden antes que ritmo:** con horas de entrevistas, lo primero fue sincronizar, cribar y estructurar todo con un flujo de trabajo muy ordenado.",
              "**Testimonio y ficción en diálogo:** las entrevistas responden a lo que Ana investiga, para que el salto entre realidad y ficción no se note.",
              "**Dos ritmos:** las escenas del bar en 1986, rápidas y apoyadas en la banda sonora; las entrevistas, pausadas."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Pasar del testimonio documental a la ficción sin perder la emoción ni el hilo."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Estreno con aforo completo en el Teatre Auditori de La Vila Joiosa, el 6 de junio de 2026.",
              "Selección en festivales y nominación a mejor montaje."
            ]
          }
        ]
      }
    ]
  },
  "no-se-esta-tan-mal-lovva": {
    "tarjeta": "Videoclip de Lovva dirigido por Ángela Manzano. Hice la fotografía y el montaje: siete sets, cada uno con su propia luz.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*No se está tan mal* habla de aceptarse a uno mismo. La directora quería una \"burbuja\": un espacio protegido donde el artista pudiera mostrarse vulnerable sin perder fuerza."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección de fotografía y montaje. Primero diseñé la luz de cada set; después, en montaje, uní los siete en un solo recorrido."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Luz puntual, no plana:** contraluces marcados, destellos suaves y puntos de luz concretos que envuelven al artista.",
              "**Cristal y agua:** reflejos y refracciones para dar textura a la imagen.",
              "**Siete sets, siete esquemas:** construimos y rodamos siete escenarios, cada uno con su propio esquema de luz.",
              "**Montaje:** al saltar de un set a otro mantengo el ritmo del videoclip sin romper la atmósfera.",
              "**Cámara:** Sony FX3 con ópticas Tamron."
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
    "tarjeta": "El plano de Vito Corleone en su despacho, con la luz de Gordon Willis, en un sótano y con la rejilla de una estufa de butano como ventana.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Quise estudiar cómo ilumina Gordon Willis recreando el plano más conocido de Vito Corleone. Construí el set desde cero en un sótano."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección y dirección de fotografía: desglose del plano original, construcción del set, iluminación y color."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La ventana:** la rejilla de una estufa de butano, con cinta negra para ensanchar las lamas, papel de horno como difusor y paneles LED detrás.",
              "**Los ojos en sombra:** una Aputure 300d II con softbox, cenital y muy picada, y un negativo en el suelo para que no rebote luz.",
              "**Temperatura:** la fuente era fría; llevé la cámara hacia cálido y compensé el fondo con geles fríos.",
              "**Separación:** una luz propia para la planta del fondo, para que el personaje no se empaste con el negro.",
              "**Color:** soy daltónico, así que etalonné en DaVinci Resolve comparando con el fotograma original: pieles, densidad de las sombras y hasta el color de la pajarita."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Recrear la luz de una ventana que no existía, y un color que no puedo ver como los demás."
          }
        ]
      }
    ]
  },
  "recreacion-nosferatu": {
    "tarjeta": "Una escena de *Nosferatu* recreada con Comboi Films usando cartón, una rampa de madera y un soplador de hojas.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "En mi canal recreo planos de cine con muy pocos medios. Aquí, la sombra del vampiro en la ventana y la protagonista que levita."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección y coordinación general: planifiqué cada toma y coordiné el equipo junto a Comboi Films."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La sombra:** silueta y mano de Nosferatu en cartón y cinta, escaladas para que la sombra encajara en la ventana. Un spotlight, a distancia y ángulo medidos, la proyecta nítida sobre la cortina.",
              "**Luz general:** Aputure 300D con softbox.",
              "**La levitación:** una rampa de madera bajo la actriz, que mantiene el cuerpo tenso. El ángulo de cámara y la luz esconden la rampa.",
              "**Arte:** cuadros del lugar parecidos a los de la escena original."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "La cortina tenía que moverse con el viento y esa noche no soplaba nada. Con hilos y cartones el movimiento se veía falso. Lo resolvimos con un soplador de hojas, que dejaba dosificar el \"viento\", y con hilos finos que movían la silueta al compás de la cortina."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Un plano muy parecido al original, con unos 100 € de material."
          }
        ]
      }
    ]
  },
  "recreacion-star-wars-luke-vader": {
    "tarjeta": "El duelo de Luke y Vader en la Ciudad Nube, recreado para el 45.º aniversario de *El Imperio Contraataca* con una maqueta, siluetas y sables añadidos fotograma a fotograma.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Por el aniversario quise recrear el enfrentamiento final entre Luke y Vader con medios caseros."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Idea, dirección, fotografía y postproducción."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Maqueta:** como en la película original, el escenario es una miniatura.",
              "**Exponer algo tan pequeño:** iluminar y enfocar la maqueta exigió muchas pruebas de diafragma e ISO hasta que todo se leía bien.",
              "**Siluetas:** en interior no funcionaban; las rodé al aire libre contra una pared blanca.",
              "**Postproducción:** personajes superpuestos sobre la maqueta y sables añadidos fotograma a fotograma."
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
    "tarjeta": "Luke en la Ciudad de las Nubes sin CGI: pilares de alfombra, tuberías de ferretería y un fondo de papel perforado. Repetí el rodaje entero al cambiar del 85 al 55 mm.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Llevo una década haciendo contenido de Star Wars. Aquí recreé el plano más icónico de Luke en la Ciudad de las Nubes solo con recursos físicos."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección y dirección de fotografía: desglose del plano de 1980, atrezo, luz y postproducción."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pilares:** una alfombra enrollada y forrada de goma EVA.",
              "**Tuberías:** tubos de fontanería y ferretería, con estanterías para las estructuras de arriba.",
              "**Las luces de fondo:** papel gris perforado a mano con un fondo blanco iluminado detrás. El desenfoque de la lente convierte los agujeros en los halos del original.",
              "**Luz:** un LED magnético pequeño para el contraluz de las tuberías, un modificador concentrado para las sombras duras de Luke y un negativo en el suelo para mantener los negros."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "La perspectiva. Con un 85 mm las proporciones no eran las del original. Repetí el rodaje con un 55 mm y reencuadré todo el set."
          }
        ]
      }
    ]
  },
  "reels-redes-sociales": {
    "tarjeta": "Reels y shorts verticales para Disney, el Consell Valencià de la Joventut y creadores de YouTube. Grabo y monto para que funcionen en el móvil.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Llevo más de nueve años haciendo contenido para redes. Un vídeo vertical se juega la atención en los tres primeros segundos, y cada cliente necesita sonar distinto."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Grabación y edición de contenido vertical."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Gancho:** lo más potente va en los tres primeros segundos.",
              "**Sin tiempos muertos:** cortes a la música, zooms digitales y diseño sonoro.",
              "**Cada cliente, su tono:** cambio la luz, el color, la tipografía de los subtítulos y el ritmo. Frescura para un creador, magia para una marca de entretenimiento, claridad para una entidad pública."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Cambiar de registro de un cliente a otro sin perder el ritmo de cada plataforma."
          }
        ]
      },
      {
        "titulo": "El resultado",
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
    "tarjeta": "Corto de Ángela Manzano sobre el abuso laboral. Hice la dirección de fotografía, casi todo sobre un ciclorama blanco. En preparación para festivales.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Un hombre machacado por su trabajo decide secuestrar a su jefa. La película lo cuenta desde dentro de su cabeza, con un tono onírico."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección de fotografía: traducir su estado mental a luz y composición."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Un ciclorama, muchos lugares:** gran parte se rodó sobre un ciclorama blanco. Cada espacio lo crea la luz.",
              "**Recuerdos de la oficina:** luz uniforme y fría sobre el blanco. Un limbo estéril.",
              "**Prisión mental:** sombras duras de persiana y tonos azulados, sin necesidad de paredes.",
              "**Confrontación con la jefa:** prácticas cálidas que fingen normalidad, con sombras profundas sobre él.",
              "**Secuestro:** contraluz intenso que crea un halo teatral."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que un solo espacio blanco pareciera varios lugares, cada uno con su carga emocional."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Aún no es público: se prepara para festivales nacionales e internacionales. Por eso aquí solo hay fotogramas."
          }
        ]
      }
    ]
  },
  "sin-tiempo-peiko": {
    "tarjeta": "Videoclip narrativo de Peiko, proyecto de estudios. Lo dirigí y lo fotografié: dos casas opuestas y una celda.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*Sin Tiempo* habla del paso del tiempo, de las consecuencias de los actos y de la distancia entre el éxito y el fracaso. El videoclip mezcla la actuación de Peiko con una historia dramática."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Dirección y dirección de fotografía. Pasé la canción a un plan de rodaje en el que cada movimiento de cámara y cada óptica acompañan el arco del personaje."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Casa Moderna y Casa Podrida:** dos espacios con atmósferas opuestas, el éxito y la ruina, que muestran la fractura del personaje.",
              "**Final en la celda:** el vídeo sale de las casas y termina con una luz más fría, con Peiko cantando agarrado a los barrotes.",
              "**Cámara:** Canon C200 con un 50 mm fijo."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que la caída del personaje se viera en la imagen y no solo en la letra."
          }
        ]
      }
    ]
  },
  "y-el-ano-que-viene-que": {
    "tarjeta": "Mi corto para el ESCAC Dreammakers Contest 2024 de Cupra: guion, dirección, fotografía, montaje y actuación. Quedó en el podio.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "El concurso daba 30 días para hacer un corto con tres palabras obligatorias: *Ojo*, *Cine* y *Barcelona*. Las uní con lo único que de verdad las une para mí: mi relación con el cine. Es un corto autobiográfico, contado en voz en off."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Lo escribí, lo dirigí, lo fotografié, lo monté y salgo en él. Me ayudaron Adrià Mira Lozano y Lara Ruiz Martín."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La voz en off, primero:** escribí la narración antes que nada, con *Amélie* como referencia: una voz cálida que cuenta desde dentro del personaje.",
              "**Montaje rápido contra voz tranquila:** el contraste entre el ritmo acelerado de la imagen y la calma de la voz es lo que da energía al corto.",
              "**Cámara:** Sony FX3 con ópticas Tamron."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "El tiempo. Entre idear, rodar, montar y entregar tuve unos 15 días. Lo resolví quedándome solo con lo que contaba la historia y descartando lo accesorio."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Podio del ESCAC Dreammakers Contest 2024.",
              "El premio me abrió la puerta a becas de la ESCAC."
            ]
          }
        ]
      }
    ]
  }
};
