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
// models/Cancha.ts
const mongoose_1 = __importStar(require("mongoose"));
const canchaSchema = new mongoose_1.Schema({
    id_organizador: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Cancha', canchaSchema);
