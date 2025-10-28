// database.js - Base de datos NoSQL completa y corregida

// Colección: Organizadores
db.organizadores = [
  {
    _id: ObjectId(),
    clave_organizacion: "ORG-ABC123-XYZ45",
    datos_personales: {
      correo: "organizador@ejemplo.com",
      contraseña: "hash_contraseña_segura",
      nombre: "Juan",
      apellido_p: "Pérez",
      apellido_m: "Gómez",
      fecha_nacimiento: "1985-05-15",
      curp: "PEGJ850515HDFRMN01",
      ine: "documento_ine_hash",
      icono_perfil: "url_icono_perfil",
      lugar_residencia: {
        calle: "Av. Principal",
        colonia: "Centro",
        municipio: "Ciudad de México",
        estado: "CDMX",
        pais: "México"
      }
    },
    datos_organizacion: {
      nombre_organizacion: "Ligas Infantiles CDMX",
      fecha_creacion_organizacion: "2020-03-10",
      fecha_creacion_cuenta: "2024-01-15T10:30:00Z"
    },
    contacto: {
      telefono_principal: "+5215512345678",
      telefono_secundario: "+5215512345679",
      whatsapp: "+5215512345680",
      telefono_emergencia: "+5215512345681"
    },
    configuracion: {
      notificaciones_email: true,
      tema_oscuro: false,
      idioma: "es"
    },
    estado: "activo",
    fecha_actualizacion: "2024-01-20T14:25:00Z",
    fecha_eliminacion: null,
    metadata: {
      version: 1,
      creado_por: "sistema"
    }
  }
];

// Colección: Árbitros
db.arbitros = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    numero_licencia: "ARB-PEGJ850515-78912",
    datos_personales: {
      correo: "arbitro@ejemplo.com",
      contraseña: "hash_contraseña_segura",
      nombre: "Carlos",
      apellido_p: "López",
      apellido_m: "Martínez",
      fecha_nacimiento: "1990-08-20",
      curp: "LOMC900820HDFRTR02",
      ine: "documento_ine_hash",
      documento_arbitro: "documento_certificacion_hash",
      lugar_residencia: {
        calle: "Calle Secundaria",
        colonia: "Norte",
        municipio: "Ciudad de México",
        estado: "CDMX",
        pais: "México"
      }
    },
    contacto: {
      telefono: "+5215512345678",
      telefono_emergencia: "+5215512345679"
    },
    estadisticas: {
      partidos_arbitrados: 45,
      valoracion_promedio: 4.5,
      años_experiencia: 3
    },
    estado: "activo",
    fecha_registro: "2024-01-15T09:00:00Z",
    fecha_actualizacion: "2024-01-20T11:30:00Z",
    disponible: true
  }
];

// Colección: Ligas
db.ligas = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    nombre_liga: "Liga Infantil Primavera 2024",
    temporada: "Primavera-2024",
    ubicacion: {
      tipo: "Municipal",
      municipio: "Ciudad de México",
      estado: "CDMX"
    },
    fechas: {
      inicio: "2024-03-01",
      termino: "2024-06-30",
      inscripcion_inicio: "2024-01-15",
      inscripcion_termino: "2024-02-28"
    },
    configuracion: {
      puntos_por_victoria: 3,
      puntos_por_empate: 1,
      puntos_por_derrota: 0,
      duracion_partido_minutos: 60,
      reglamento_especial: "No hay offsides en categorías inferiores"
    },
    categorias_permitidas: ["Sub-8", "Sub-10", "Sub-12"],
    estado: "activa",
    equipos_inscritos: [ObjectId("id_equipo1"), ObjectId("id_equipo2")],
    fecha_creacion: "2024-01-10T08:00:00Z",
    fecha_actualizacion: "2024-01-20T16:45:00Z"
  }
];

