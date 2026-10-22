// Textos de los proyectos para la ficha del prototipo. Generado a partir de plan/contenido/proyectos/*.md
// (borrador pendiente de visto bueno de Josep). Cuando exista la base de datos, esto sale de la tabla `proyectos`.
export type BloqueTexto = { t: "p"; x: string } | { t: "li"; x: string[] };
export type TextosProyecto = { tarjeta: string; secciones: { titulo: string; bloques: BloqueTexto[] }[] };

export const TEXTOS: Record<string, TextosProyecto> = {
  "100-baladas-arkano": {
    "tarjeta": "Videoclip de Arkano, producido por JUNO Media y estrenado el 14 de febrero. Más de 17.000 visualizaciones en YouTube.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*100 Baladas* es un single muy personal de Arkano, escrito junto a su pareja. El videoclip se lanzó el 14 de febrero, a propósito. La idea original era de Álex Gómez, y yo la adapté al formato y al ritmo de un videoclip. En pantalla vemos a Arkano y a su pareja acercándose cada vez más."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Adaptación audiovisual** de la idea de Álex Gómez.",
              "**Dirección** y supervisión artística y técnica.",
              "**Operación de cámara.**",
              "**Montaje.**"
            ]
          },
          {
            "t": "p",
            "x": "Producción: JUNO Media, con Noelia Fluxà y Julie-Estel Soard en el rodaje."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Ritmo:** el montaje sigue los cambios de la canción.",
              "**Narrativa visual:** la distancia entre los dos se va cerrando plano a plano, hasta el final del tema."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Partir de una idea ya escrita por otra persona y traducirla a un formato distinto sin perder lo que la hacía especial."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Más de 17.000 visualizaciones en YouTube.",
              "Mi primer videoclip para un artista de la talla de Arkano."
            ]
          }
        ]
      }
    ]
  },
  "bodas": {
    "tarjeta": "Bodas montadas como un tráiler documental de unos 20 minutos, con música elegida con cada pareja. Solo fotogramas.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "He grabado muchas bodas. En lugar del vídeo convencional, trabajo con una película principal en formato \"tráiler documental\" de unos 20 minutos."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Cobertura completa** del día.",
              "**Edición.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Cobertura discreta:** el objetivo es que los novios se olviden de la cámara, para captar momentos reales.",
              "**Tráiler documental:** montaje ágil y dinámico, pensado para verse varias veces.",
              "**Música:** selección musical a medida de la pareja, con cada transición ajustada al ritmo de las imágenes."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en los momentos que no se repiten sin molestar."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Una película por boda, con música elegida con la pareja. Esta ficha muestra solo fotogramas, por respeto a la intimidad de los novios. Si quieres ver referencias, escríbeme y te las enseño."
          }
        ]
      }
    ]
  },
  "conciertos": {
    "tarjeta": "Aftermovies de conciertos y orquestas: montaje al ritmo de la música, con un mix musical como base.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Aftermovies de conciertos y actuaciones de orquestas de pueblo. El objetivo es contar el directo en formato corto: el espectáculo, la entrega de los artistas y el ambiente del público. Piezas de muestra: Miami Show, Flama y Legends, más un vídeo del proceso."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Grabación.**",
              "**Montaje.**"
            ]
          },
          {
            "t": "p",
            "x": "Mi formación musical me permite montar a partir de la estructura de las canciones: ritmos, acentos y cambios."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Primero el mix musical:** selecciono los temas más potentes y construyo un ritmo continuo, con cambios de tempo.",
              "**Grabación pensada para el montaje:** hablo con los artistas para conocer los momentos fuertes y grabo muchos encuadres y el playback.",
              "**Estructura:** lo más rompedor al principio y lo más espectacular al cierre.",
              "**Sonido:** efectos y ambiente del público para que se sienta como estar en primera fila."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que el aftermovie transmita la energía del concierto y no sea una lista de clips."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Tres piezas de muestra y un vídeo del proceso. Clientes: Tamilah y Fluxà (Agüita de Coco y Flama), Mapache Events, Orquesta Azara y Miami Show."
          }
        ]
      }
    ]
  },
  "el-cirujano": {
    "tarjeta": "Cortometraje de thriller. Premio a mejor fotografía en el On Duty International Film Festival.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Silvia, inspectora de policía, persigue a un asesino en serie que convierte a sus víctimas en obras de arte. Las pistas apuntan a su compañero y amante, Gabriel. Lo crearon Kevin Ramos y Emilio Graña (Impulsos Creativos)."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "**Dirección de fotografía.** Me alejé del naturalismo y fui a una imagen simbólica, donde luz y color representan la mente del asesino."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Rojo:** en las escenas más oscuras, un rojo intenso como metáfora del peligro.",
              "**Luz sin fuente:** en los espacios del asesino la luz no viene de lámparas ni ventanas, sino de su mente.",
              "**Contraste:** la investigación de Silvia se fotografía fría y analítica, para marcar la doble vida de los personajes."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Equilibrar el mundo casi sobrenatural de los crímenes con la realidad fría de la investigación, sin que se rompa la tensión."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Mejor fotografía, On Duty International Film Festival.",
              "Mi trabajo de luz más reconocible."
            ]
          }
        ]
      }
    ]
  },
  "el-viajero": {
    "tarjeta": "Corto de ciencia ficción en los años 50, hecho con cuatro personas como proyecto final de ciclo. Más de 22.000 visualizaciones en YouTube.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Pedro es un relojero obsesivo de los años 50 que construye una máquina del tiempo. El futuro que altera le sale mal, y su yo del futuro viaja al pasado para advertirle. Lo rodamos como proyecto final del ciclo superior de Realización, con un equipo de cuatro personas y casi sin presupuesto."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Idea original y guion.**",
              "**Dirección.**",
              "**Dirección de fotografía.**"
            ]
          },
          {
            "t": "p",
            "x": "Equipo: Alba Gisbert (ayudante de dirección), Sebastian Alonso Pérez, Mar Garrido y Lara Ruiz Martín (actores), Andreu Pastor (sonido). Música original de David Bellido y Jesús Jiménez."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Época:** rodamos en un apartamento antiguo, con atrezo de casas de familiares (un teléfono de mesa, una radio).",
              "**Luz:** clave baja en las escenas de la máquina. La bombilla de la propia máquina es la luz principal.",
              "**La máquina:** la construimos desde cero, con manivela funcional, engranajes y tuberías. El actor interactúa con ellas de verdad.",
              "**Música:** inspirada en Ludwig Göransson (*Oppenheimer*), con un motivo de \"clic de reloj\" que recorre todo el corto."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "El presupuesto. Cada solución tuvo que salir del ingenio, y la máquina del tiempo fue la más difícil."
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
              "Final abierto, con la puerta a una posible secuela."
            ]
          }
        ]
      }
    ]
  },
  "ep-oscuridad-adrian-munoz": {
    "tarjeta": "7 visualizers y un tráiler para el EP de Adrián Muñoz, con un arco de color que pasa de color a blanco y negro. 1.392.400 visualizaciones.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*Oscuridad* es un EP conceptual de Adrián Muñoz sobre el amor y el desamor de una pareja. Cada una de las siete canciones tiene su visualizer, más un tráiler, todo dirigido y producido por JUNO Media. Los temas recorren el enfado, la soledad, la ruptura, las cicatrices y la resignación de \"K le den a Cupido\"."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "**Dirección de fotografía.** Un arco de imagen que uniera los siete vídeos."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pantalla partida:** un lado, el artista interpretando; el otro, bucles narrativos de la pareja. Hubo que planificar encuadre y luz para que las dos mitades convivieran sin saturar.",
              "**Arco de color:** la primera canción en color y, tema a tema, menos saturación, hasta llegar a blanco y negro en la séptima.",
              "**Luz por canción:** esquemas de iluminación adaptados a cada bucle (soledad, cicatrices…), con contraste cuidado y atmósferas densas."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que cada visualizer funcionara solo y, a la vez, todos formaran un único descenso."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "1.392.400 visualizaciones en total, en YouTube, Instagram y Spotify."
            ]
          }
        ]
      }
    ]
  },
  "eventos-deportivos": {
    "tarjeta": "Cobertura de carreras como la Shimano Super Cup Massi (La Nucía), con piezas para televisión y para redes.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Cobertura de pruebas de ciclismo de élite, como la Shimano Super Cup Massi, en La Nucía. Clientes citados: Ocisport y la propia Shimano Super Cup Massi. El reto es captar la velocidad y el esfuerzo sin interferir en la carrera."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Grabación** a pie de pista.",
              "**Edición.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Posición:** me coloco en los puntos más espectaculares del circuito.",
              "**Cámara:** movimientos rápidos, seguimiento preciso y encuadres cerrados para transmitir la velocidad.",
              "**Entregables:** reels y clips cortos para redes y piezas más largas, con calidad de emisión, para televisión.",
              "**Montaje:** cortes sincronizados con una base musical fuerte, reforzando el sonido ambiente (ruedas, esfuerzo, público)."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Estar en el sitio correcto en el momento justo y mantener la tensión al condensar la carrera."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Un pack de piezas en varios formatos, del clip de redes a la pieza para televisión."
          }
        ]
      }
    ]
  },
  "expandete-spot-juno-media": {
    "tarjeta": "Primer spot para JUNO Media, con guion, casting y localizaciones míos. No se ha comercializado.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "El objetivo era transmitir la filosofía de JUNO Media, \"cine para sanar\", en un spot narrativo y emotivo. La historia: Juno, una niña con ideas infinitas (la esencia de la productora), y su vecino, un adulto con bloqueo creativo (el cliente). JUNO Media le ayuda a desbloquearlas."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección y producción.**",
              "**Guion, casting y búsqueda de localizaciones.**",
              "**Montaje y postproducción.**"
            ]
          },
          {
            "t": "p",
            "x": "Dirección de fotografía: Juanfran Jiménez, con quien coordiné el rodaje."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Estructura:** tres actos. El espectador no sabe que es publicidad hasta el giro final, donde aparecen las fundadoras, Noelia Fluxà y Julie-Estel Soard.",
              "**Localizaciones:** dos viviendas enfrentadas, con la habitación de la niña y el estudio del adulto conectados por una ventana.",
              "**Casting:** la actriz infantil Amaia Miranda, por su experiencia en rodajes intensivos, y las fundadoras reales de la marca."
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
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "El spot no se ha comercializado. Queda aquí como muestra de dirección, producción y narrativa para marcas."
          }
        ]
      }
    ]
  },
  "kiboko": {
    "tarjeta": "Documental híbrido sobre el bar Kiboko (La Vila Joiosa, años 80). Yo hice el montaje. Estreno con aforo completo en junio de 2026.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*Kiboko* es una docuficción dirigida y producida por Noelia Fluxá y Julie-Estel Soard (JUNO Media). Cuenta la historia del bar Kiboko, un refugio de libertad, música y vanguardia en La Vila Joiosa en los años 80. Lo hace a través de Ana, una cronista ficticia que investiga el local hoy."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "**Montaje.** Tenía que combinar tres materiales en un solo relato:"
          },
          {
            "t": "li",
            "x": [
              "Entrevistas reales a quienes vivieron el Kiboko.",
              "Escenas de ficción recreadas.",
              "La voz en off de la protagonista."
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Equilibrio realidad/ficción:** los testimonios dialogan con la trama de la cronista sin que el relato pierda el foco.",
              "**Volumen de material:** sincronizar, cribar y estructurar horas de entrevistas junto a la ficción y la música, con un flujo de trabajo muy ordenado.",
              "**Ritmo:** las escenas del bar (1986) llevan un montaje vibrante apoyado en la banda sonora. Las entrevistas, un ritmo más pausado."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Pasar del testimonio documental a la ficción sin que se note el salto ni se pierda la emoción."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "li",
            "x": [
              "Estreno con aforo completo en el Teatre Auditori de La Vila Joiosa (6 de junio de 2026).",
              "Selecciones en festivales y nominación a mejor montaje."
            ]
          }
        ]
      }
    ]
  },
  "no-se-esta-tan-mal-lovva": {
    "tarjeta": "Videoclip de Lovva con 7 sets distintos, cada uno con su luz, unidos en una sola atmósfera.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*No se está tan mal* es un videoclip para Lovva, dirigido por Ángela Manzano, sobre la aceptación personal y el amor propio. El concepto era una \"burbuja\" visual donde el artista pudiera mostrar sus emociones con honestidad."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección de fotografía.**",
              "**Edición.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Luz:** en lugar de luz plana, destellos suaves, contraluces marcados y puntos de luz concretos.",
              "**Texturas:** reflejos y refracciones en cristal y agua.",
              "**7 sets:** construimos y rodamos hasta siete escenarios, cada uno con un esquema de luz propio.",
              "**Montaje:** sincronicé los siete mundos para que el salto entre ellos mantuviera el ritmo de videoclip sin romper la atmósfera."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Mantener una misma emoción a lo largo de siete espacios distintos."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Un videoclip donde la intimidad se sostiene de principio a fin. Proyecto propio, sin productora."
          }
        ]
      }
    ]
  },
  "recreacion-el-padrino": {
    "tarjeta": "El plano de Vito Corleone en su despacho, con la ventana hecha con la rejilla de una estufa de butano.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Recreé el plano de Vito Corleone en su despacho para estudiar la luz de Gordon Willis. Construí el set desde cero."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección y dirección de fotografía.**",
              "**Desglose del plano original.**",
              "**Diseño y construcción del set.**",
              "**Postproducción y color.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**La ventana:** la rejilla de una estufa de butano, con cinta negra para ensanchar las rejillas y papel de horno como difusor, iluminada con paneles LED.",
              "**Luz de Vito:** una Aputure 300d II con softbox en cenital muy picado, y un negativo en el suelo para evitar rebotes.",
              "**Temperatura de color:** como la fuente era fría, ajusté la cámara hacia tonos cálidos y compensé el fondo con geles fríos.",
              "**Composición:** traje, rosa y sillón concretos, con una luz independiente para la planta del fondo que separa al personaje de la oscuridad.",
              "**Color:** soy daltónico, así que igualé tonos de piel y sombras con el fotograma original en DaVinci Resolve, incluido el color de la pajarita."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Replicar la luz de una ventana inexistente y el color de un plano mítico."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Una réplica fiel del plano, hecha con materiales caseros."
          }
        ]
      }
    ]
  },
  "recreacion-nosferatu": {
    "tarjeta": "Una escena de *Nosferatu* recreada con cartón, cinta y un soplador de hojas. Con Comboi Films.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Recreo planos de cine con pocos medios para demostrar que el ingenio vale más que el presupuesto. Aquí, una escena de *Nosferatu*: la sombra del vampiro y la protagonista levitando."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección y coordinación general.**",
              "**Planificación de cada toma.**"
            ]
          },
          {
            "t": "p",
            "x": "Con Comboi Films."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Arte:** cuadros parecidos a los de la escena original, y silueta y mano de Nosferatu hechas con cartón y cinta, escaladas para encajar en la ventana.",
              "**Levitación:** una rampa de madera bajo el cuerpo de la actriz, que mantiene el cuerpo tenso. El ángulo de cámara y la luz ocultan el truco.",
              "**Luz:** un Aputure 300D con softbox para la luz general y un spotlight a distancia y ángulo precisos para proyectar la silueta sobre la cortina."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "La cortina debía moverse con el viento, pero esa noche no había ni una ráfaga. Probamos hilos y cartones sin éxito. La solución fue un soplador de hojas, con control total de la intensidad. Además, hilos finos movían la silueta de Nosferatu en sincronía con la cortina."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Un plano muy parecido al original, hecho con cartón, cinta, una rampa y un soplador de hojas."
          }
        ]
      }
    ]
  },
  "recreacion-star-wars-luke-vader": {
    "tarjeta": "El duelo final de Luke y Vader en la Ciudad Nube, recreado con una maqueta, siluetas y sables añadidos fotograma a fotograma.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Para el 45.º aniversario de *El Imperio Contraataca* recreé el duelo final entre Luke Skywalker y Darth Vader en la Ciudad Nube, con medios caseros."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Idea.**",
              "**Dirección.**",
              "**Ejecución.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Maqueta:** un set en miniatura, como las películas originales.",
              "**Luz y foco:** ajustes de diafragma e ISO hasta que todos los elementos se veían bien.",
              "**Siluetas:** los primeros intentos fallaron; salí al exterior y usé una pared blanca de fondo.",
              "**Postproducción:** sables de luz añadidos fotograma a fotograma y personajes superpuestos al fondo de la maqueta."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "El espacio y la luz. Iluminar y enfocar una maqueta exige probar muchas veces."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Una recreación completa del duelo con maqueta, siluetas y sables añadidos fotograma a fotograma."
          }
        ]
      }
    ]
  },
  "recreacion-star-wars-sin-cgi": {
    "tarjeta": "Luke en la Ciudad de las Nubes sin un solo fotograma de CGI: alfombras, tuberías y papel perforado. Rodaje repetido por un cambio de lente.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Recreé el plano más icónico de Luke en la Ciudad de las Nubes, de *El Imperio Contraataca*, sin CGI, solo con recursos físicos."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección y dirección de fotografía.**",
              "**Desglose del plano original de 1980.**",
              "**Atrezo y postproducción.**"
            ]
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Pilares:** alfombra enrollada forrada de goma Eva.",
              "**Tuberías:** tubos de fontanería y ferretería, con estanterías para las estructuras superiores.",
              "**Fondo de luces de Bespin:** papel gris perforado a mano con un fondo blanco iluminado detrás. El desenfoque de la lente convierte los agujeros en los halos del original.",
              "**Luz:** una pequeña luz LED magnética para el contraluz de las tuberías, un modificador concentrado para las sombras duras de Luke y un negativo en el suelo para los negros.",
              "**Óptica:** repetimos el rodaje completo porque el 85 mm no respetaba las proporciones. Pasamos a un 55 mm y reencuadramos todo el set."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Reproducir la profundidad del plano con materiales de ferretería, y corregir la perspectiva tras cambiar de lente."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Una recreación con la atmósfera lumínica del original, sin CGI."
          }
        ]
      }
    ]
  },
  "reels-redes-sociales": {
    "tarjeta": "Reels verticales para Disney, el Consell Valencià de la Joventut y creadores de YouTube. Cientos de miles de visualizaciones entre todos.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Reels y shorts verticales para clientes muy distintos: creadores y YouTubers, marcas de entretenimiento como Disney y entidades como el Consell Valencià de la Joventut. Más de nueve años creando contenido digital, con cientos de miles de visualizaciones entre las piezas."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Grabación** de contenido vertical.",
              "**Edición.**"
            ]
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
              "**Ritmo:** cortes a tiempo con la música, zooms digitales y diseño sonoro.",
              "**Identidad del cliente:** cambio la luz, el etalonaje, la tipografía de los subtítulos y el tono según quien sea: frescura para un creador, magia para una marca de entretenimiento, claridad para una entidad."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Adaptarme a perfiles muy distintos sin perder el ritmo propio de cada plataforma."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Piezas de muestra en Instagram y YouTube Shorts: reel del Consell, publicidad para Disney, reels para creadores y reels cinematográficos."
          }
        ]
      }
    ]
  },
  "sin-piedad": {
    "tarjeta": "Cortometraje de Ángela Manzano sobre el abuso laboral. Rodado en ciclorama. En preparación para festivales.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "Un hombre marcado por el maltrato profesional decide secuestrar a su jefa. Dirigido por Ángela Manzano, el corto explora el trauma acumulado desde una mirada onírica."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "**Dirección de fotografía.** Traducir el estado mental del protagonista en luz y composición."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Luz intrusiva:** luces prácticas cálidas para simular normalidad, con sombras profundas sobre el protagonista.",
              "**Secuestro:** luz de fondo intensa que crea un halo teatral.",
              "**Ciclorama blanco:** convertimos un espacio neutro en varios escenarios solo con la luz.",
              "**Recuerdos del trabajo:** luz uniforme y fría sobre el fondo blanco.",
              "**Introspección:** sombras duras de persianas y tonos azulados para crear una \"prisión mental\"."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Hacer que un solo espacio blanco parezca varios lugares con una carga emocional distinta."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Preparado para el circuito de festivales nacionales e internacionales. De momento no es público, por eso esta ficha muestra solo fotogramas. Cuando exista tráiler, lo pondremos aquí."
          }
        ]
      }
    ]
  },
  "sin-tiempo-peiko": {
    "tarjeta": "Videoclip narrativo de Peiko con dos mundos opuestos: una casa moderna y una casa podrida. Proyecto de estudios.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "*Sin Tiempo* mezcla la interpretación musical con un drama sobre el paso del tiempo, las consecuencias de los actos y la pérdida de libertad. Se apoya en un contraste: un mundo moderno y lujoso frente a otro podrido, como la propia letra habla de la distancia entre el éxito y el fracaso."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Dirección.**",
              "**Dirección de fotografía.**"
            ]
          },
          {
            "t": "p",
            "x": "Proyecto de estudios."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Casa Moderna vs. Casa Podrida:** dos atmósferas distintas para mostrar la fractura en la vida del personaje.",
              "**Planificación:** convertí el ritmo de la canción en un plan técnico, con cada movimiento de cámara y decisión óptica al servicio del arco del personaje.",
              "**Clímax:** el vídeo sale de los espacios residenciales y acaba con una luz más fría, con el artista cantando agarrado a los barrotes de una celda."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "Que la caída se viera en la imagen, no solo en la historia."
          }
        ]
      },
      {
        "titulo": "El resultado",
        "bloques": [
          {
            "t": "p",
            "x": "Una pieza de estudios que me sirve de muestra de dirección y de fotografía en un formato narrativo."
          }
        ]
      }
    ]
  },
  "y-el-ano-que-viene-que": {
    "tarjeta": "Corto escrito, rodado y montado en 30 días para el ESCAC Dreammakers Contest 2024 de Cupra. Subió al podio.",
    "secciones": [
      {
        "titulo": "La historia",
        "bloques": [
          {
            "t": "p",
            "x": "El ESCAC Dreammakers Contest 2024, de Cupra, pedía un cortometraje en 30 días a partir de tres palabras: *Ojo*, *Cine* y *Barcelona*. La única forma de unirlas sin que sonara forzado era hablar de mí: de mi relación con el cine. El resultado es un corto personal, con voz en off y un montaje muy rápido."
          }
        ]
      },
      {
        "titulo": "Mi papel",
        "bloques": [
          {
            "t": "p",
            "x": "Lo hice casi todo:"
          },
          {
            "t": "li",
            "x": [
              "**Guion:** la idea y el texto.",
              "**Dirección:** visión artística y dirección en el set.",
              "**Dirección de fotografía.**",
              "**Montaje.**",
              "**Actor protagonista.**"
            ]
          },
          {
            "t": "p",
            "x": "Con el apoyo de Adrià Mira Lozano y Lara Ruiz Martín."
          }
        ]
      },
      {
        "titulo": "Cómo lo hicimos",
        "bloques": [
          {
            "t": "li",
            "x": [
              "**Narración:** voz en off cálida que guía al espectador por dentro del personaje, con *Amélie* como referencia.",
              "**Montaje:** ritmo muy acelerado, para contrastar con la calma de la voz.",
              "**Imagen:** planifiqué los encuadres a la vez que la voz y el montaje, porque en un corto de este tamaño las tres cosas se deciden juntas."
            ]
          }
        ]
      },
      {
        "titulo": "El reto",
        "bloques": [
          {
            "t": "p",
            "x": "El plazo. Idear, grabar, editar y entregar en unos 15 días obliga a decidir rápido, a descartar lo accesorio y a quedarse solo con lo que cuenta la historia."
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
              "El premio me abrió la puerta a becas de la ESCAC.",
              "Aprendizaje: aunque lo hice casi todo yo, en cine al final todo es trabajo de equipo."
            ]
          }
        ]
      }
    ]
  }
};
