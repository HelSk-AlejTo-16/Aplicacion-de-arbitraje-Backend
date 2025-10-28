// models/Equipo.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

interface IJugadorEquipo {
  id_jugador: Types.ObjectId;
  fecha_inscripcion: Date;
  posicion_principal: string;
  posiciones_secundarias: string[];
  numero_camiseta: number;
  estado: 'activo' | 'inactivo' | 'lesionado' | 'suspendido';
  fecha_asignacion_numero: Date;
  historial_numeros: number[];
}

interface INumeroOcupado {
  numero: number;
  id_jugador: Types.ObjectId;
}

export interface IEquipo extends Document {
  id_organizador: Types.ObjectId;
  id_entrenador: Types.ObjectId;
  nombre_equipo: string;
  logo_equipo?: string;
  colores: {
    principal: string;
    secundario: string;
  };
  datos_equipo: {
    fecha_creacion: Date;
    lugar_residencia: {
      colonia?: string;
      municipio?: string;
      estado?: string;
    };
    numero_licencia: string;
  };
  jugadores: IJugadorEquipo[];
  numeros_camiseta: {
    disponibles: number[];
    ocupados: INumeroOcupado[];
    numeros_retirados: number[];
  };
  estadisticas: {
    partidos_jugados: number;
    partidos_ganados: number;
    partidos_empatados: number;
    partidos_perdidos: number;
    goles_favor: number;
    goles_contra: number;
    puntos: number;
  };
  estado: 'activo' | 'inactivo' | 'suspendido';
}

const jugadorEquipoSchema = new Schema<IJugadorEquipo>({
  id_jugador: {
    type: Schema.Types.ObjectId,
    ref: 'Participante',
    required: true
  },
  fecha_inscripcion: {
    type: Date,
    default: Date.now
  },
  posicion_principal: {
    type: String,
    required: true
  },
  posiciones_secundarias: [String],
  numero_camiseta: {
    type: Number,
    required: true,
    min: 1,
    max: 99
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'lesionado', 'suspendido'],
    default: 'activo'
  },
  fecha_asignacion_numero: {
    type: Date,
    default: Date.now
  },
  historial_numeros: [Number]
});

const numeroOcupadoSchema = new Schema<INumeroOcupado>({
  numero: {
    type: Number,
    required: true
  },
  id_jugador: {
    type: Schema.Types.ObjectId,
    ref: 'Participante',
    required: true
  }
});

const equipoSchema = new Schema<IEquipo>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  id_entrenador: {
    type: Schema.Types.ObjectId,
    ref: 'Entrenador',
    required: true
  },
  nombre_equipo: {
    type: String,
    required: true,
    trim: true
  },
  logo_equipo: String,
  colores: {
    principal: String,
    secundario: String
  },
  datos_equipo: {
    fecha_creacion: {
      type: Date,
      required: true
    },
    lugar_residencia: {
      colonia: String,
      municipio: String,
      estado: String
    },
    numero_licencia: {
      type: String,
      required: true,
      unique: true
    }
  },
  jugadores: [jugadorEquipoSchema],
  numeros_camiseta: {
    disponibles: [Number],
    ocupados: [numeroOcupadoSchema],
    numeros_retirados: [Number]
  },
  estadisticas: {
    partidos_jugados: {
      type: Number,
      default: 0
    },
    partidos_ganados: {
      type: Number,
      default: 0
    },
    partidos_empatados: {
      type: Number,
      default: 0
    },
    partidos_perdidos: {
      type: Number,
      default: 0
    },
    goles_favor: {
      type: Number,
      default: 0
    },
    goles_contra: {
      type: Number,
      default: 0
    },
    puntos: {
      type: Number,
      default: 0
    }
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  }
}, {
  timestamps: true
});

export default mongoose.model<IEquipo>('Equipo', equipoSchema);