// Colección: Equipos
db.equipos = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    id_entrenador: ObjectId("id_entrenador"),
    nombre_equipo: "Los Halcones",
    logo_equipo: "url_logo_equipo",
    colores: {
      principal: "#1E3A8A",
      secundario: "#FFFFFF"
    },
    datos_equipo: {
      fecha_creacion: "2023-05-15",
      lugar_residencia: {
        colonia: "Centro",
        municipio: "Ciudad de México",
        estado: "CDMX"
      },
      numero_licencia: "EQ-HALC-2024-001"
    },
    jugadores: [
      {
        id_jugador: ObjectId("id_jugador1"),
        fecha_inscripcion: "2024-01-15",
        posicion_principal: "Delantero",
        posiciones_secundarias: ["Medio", "Extremo"],
        numero_camiseta: 10,
        estado: "activo",
        fecha_asignacion_numero: "2024-01-15",
        historial_numeros: [7, 10]
      }
    ],
    numeros_camiseta: {
      disponibles: [1, 2, 3, 5, 6, 8, 11, 12, 13, 14, 15],
      ocupados: [
        { numero: 4, id_jugador: ObjectId("id_jugador2") },
        { numero: 10, id_jugador: ObjectId("id_jugador1") }
      ],
      numeros_retirados: [23]
    },
    estadisticas: {
      partidos_jugados: 0,
      partidos_ganados: 0,
      partidos_empatados: 0,
      partidos_perdidos: 0,
      goles_favor: 0,
      goles_contra: 0,
      puntos: 0
    },
    estado: "activo",
    fecha_registro: "2024-01-15T10:00:00Z",
    fecha_actualizacion: "2024-01-20T14:20:00Z"
  }
];

// Colección: Participantes (Jugadores)
db.participantes = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    
    datos_personales: {
      nombre: "Miguel",
      apellido_p: "García",
      apellido_m: "Hernández",
      fecha_nacimiento: "2014-07-10",
      curp: "GAHM140710HDFRRC03",
      sexo: "M",
      foto_participante: "url_foto_jugador",
      lugar_nacimiento: "Ciudad de México"
    },

    documentos: {
      permiso_tutor: "documento_permiso_hash",
      ine_tutor: "documento_ine_tutor_hash",
      acta_nacimiento: "documento_acta_hash"
    },

    datos_tutor: {
      nombre_completo: "María García López",
      telefono: "+5215512345680",
      correo: "tutor@ejemplo.com",
      parentesco: "Madre"
    },

    categoria: {
      id_categoria: ObjectId("id_categoria_sub10"),
      nombre_categoria: "Sub-10",
      año_nacimiento_minimo: 2014,
      año_nacimiento_maximo: 2015
    },

    equipos: [
      {
        id_equipo: ObjectId("id_equipo_halcones"),
        nombre_equipo: "Los Halcones",
        fecha_inscripcion: "2024-01-15",
        fecha_baja: null,
        estado: "activo",
        configuracion_equipo: {
          posicion_principal: "Delantero",
          posiciones_secundarias: ["Medio", "Extremo"],
          numero_camiseta: 10,
          pie_dominante: "derecho"
        },
        restricciones_equipo: {
          puede_jugar: true,
          partidos_suspendidos: 0,
          motivo_suspension: null,
          fecha_fin_suspension: null
        }
      }
    ],

    estadisticas_generales: {
      total_partidos_jugados: 15,
      total_goles: 8,
      total_asistencias: 5,
      total_faltas: 12,
      total_tarjetas_amarillas: 2,
      total_tarjetas_rojas: 0,
      minutos_jugados: 1350
    },

    estadisticas_por_equipo: [
      {
        id_equipo: ObjectId("id_equipo_halcones"),
        partidos_jugados: 10,
        goles: 6,
        asistencias: 3,
        faltas: 8,
        tarjetas_amarillas: 1,
        tarjetas_rojas: 0,
        minutos_jugados: 900
      }
    ],

    estado: "activo",
    fecha_registro: "2024-01-15T11:30:00Z",
    fecha_actualizacion: "2024-01-20T15:10:00Z"
  }
];

// Colección: Categorías
db.categorias = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    nombre_categoria: "Sub-10",
    configuracion_edad: {
      año_nacimiento_minimo: 2014,
      año_nacimiento_maximo: 2015,
      rango_edades: "9-10 años",
      edad_minima: 9,
      edad_maxima: 10
    },
    configuracion_juego: {
      duracion_partido: "60 minutos",
      tamaño_cancha: "Mediana",
      tamaño_balon: 4,
      numero_jugadores_campo: 7,
    },
    descripcion: "Categoría para niños de 9 a 10 años",
    estado: "activa",
    fecha_creacion: "2024-01-10T09:00:00Z",
    fecha_actualizacion: "2024-01-20T12:00:00Z"
  }
];

// Colección: Jornadas
db.jornadas = [
  {
    _id: ObjectId(),
    id_liga: ObjectId("id_liga"),
    numero_jornada: 1,
    nombre_jornada: "Jornada 1 - Inicio de Temporada",
    fechas: {
      inicio: "2024-03-02",
      termino: "2024-03-03",
      hora_inicio_default: "09:00",
      hora_termino_default: "18:00"
    },
    partidos: [
      {
        id_partido: ObjectId("id_partido1"),
        fecha_programada: "2024-03-02",
        hora_inicio: "10:00",
        hora_termino: "11:00",
        estado: "programado"
      }
    ],
    estado: "programada",
    fecha_creacion: "2024-02-15T10:00:00Z",
    fecha_actualizacion: "2024-02-20T14:30:00Z"
  }
];

