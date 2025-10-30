// models/Organizador.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganizador extends Document {
  clave_organizacion: string;
  datos_personales: {
    correo: string;
    contraseña: string;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    fecha_nacimiento: Date;
    curp: string;
    ine: string;
    sexo: 'H' | 'M'; //<---Agregué
    icono_perfil?: string;
    lugar_residencia: {
      calle?: string;
      colonia?: string;
      municipio?: string;
      estado?: string;
      pais?: string;
    };
  };
  datos_organizacion: {
    nombre_organizacion: string;
    fecha_creacion_organizacion: Date;
    fecha_creacion_cuenta: Date;
  };
  contacto?: {
    telefono_principal?: string;
    telefono_secundario?: string;
    whatsapp?: string;
    telefono_emergencia?: string;
  };
  configuracion: {
    notificaciones_email: boolean;
    tema_oscuro: boolean;
    idioma: string;
  };
  estado: 'activo' | 'inactivo' | 'suspendido';
  fecha_actualizacion: Date;
  fecha_eliminacion?: Date;
}

const organizadorSchema = new Schema<IOrganizador>({
  clave_organizacion: {
    type: String,
    required: true,
    unique: true
  },
  datos_personales: {
    correo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    contraseña: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    apellido_p: {
      type: String,
      required: true,
      trim: true
    },
    apellido_m: {
      type: String,
      required: true,
      trim: true
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
    icono_perfil: String,
    lugar_residencia: {
      calle: String,
      colonia: String,
      municipio: String,
      estado: String,
      pais: String
    }
  },
  datos_organizacion: {
    nombre_organizacion: {
      type: String,
      required: true
    },
    fecha_creacion_organizacion: {
      type: Date,
      required: true
    },
    fecha_creacion_cuenta: {
      type: Date,
      default: Date.now
    }
  },
  contacto: {
    telefono_principal:
      String,

    telefono_emergencia: String
  },
  configuracion: {
    notificaciones_email: {
      type: Boolean,
      default: true
    },
    tema_oscuro: {
      type: Boolean,
      default: false
    },
    idioma: {
      type: String,
      default: 'es'
    }
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo', 'suspendido'],
    default: 'activo'
  },
  fecha_actualizacion: {
    type: Date,
    default: Date.now
  },
  fecha_eliminacion: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  collection: 'Organizador'
});

export default mongoose.model<IOrganizador>('Organizador', organizadorSchema);