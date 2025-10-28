// models/Jornada.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IJornada extends Document {
  id_liga: Types.ObjectId;
  numero_jornada: number;
  nombre_jornada: string;
  fechas: {
    inicio: Date;
    termino: Date;
    hora_inicio_default: string;
    hora_termino_default: string;
  };
  partidos: {
    id_partido: Types.ObjectId;
    fecha_programada: Date;
    hora_inicio: string;
    hora_termino: string;
    estado: string;
  }[];
  estado: 'programada' | 'en_curso' | 'finalizada' | 'cancelada';
}

const jornadaSchema = new Schema<IJornada>({
  id_liga: {
    type: Schema.Types.ObjectId,
    ref: 'Liga',
    required: true
  },
  numero_jornada: {
    type: Number,
    required: true
  },
  nombre_jornada: {
    type: String,
    required: true
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
    hora_inicio_default: {
      type: String,
      required: true
    },
    hora_termino_default: {
      type: String,
      required: true
    }
  },
  partidos: [{
    id_partido: {
      type: Schema.Types.ObjectId,
      ref: 'Partido',
      required: true
    },
    fecha_programada: {
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
    },
    estado: {
      type: String,
      required: true
    }
  }],
  estado: {
    type: String,
    enum: ['programada', 'en_curso', 'finalizada', 'cancelada'],
    default: 'programada'
  }
}, {
  timestamps: true
});

export default mongoose.model<IJornada>('Jornada', jornadaSchema);