// models/Participante.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

interface IEquipoParticipante {
  id_equipo: Types.ObjectId;
  nombre_equipo: string;
  fecha_inscripcion: Date;
  fecha_baja?: Date;
  estado: 'activo' | 'inactivo' | 'suspendido';
  configuracion_equipo: {
    posicion_principal: string;
    posiciones_secundarias: string[];
    numero_camiseta: number;
    pie_dominante: 'derecho' | 'izquierdo' | 'ambidiestro';
  };
  restricciones_equipo: {
    puede_jugar: boolean;
    partidos_suspendidos: number;
    motivo_suspension?: string;
    fecha_fin_suspension?: Date;
  };
}

interface IEstadisticasEquipo {
  id_equipo: Types.ObjectId;
  partidos_jugados: number;
  goles: number;
  asistencias: number;
  faltas: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;
  minutos_jugados: number;
}

interface IHistorialNumero {
  id_equipo: Types.ObjectId;
  numeros: {
    numero: number;
    temporada: string;
    fecha_asignacion: Date;
    fecha_cambio?: Date;
    activo: boolean;
  }[];
}

export interface IParticipante extends Document {
  id_organizador: Types.ObjectId;
  datos_personales: {
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    fecha_nacimiento: Date;
    curp: string;
    sexo: 'M' | 'F';
    foto_participante?: string;
    lugar_nacimiento?: string;
  };
  documentos: {
    permiso_tutor: string;
    ine_tutor: string;
    acta_nacimiento: string;
  };
  datos_tutor: {
    nombre_completo: string;
    telefono: string;
    correo: string;
    parentesco: string;
  };
  categoria: {
    id_categoria: Types.ObjectId;
    nombre_categoria: string;
    año_nacimiento_minimo: number;
    año_nacimiento_maximo: number;
  };
  equipos: IEquipoParticipante[];
  estadisticas_generales: {
    total_partidos_jugados: number;
    total_goles: number;
    total_asistencias: number;
    total_faltas: number;
    total_tarjetas_amarillas: number;
    total_tarjetas_rojas: number;
    minutos_jugados: number;
  };
  estadisticas_por_equipo: IEstadisticasEquipo[];
  historial_numeros: IHistorialNumero[];
  estado: 'activo' | 'inactivo' | 'suspendido';
}

const equipoParticipanteSchema = new Schema<IEquipoParticipante>({
  id_equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  nombre_equipo: {
    type: String,
    required: true
  },
  fecha_inscripcion: {
    type: Date,
    default: Date.now
  },
  fecha_baja: Date,
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  configuracion_equipo: {
    posicion_principal: {
      type: String,
      required: true
    },
    posiciones_secundarias: [String],
    numero_camiseta: {
      type: Number,
      required: true
    },
    pie_dominante: {
      type: String,
      enum: ['derecho', 'izquierdo', 'ambidiestro'],
      default: 'derecho'
    }
  },
  restricciones_equipo: {
    puede_jugar: {
      type: Boolean,
      default: true
    },
    partidos_suspendidos: {
      type: Number,
      default: 0
    },
    motivo_suspension: String,
    fecha_fin_suspension: Date
  }
});

const estadisticasEquipoSchema = new Schema<IEstadisticasEquipo>({
  id_equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  partidos_jugados: {
    type: Number,
    default: 0
  },
  goles: {
    type: Number,
    default: 0
  },
  asistencias: {
    type: Number,
    default: 0
  },
  faltas: {
    type: Number,
    default: 0
  },
  tarjetas_amarillas: {
    type: Number,
    default: 0
  },
  tarjetas_rojas: {
    type: Number,
    default: 0
  },
  minutos_jugados: {
    type: Number,
    default: 0
  }
});

const historialNumeroSchema = new Schema<IHistorialNumero>({
  id_equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  numeros: [{
    numero: {
      type: Number,
      required: true
    },
    temporada: {
      type: String,
      required: true
    },
    fecha_asignacion: {
      type: Date,
      default: Date.now
    },
    fecha_cambio: Date,
    activo: {
      type: Boolean,
      default: true
    }
  }]
});

const participanteSchema = new Schema<IParticipante>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  datos_personales: {
    nombre: {
      type: String,
      required: true
    },
    apellido_p: {
      type: String,
      required: true
    },
    apellido_m: {
      type: String,
      required: true
    },
    fecha_nacimiento: {
      type: Date,
      required: true
    },
    curp: {
      type: String,
      required: true,
      unique: true
    },
    sexo: {
      type: String,
      enum: ['M', 'F'],
      required: true
    },
    foto_participante: String,
    lugar_nacimiento: String
  },
  documentos: {
    permiso_tutor: {
      type: String,
      required: true
    },
    ine_tutor: {
      type: String,
      required: true
    },
    acta_nacimiento: {
      type: String,
      required: true
    }
  },
  datos_tutor: {
    nombre_completo: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true
    },
    parentesco: {
      type: String,
      required: true
    }
  },
  categoria: {
    id_categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },
    nombre_categoria: String,
    año_nacimiento_minimo: Number,
    año_nacimiento_maximo: Number
  },
  equipos: [equipoParticipanteSchema],
  estadisticas_generales: {
    total_partidos_jugados: {
      type: Number,
      default: 0
    },
    total_goles: {
      type: Number,
      default: 0
    },
    total_asistencias: {
      type: Number,
      default: 0
    },
    total_faltas: {
      type: Number,
      default: 0
    },
    total_tarjetas_amarillas: {
      type: Number,
      default: 0
    },
    total_tarjetas_rojas: {
      type: Number,
      default: 0
    },
    minutos_jugados: {
      type: Number,
      default: 0
    }
  },
  estadisticas_por_equipo: [estadisticasEquipoSchema],
  historial_numeros: [historialNumeroSchema],
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  }
}, {
  timestamps: true
});

export default mongoose.model<IParticipante>('Participante', participanteSchema);