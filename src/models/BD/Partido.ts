// models/Partido.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

interface IJugadorAlineacion {
  id_jugador: Types.ObjectId;
  nombre_completo: string;
  numero_camiseta: number;
  posicion: string;
  es_titular: boolean;
  capitán: boolean;
  estadisticas_partido: {
    goles: number;
    asistencias: number;
    faltas_cometidas: number;
    faltas_recibidas: number;
    tiros: number;
    tiros_a_gol: number;
    minutos_jugados: number;
    cambios: {
      entrada: string;
      salida?: string;
      sustituido_por?: Types.ObjectId;
    };
  };
  sanciones: {
    tipo: string;
    minuto: number;
    motivo: string;
    descripcion: string;
    arbitro: Types.ObjectId;
    hora: string;
    consecuencia: string;
  }[];
}

interface IEventoPartido {
  tipo: string;
  minuto: number;
  hora: string;
  equipo: 'local' | 'visitante';
  jugador: {
    id_jugador: Types.ObjectId;
    nombre: string;
    numero: number;
  };
  descripcion?: string;
  asistencia?: {
    id_jugador: Types.ObjectId;
    nombre: string;
    numero: number;
  };
  motivo?: string;
  arbitro?: Types.ObjectId;
  consecuencia?: string;
}

interface IEquipoPartido {
  id_equipo: Types.ObjectId;
  nombre: string;
  goles: number;
  alineacion: IJugadorAlineacion[];
  suplentes: IJugadorAlineacion[];
  sanciones_equipo: {
    tipo: string;
    minuto: number;
    motivo: string;
    descripcion: string;
    arbitro: Types.ObjectId;
    hora: string;
    consecuencia: string;
  }[];
}

export interface IPartido extends Document {
  codigo_unico: string;
  id_jornada: Types.ObjectId;
  id_liga: Types.ObjectId;
  id_categoria: Types.ObjectId;
  equipos: {
    local: IEquipoPartido;
    visitante: IEquipoPartido;
  };
  eventos: IEventoPartido[];
  resumen_sanciones: {
    total_tarjetas_amarillas: number;
    total_tarjetas_rojas: number;
    tarjetas_amarillas_local: number;
    tarjetas_amarillas_visitante: number;
    tarjetas_rojas_local: number;
    tarjetas_rojas_visitante: number;
    sanciones_posteriores: {
      id_jugador: Types.ObjectId;
      nombre: string;
      sancion: string;
      motivo: string;
      partidos_suspendidos: number;
      fecha_inicio_suspension: Date;
      fecha_fin_suspension: Date;
    }[];
  };
  arbitraje: {
    id_arbitro: Types.ObjectId;
    arbitros_asistentes: Types.ObjectId[];
    observaciones?: string;
    incidencias_arbitrales: {
      minuto: number;
      descripcion: string;
      accion_tomada: string;
    }[];
  };
  cancha: {
    id_cancha: Types.ObjectId;
    nombre: string;
    direccion: string;
    condiciones: string;
    observaciones_cancha?: string;
  };
  horarios: {
    programado: {
      fecha: Date;
      hora_inicio: string;
      hora_termino: string;
    };
    real: {
      hora_inicio?: string;
      hora_termino?: string;
      duracion_real?: number;
      motivo_retraso?: string;
      tiempo_adicional?: number;
    };
  };
  resultado: {
    goles_local: number;
    goles_visitante: number;
    resultado_final: 'victoria_local' | 'victoria_visitante' | 'empate';
    detalles: {
      tarjetas_amarillas: number;
      tarjetas_rojas: number;
      penales: number;
      cambios_realizados: number;
      goles_detalle: {
        id_jugador: Types.ObjectId;
        numero_camiseta: number;
        minuto: number;
        tipo: string;
        es_penal: boolean;
        descripcion: string;
      }[];
    };
  };
  condiciones_climaticas: {
    temperatura?: number;
    clima?: string;
    humedad?: number;
    viento?: string;
  };
  estado: 'programado' | 'en_juego' | 'finalizado' | 'cancelado' | 'suspendido';
  acta_cerrada: boolean;
  firmas: {
    arbitro_principal: boolean;
    capitan_local: boolean;
    capitan_visitante: boolean;
  };
}