// Colección: Partidos - COMPLETAMENTE ACTUALIZADA CON SANCIONES DETALLADAS
db.partidos = [
  {
    _id: ObjectId(),
    codigo_unico: "PT-2024-S10-J01-EQL-EQV-12345",
    id_jornada: ObjectId("id_jornada"),
    id_liga: ObjectId("id_liga"),
    id_categoria: ObjectId("id_categoria"),
    
    equipos: {
      local: {
        id_equipo: ObjectId("id_equipo_local"),
        nombre: "Los Halcones",
        goles: 2,
        alineacion: [
          {
            id_jugador: ObjectId("id_jugador1"),
            nombre_completo: "Miguel García Hernández",
            numero_camiseta: 10,
            posicion: "Delantero",
            es_titular: true,
            capitán: false,
            // ESTADÍSTICAS INDIVIDUALES DEL JUGADOR EN EL PARTIDO
            estadisticas_partido: {
              goles: 1,
              asistencias: 1,
              faltas_cometidas: 2,
              faltas_recibidas: 1,
              tiros: 4,
              tiros_a_gol: 2,
              minutos_jugados: 60,
              cambios: {
                entrada: "10:00",
                salida: null,
                sustituido_por: null
              }
            },
            // SANCIONES RECIBIDAS DURANTE EL PARTIDO
            sanciones: [
              {
                tipo: "tarjeta_amarilla",
                minuto: 35,
                motivo: "Falta táctica",
                descripcion: "Jugada peligrosa",
                arbitro: ObjectId("id_arbitro"),
                hora: "10:35",
                consecuencia: "Amonestación"
              }
            ]
          }
        ],
        suplentes: [
          {
            id_jugador: ObjectId("id_jugador3"),
            nombre_completo: "Carlos Ruiz Díaz",
            numero_camiseta: 11,
            posicion: "Medio",
            es_titular: false,
            capitán: false,
            estadisticas_partido: {
              goles: 0,
              asistencias: 0,
              faltas_cometidas: 0,
              faltas_recibidas: 0,
              tiros: 0,
              tiros_a_gol: 0,
              minutos_jugados: 15,
              cambios: {
                entrada: "45:00",
                salida: null,
                sustituido_por: null
              }
            },
            sanciones: []
          }
        ],
        // SANCIONES AL EQUIPO EN GENERAL
        sanciones_equipo: [
          {
            tipo: "amonestacion_colectiva",
            minuto: 70,
            motivo: "Protesta colectiva",
            descripcion: "Protesta excesiva por decisión arbitral",
            arbitro: ObjectId("id_arbitro"),
            hora: "11:10",
            consecuencia: "Amonestación verbal al banquillo"
          }
        ]
      },
      visitante: {
        id_equipo: ObjectId("id_equipo_visitante"),
        nombre: "Los Tigres",
        goles: 1,
        alineacion: [
          {
            id_jugador: ObjectId("id_jugador4"),
            nombre_completo: "Pedro Martínez Soto",
            numero_camiseta: 7,
            posicion: "Medio",
            es_titular: true,
            capitán: true,
            estadisticas_partido: {
              goles: 0,
              asistencias: 1,
              faltas_cometidas: 3,
              faltas_recibidas: 2,
              tiros: 2,
              tiros_a_gol: 1,
              minutos_jugados: 60,
              cambios: {
                entrada: "10:00",
                salida: null,
                sustituido_por: null
              }
            },
            sanciones: [
              {
                tipo: "tarjeta_roja",
                minuto: 55,
                motivo: "Falta grave",
                descripcion: "Entrada violenta",
                arbitro: ObjectId("id_arbitro"),
                hora: "10:55",
                consecuencia: "Expulsión directa - Suspensión 2 partidos"
              }
            ]
          }
        ],
        suplentes: [],
        sanciones_equipo: []
      }
    },

    // EVENTOS DEL PARTIDO EN ORDEN CRONOLÓGICO
    eventos: [
      {
        tipo: "gol",
        minuto: 15,
        hora: "10:15",
        equipo: "local",
        jugador: {
          id_jugador: ObjectId("id_jugador1"),
          nombre: "Miguel García Hernández",
          numero: 10
        },
        descripcion: "Gol de tiro libre",
        asistencia: {
          id_jugador: ObjectId("id_jugador2"),
          nombre: "Ana López Mendoza",
          numero: 9
        }
      },
      {
        tipo: "tarjeta_amarilla",
        minuto: 35,
        hora: "10:35",
        equipo: "local",
        jugador: {
          id_jugador: ObjectId("id_jugador1"),
          nombre: "Miguel García Hernández",
          numero: 10
        },
        motivo: "Falta táctica",
        arbitro: ObjectId("id_arbitro")
      },
      {
        tipo: "tarjeta_roja",
        minuto: 55,
        hora: "10:55",
        equipo: "visitante",
        jugador: {
          id_jugador: ObjectId("id_jugador4"),
          nombre: "Pedro Martínez Soto",
          numero: 7
        },
        motivo: "Entrada violenta",
        arbitro: ObjectId("id_arbitro"),
        consecuencia: "Expulsión directa"
      },
      {
        tipo: "gol",
        minuto: 60,
        hora: "11:00",
        equipo: "visitante",
        jugador: {
          id_jugador: ObjectId("id_jugador5"),
          nombre: "Luis Torres García",
          numero: 11
        },
        descripcion: "Gol de cabeza",
        asistencia: {
          id_jugador: ObjectId("id_jugador4"),
          nombre: "Pedro Martínez Soto",
          numero: 7
        }
      },
      {
        tipo: "gol",
        minuto: 75,
        hora: "11:15",
        equipo: "local",
        jugador: {
          id_jugador: ObjectId("id_jugador2"),
          nombre: "Ana López Mendoza",
          numero: 9
        },
        descripcion: "Gol de penal",
        asistencia: null
      }
    ],

    // RESUMEN DE SANCIONES
    resumen_sanciones: {
      total_tarjetas_amarillas: 1,
      total_tarjetas_rojas: 1,
      tarjetas_amarillas_local: 1,
      tarjetas_amarillas_visitante: 0,
      tarjetas_rojas_local: 0,
      tarjetas_rojas_visitante: 1,
      sanciones_posteriores: [
        {
          id_jugador: ObjectId("id_jugador4"),
          nombre: "Pedro Martínez Soto",
          sancion: "Suspensión 2 partidos",
          motivo: "Tarjeta roja por entrada violenta",
          partidos_suspendidos: 2,
          fecha_inicio_suspension: "2024-03-02",
          fecha_fin_suspension: "2024-03-16"
        }
      ]
    },

    arbitraje: {
      id_arbitro: ObjectId("id_arbitro"),
      arbitros_asistentes: [ObjectId("id_arbitro_asistente1")],
      observaciones: "Partido con intensidad normal, una expulsión por entrada violenta",
      incidencias_arbitrales: [
        {
          minuto: 30,
          descripcion: "Protesta del entrenador visitante",
          accion_tomada: "Amonestación verbal"
        }
      ]
    },

    cancha: {
      id_cancha: ObjectId("id_cancha"),
      nombre: "Cancha Principal Deportiva Norte",
      direccion: "Av. Deportiva 123, Col. Centro",
      condiciones: "Óptimas",
      observaciones_cancha: "Sin novedades"
    },

    horarios: {
      programado: {
        fecha: "2024-03-02",
        hora_inicio: "10:00",
        hora_termino: "11:00"
      },
      real: {
        hora_inicio: "10:05",
        hora_termino: "11:20",
        duracion_real: 75,
        motivo_retraso: "Preparación de equipos",
        tiempo_adicional: 5
      }
    },

    resultado: {
      goles_local: 2,
      goles_visitante: 1,
      resultado_final: "victoria_local",
      detalles: {
        tarjetas_amarillas: 1,
        tarjetas_rojas: 1,
        penales: 1,
        cambios_realizados: 3,
        goles_detalle: [
          {
            id_jugador: ObjectId("id_jugador1"),
            numero_camiseta: 10,
            minuto: 15,
            tipo: "tiro_libre",
            es_penal: false,
            descripcion: "Gol de tiro libre directo"
          },
          {
            id_jugador: ObjectId("id_jugador5"),
            numero_camiseta: 11,
            minuto: 60,
            tipo: "cabeza",
            es_penal: false,
            descripcion: "Gol de cabeza tras centro"
          },
          {
            id_jugador: ObjectId("id_jugador2"),
            numero_camiseta: 9,
            minuto: 75,
            tipo: "penal",
            es_penal: true,
            descripcion: "Gol de penal transformado"
          }
        ]
      }
    },

    condiciones_climaticas: {
      temperatura: 22,
      clima: "soleado",
      humedad: 45,
      viento: "leve"
    },

    estado: "finalizado",
    fecha_creacion: "2024-02-20T09:00:00Z",
    fecha_actualizacion: "2024-03-02T11:30:00Z",
    acta_cerrada: true,
    firmas: {
      arbitro_principal: true,
      capitan_local: true,
      capitan_visitante: true
    }
  }
];

