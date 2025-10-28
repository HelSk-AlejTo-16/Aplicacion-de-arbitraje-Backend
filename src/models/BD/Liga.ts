// models/Liga.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILiga extends Document {
  id_organizador: Types.ObjectId;
  nombre_liga: string;
  temporada: string;
  ubicacion: {
    tipo: 'Municipal' | 'Estatal' | 'Pais';
    municipio?: string;
    estado?: string;
  };
  fechas: {
    inicio: Date;
    termino: Date;
    inscripcion_inicio?: Date;
    inscripcion_termino?: Date;
  };
  configuracion: {
    puntos_por_victoria: number;
    puntos_por_empate: number;
    puntos_por_derrota: number;
    duracion_partido_minutos: number;
    reglamento_especial?: string;
  };
  categorias_permitidas: string[];
  estado: 'activa' | 'inactiva' | 'finalizada' | 'en_progreso';
  equipos_inscritos: Types.ObjectId[];
}

const ligaSchema = new Schema<ILiga>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  nombre_liga: {
    type: String,
    required: true
  },
  temporada: {
    type: String,
    required: true
  },
  ubicacion: {
    tipo: {
      type: String,
      enum: ['Municipal', 'Estatal', 'Pais'],
      required: true
    },
    municipio: String,
    estado: String
  },
  fechas: {
    inicio: {
      type: Date,
      required: true
    },
    termino: {
      type: Date,
      required: true
    },
    inscripcion_inicio: Date,
    inscripcion_termino: Date
  },
  configuracion: {
    puntos_por_victoria: {
      type: Number,
      default: 3
    },
    puntos_por_empate: {
      type: Number,
      default: 1
    },
    puntos_por_derrota: {
      type: Number,
      default: 0
    },
    duracion_partido_minutos: {
      type: Number,
      default: 60
    },
    reglamento_especial: String
  },
  categorias_permitidas: [String],
  estado: {
    type: String,
    enum: ['activa', 'inactiva', 'finalizada', 'en_progreso'],
    default: 'activa'
  },
  equipos_inscritos: [{
    type: Schema.Types.ObjectId,
    ref: 'Equipo'
  }]
}, {
  timestamps: true
});

export default mongoose.model<ILiga>('Liga', ligaSchema);