const jugadorAlineacionSchema = new Schema<IJugadorAlineacion>({
  id_jugador: {
    type: Schema.Types.ObjectId,
    ref: 'Participante',
    required: true
  },
  nombre_completo: {
    type: String,
    required: true
  },
  numero_camiseta: {
    type: Number,
    required: true
  },
  posicion: {
    type: String,
    required: true
  },
  es_titular: {
    type: Boolean,
    required: true
  },
  capitán: {
    type: Boolean,
    default: false
  },
  estadisticas_partido: {
    goles: {
      type: Number,
      default: 0
    },
    asistencias: {
      type: Number,
      default: 0
    },
    faltas_cometidas: {
      type: Number,
      default: 0
    },
    faltas_recibidas: {
      type: Number,
      default: 0
    },
    tiros: {
      type: Number,
      default: 0
    },
    tiros_a_gol: {
      type: Number,
      default: 0
    },
    minutos_jugados: {
      type: Number,
      default: 0
    },
    cambios: {
      entrada: {
        type: String,
        required: true
      },
      salida: String,
      sustituido_por: {
        type: Schema.Types.ObjectId,
        ref: 'Participante'
      }
    }
  },
  sanciones: [{
    tipo: {
      type: String,
      required: true
    },
    minuto: {
      type: Number,
      required: true
    },
    motivo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    arbitro: {
      type: Schema.Types.ObjectId,
      ref: 'Arbitro',
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    consecuencia: {
      type: String,
      required: true
    }
  }]
});

const eventoPartidoSchema = new Schema<IEventoPartido>({
  tipo: {
    type: String,
    required: true
  },
  minuto: {
    type: Number,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  equipo: {
    type: String,
    enum: ['local', 'visitante'],
    required: true
  },
  jugador: {
    id_jugador: {
      type: Schema.Types.ObjectId,
      ref: 'Participante',
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    numero: {
      type: Number,
      required: true
    }
  },
  descripcion: String,
  asistencia: {
    id_jugador: {
      type: Schema.Types.ObjectId,
      ref: 'Participante'
    },
    nombre: String,
    numero: Number
  },
  motivo: String,
  arbitro: {
    type: Schema.Types.ObjectId,
    ref: 'Arbitro'
  },
  consecuencia: String
});

const equipoPartidoSchema = new Schema<IEquipoPartido>({
  id_equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  goles: {
    type: Number,
    default: 0
  },
  alineacion: [jugadorAlineacionSchema],
  suplentes: [jugadorAlineacionSchema],
  sanciones_equipo: [{
    tipo: {
      type: String,
      required: true
    },
    minuto: {
      type: Number,
      required: true
    },
    motivo: {
      type: String,
      required: true
    },
    descripcion: {
      type: String,
      required: true
    },
    arbitro: {
      type: Schema.Types.ObjectId,
      ref: 'Arbitro',
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    consecuencia: {
      type: String,
      required: true
    }
  }]
});

const partidoSchema = new Schema<IPartido>({
  codigo_unico: {
    type: String,
    required: true,
    unique: true
  },
  id_jornada: {
    type: Schema.Types.ObjectId,
    ref: 'Jornada',
    required: true
  },
  id_liga: {
    type: Schema.Types.ObjectId,
    ref: 'Liga',
    required: true
  },
  id_categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  equipos: {
    local: equipoPartidoSchema,
    visitante: equipoPartidoSchema
  },
  eventos: [eventoPartidoSchema],
  resumen_sanciones: {
    total_tarjetas_amarillas: {
      type: Number,
      default: 0
    },
    total_tarjetas_rojas: {
      type: Number,
      default: 0
    },
    tarjetas_amarillas_local: {
      type: Number,
      default: 0
    },
    tarjetas_amarillas_visitante: {
      type: Number,
      default: 0
    },
    tarjetas_rojas_local: {
      type: Number,
      default: 0
    },
    tarjetas_rojas_visitante: {
      type: Number,
      default: 0
    },
    sanciones_posteriores: [{
      id_jugador: {
        type: Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
      },
      nombre: {
        type: String,
        required: true
      },
      sancion: {
        type: String,
        required: true
      },
      motivo: {
        type: String,
        required: true
      },
      partidos_suspendidos: {
        type: Number,
        required: true
      },
      fecha_inicio_suspension: {
        type: Date,
        required: true
      },
      fecha_fin_suspension: {
        type: Date,
        required: true
      }
    }]
  },
  arbitraje: {
    id_arbitro: {
      type: Schema.Types.ObjectId,
      ref: 'Arbitro',
      required: true
    },
    arbitros_asistentes: [{
      type: Schema.Types.ObjectId,
      ref: 'Arbitro'
    }],
    observaciones: String,
    incidencias_arbitrales: [{
      minuto: {
        type: Number,
        required: true
      },
      descripcion: {
        type: String,
        required: true
      },
      accion_tomada: {
        type: String,
        required: true
      }
    }]
  },
  cancha: {
    id_cancha: {
      type: Schema.Types.ObjectId,
      ref: 'Cancha',
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    condiciones: {
      type: String,
      required: true
    },
    observaciones_cancha: String
  },
  horarios: {
    programado: {
      fecha: {
        type: Date,
        required: true
      },
      hora_inicio: {
        type: String,
        required: true
      },
      hora_termino: {
        type: String,
        required: true
      }
    },
    real: {
      hora_inicio: String,
      hora_termino: String,
      duracion_real: Number,
      motivo_retraso: String,
      tiempo_adicional: Number
    }
  },
  resultado: {
    goles_local: {
      type: Number,
      default: 0
    },
    goles_visitante: {
      type: Number,
      default: 0
    },
    resultado_final: {
      type: String,
      enum: ['victoria_local', 'victoria_visitante', 'empate']
    },
    detalles: {
      tarjetas_amarillas: {
        type: Number,
        default: 0
      },
      tarjetas_rojas: {
        type: Number,
        default: 0
      },
      penales: {
        type: Number,
        default: 0
      },
      cambios_realizados: {
        type: Number,
        default: 0
      },
      goles_detalle: [{
        id_jugador: {
          type: Schema.Types.ObjectId,
          ref: 'Participante',
          required: true
        },
        numero_camiseta: {
          type: Number,
          required: true
        },
        minuto: {
          type: Number,
          required: true
        },
        tipo: {
          type: String,
          required: true
        },
        es_penal: {
          type: Boolean,
          default: false
        },
        descripcion: {
          type: String,
          required: true
        }
      }]
    }
  },
  condiciones_climaticas: {
    temperatura: Number,
    clima: String,
    humedad: Number,
    viento: String
  },
  estado: {
    type: String,
    enum: ['programado', 'en_juego', 'finalizado', 'cancelado', 'suspendido'],
    default: 'programado'
  },
  acta_cerrada: {
    type: Boolean,
    default: false
  },
  firmas: {
    arbitro_principal: {
      type: Boolean,
      default: false
    },
    capitan_local: {
      type: Boolean,
      default: false
    },
    capitan_visitante: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IPartido>('Partido', partidoSchema);