// models/Cancha.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICancha extends Document {
  id_organizador: Types.ObjectId;
  nombre_lugar: string;
  numero_cancha: number;
  direccion: {
    calle: string;
    numero: string;
    colonia: string;
    municipio: string;
    estado: string;
    pais: string;
    codigo_postal: string;
  };
  caracteristicas: {
    tipo_superficie: string;
    medidas: string;
    capacidad_espectadores: number;
    iluminacion: boolean;
    vestidores: boolean;
    estacionamiento: boolean;
  };
  estado_cancha: string;
  disponibilidad: {
    lunes: string[];
    martes: string[];
    miercoles: string[];
    jueves: string[];
    viernes: string[];
    sabado: string[];
    domingo: string[];
  };
  estado: 'activa' | 'inactiva' | 'mantenimiento';
}

const canchaSchema = new Schema<ICancha>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  nombre_lugar: {
    type: String,
    required: true
  },
  numero_cancha: {
    type: Number,
    required: true
  },
  direccion: {
    calle: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    },
    colonia: {
      type: String,
      required: true
    },
    municipio: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true
    },
    pais: {
      type: String,
      required: true
    },
    codigo_postal: {
      type: String,
      required: true
    }
  },
  caracteristicas: {
    tipo_superficie: {
      type: String,
      required: true
    },
    medidas: {
      type: String,
      required: true
    },
    capacidad_espectadores: {
      type: Number,
      required: true
    },
    iluminacion: {
      type: Boolean,
      default: false
    },
    vestidores: {
      type: Boolean,
      default: false
    },
    estacionamiento: {
      type: Boolean,
      default: false
    }
  },
  estado_cancha: {
    type: String,
    required: true
  },
  disponibilidad: {
    lunes: [String],
    martes: [String],
    miercoles: [String],
    jueves: [String],
    viernes: [String],
    sabado: [String],
    domingo: [String]
  },
  estado: {
    type: String,
    enum: ['activa', 'inactiva', 'mantenimiento'],
    default: 'activa'
  }
}, {
  timestamps: true
});

export default mongoose.model<ICancha>('Cancha', canchaSchema);