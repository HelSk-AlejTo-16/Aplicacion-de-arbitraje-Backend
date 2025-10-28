"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// models/Categoria.ts
const mongoose_1 = __importStar(require("mongoose"));
const categoriaSchema = new mongoose_1.Schema({
    id_organizador: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Categoria', categoriaSchema);
