// models/Categoria.ts
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ICategoria extends Document {
  id_organizador: Types.ObjectId;
  nombre_categoria: string;
  configuracion_edad: {
    año_nacimiento_minimo: number;
    año_nacimiento_maximo: number;
    rango_edades: string;
    edad_minima: number;
    edad_maxima: number;
  };
  configuracion_juego: {
    duracion_partido: string;
    tamaño_cancha: string;
    tamaño_balon: number;
    numero_jugadores_campo: number;
  };
  descripcion: string;
  estado: 'activa' | 'inactiva';
}

const categoriaSchema = new Schema<ICategoria>({
  id_organizador: {
    type: Schema.Types.ObjectId,
    ref: 'Organizador',
    required: true
  },
  nombre_categoria: {
    type: String,
    required: true
  },
  configuracion_edad: {
    año_nacimiento_minimo: {
      type: Number,
      required: true
    },
    año_nacimiento_maximo: {
      type: Number,
      required: true
    },
    rango_edades: {
      type: String,
      required: true
    },
    edad_minima: {
      type: Number,
      required: true
    },
    edad_maxima: {
      type: Number,
      required: true
    }
  },
  configuracion_juego: {
    duracion_partido: {
      type: String,
      required: true
    },
    tamaño_cancha: {
      type: String,
      required: true
    },
    tamaño_balon: {
      type: Number,
      required: true
    },
    numero_jugadores_campo: {
      type: Number,
      required: true
    }
  },
  descripcion: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['activa', 'inactiva'],
    default: 'activa'
  }
}, {
  timestamps: true
});

export default mongoose.model<ICategoria>('Categoria', categoriaSchema);