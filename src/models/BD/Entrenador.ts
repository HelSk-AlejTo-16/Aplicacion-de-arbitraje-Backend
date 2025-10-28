// models/Entrenador.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IEntrenador extends Document {
  id_organizador: Types.ObjectId;
  datos_personales: {
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    fecha_nacimiento: Date;
    curp: string;
    correo: string;
    telefono: string;
    lugar_residencia: {
      colonia?: string;
      municipio?: string;
      estado?: string;
    };
  };
  certificaciones: {
    numero_licencia: string;
    documento_certificacion: string;
    nivel: string;
    especialidad: string;
  };
  equipos_asignados: Types.ObjectId[];
  estado: 'activo' | 'inactivo' | 'suspendido';
}

const entrenadorSchema = new Schema<IEntrenador>({
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
    correo: {
      type: String,
      required: true,
      unique: true
    },
    telefono: {
      type: String,
      required: true
    },
    lugar_residencia: {
      colonia: String,
      municipio: String,
      estado: String
    }
  },
  certificaciones: {
    numero_licencia: {
      type: String,
      required: true,
      unique: true
    },
    documento_certificacion: {
      type: String,
      required: true
    },
    nivel: {
      type: String,
      required: true
    },
    especialidad: {
      type: String,
      required: true
    }
  },
  equipos_asignados: [{
    type: Schema.Types.ObjectId,
    ref: 'Equipo'
  }],
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  }
}, {
  timestamps: true
});

export default mongoose.model<IEntrenador>('Entrenador', entrenadorSchema);