// Colección: Canchas
db.canchas = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    nombre_lugar: "Deportiva Norte",
    numero_cancha: 1,
    direccion: {
      calle: "Av. Deportiva",
      numero: "123",
      colonia: "Centro",
      municipio: "Ciudad de México",
      estado: "CDMX",
      pais: "México",
      codigo_postal: "01000"
    },
    caracteristicas: {
      tipo_superficie: "Sintética",
      medidas: "70x40 metros",
      capacidad_espectadores: 200,
      iluminacion: true,
      vestidores: true,
      estacionamiento: true
    },
    estado_cancha: "buenas_condiciones",
    disponibilidad: {
      lunes: ["09:00-18:00"],
      martes: ["09:00-18:00"],
      miercoles: ["09:00-18:00"],
      jueves: ["09:00-18:00"],
      viernes: ["09:00-18:00"],
      sabado: ["08:00-20:00"],
      domingo: ["08:00-20:00"]
    },
    estado: "activa",
    fecha_registro: "2024-01-12T11:00:00Z",
    fecha_actualizacion: "2024-01-20T13:15:00Z"
  }
];

// Colección: Entrenadores
db.entrenadores = [
  {
    _id: ObjectId(),
    id_organizador: ObjectId("id_organizador_padre"),
    datos_personales: {
      nombre: "Roberto",
      apellido_p: "Díaz",
      apellido_m: "Castillo",
      fecha_nacimiento: "1980-12-05",
      curp: "DICR801205HDFRSB04",
      correo: "entrenador@ejemplo.com",
      telefono: "+5215512345690",
      lugar_residencia: {
        colonia: "Sur",
        municipio: "Ciudad de México",
        estado: "CDMX"
      }
    },
    certificaciones: {
      numero_licencia: "ENT-DICR801205-54321",
      documento_certificacion: "documento_certificacion_hash",
      nivel: "Básico",
      especialidad: "Fútbol Infantil"
    },
    equipos_asignados: [ObjectId("id_equipo")],
    estado: "activo",
    fecha_registro: "2024-01-16T08:30:00Z",
    fecha_actualizacion: "2024-01-20T10:45:00Z"
  }
];

