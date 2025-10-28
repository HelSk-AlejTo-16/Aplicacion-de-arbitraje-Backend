// models/Arbitro.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IArbitro extends Document {
  id_organizador: Types.ObjectId;
  numero_licencia: string;
  datos_personales: {
    correo: string;
    contraseña: string;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    fecha_nacimiento: Date;
    curp: string;
    ine: string;
    documento_arbitro?: string;
    lugar_residencia: {
      calle?: string;
      colonia?: string;
      municipio?: string;
      estado?: string;
      pais?: string;
    };
  };
  contacto: {
    telefono?: string;
    telefono_emergencia?: string;
  };
  estadisticas: {
    partidos_arbitrados: number;
    valoracion_promedio: number;
    años_experiencia: number;
  };
  estado: 'activo' | 'inactivo' | 'suspendido';
  fecha_registro: Date;
  disponible: boolean;
}

const arbitroSchema = new Schema<IArbitro>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  numero_licencia: {
    type: String,
    required: true,
    unique: true
  },
  datos_personales: {
    correo: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true
    },
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
    ine: {
      type: String,
      required: true
    },
    documento_arbitro: String,
    lugar_residencia: {
      calle: String,
      colonia: String,
      municipio: String,
      estado: String,
      pais: String
    }
  },
  contacto: {
    telefono: String,
    telefono_emergencia: String
  },
  estadisticas: {
    partidos_arbitrados: {
      type: Number,
      default: 0
    },
    valoracion_promedio: {
      type: Number,
      default: 0
    },
    años_experiencia: {
      type: Number,
      default: 0
    }
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  disponible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IArbitro>('Arbitro', arbitroSchema);