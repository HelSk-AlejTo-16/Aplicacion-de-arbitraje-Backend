// models/Sancion.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ISancion extends Document {
  id_jugador: Types.ObjectId;
  id_equipo: Types.ObjectId;
  id_partido: Types.ObjectId;
  tipo: string;
  motivo: string;
  descripcion: string;
  minuto: number;
  fecha_sancion: Date;
  arbitro: Types.ObjectId;
  consecuencia: string;
  partidos_suspendidos: number;
  fecha_inicio_suspension: Date;
  fecha_fin_suspension: Date;
  partidos_cumplidos: number;
  estado: 'activa' | 'cumplida' | 'cancelada';
  apelacion: {
    solicitada: boolean;
    fecha_apelacion?: Date;
    resultado?: string;
    observaciones?: string;
  };
}

const sancionSchema = new Schema<ISancion>({
  id_jugador: {
    type: Schema.Types.ObjectId,
    ref: 'Participante',
    required: true
  },
  id_equipo: {
    type: Schema.Types.ObjectId,
    ref: 'Equipo',
    required: true
  },
  id_partido: {
    type: Schema.Types.ObjectId,
    ref: 'Partido',
    required: true
  },
  tipo: {
    type: String,
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
  minuto: {
    type: Number,
    required: true
  },
  fecha_sancion: {
    type: Date,
    required: true
  },
  arbitro: {
    type: Schema.Types.ObjectId,
    ref: 'Arbitro',
    required: true
  },
  consecuencia: {
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
  },
  partidos_cumplidos: {
    type: Number,
    default: 0
  },
  estado: {
    type: String,
    enum: ['activa', 'cumplida', 'cancelada'],
    default: 'activa'
  },
  apelacion: {
    solicitada: {
      type: Boolean,
      default: false
    },
    fecha_apelacion: Date,
    resultado: String,
    observaciones: String
  }
}, {
  timestamps: true
});

export default mongoose.model<ISancion>('Sancion', sancionSchema);