// Colección: Notificaciones
db.notificaciones = [
  {
    _id: ObjectId(),
    id_usuario: ObjectId("id_organizador"),
    tipo: "cambio_contraseña",
    titulo: "Contraseña actualizada exitosamente",
    mensaje: "Tu contraseña ha sido cambiada correctamente.",
    leida: false,
    fecha_creacion: "2024-01-20T14:30:00Z",
    metadata: {
      prioridad: "media",
      accion_requerida: false
    }
  }
];

// Colección: Tokens Recuperación
db.tokens_recuperacion = [
  {
    _id: ObjectId(),
    email: "usuario@ejemplo.com",
    token: "abc123def456ghi789",
    tipo: "recuperacion_contraseña",
    expiracion: "2024-01-20T16:30:00Z",
    utilizado: false,
    fecha_creacion: "2024-01-20T14:30:00Z"
  }
];

// Colección: Sanciones (Nueva colección para seguimiento de sanciones)
db.sanciones = [
  {
    _id: ObjectId(),
    id_jugador: ObjectId("id_jugador4"),
    id_equipo: ObjectId("id_equipo_visitante"),
    id_partido: ObjectId("id_partido"),
    tipo: "tarjeta_roja",
    motivo: "Entrada violenta",
    descripcion: "Entrada con excesiva fuerza sobre el rival",
    minuto: 55,
    fecha_sancion: "2024-03-02",
    arbitro: ObjectId("id_arbitro"),
    consecuencia: "Expulsión del partido y suspensión por 2 partidos",
    partidos_suspendidos: 2,
    fecha_inicio_suspension: "2024-03-02",
    fecha_fin_suspension: "2024-03-16",
    partidos_cumplidos: 0,
    estado: "activa",
    apelacion: {
      solicitada: false,
      fecha_apelacion: null,
      resultado: null,
      observaciones: null
    },
    fecha_creacion: "2024-03-02T11:30:00Z",
    fecha_actualizacion: "2024-03-02T11:30:00Z"
  }
];