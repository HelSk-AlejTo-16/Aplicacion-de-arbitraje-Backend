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
// models/Equipo.ts
const mongoose_1 = __importStar(require("mongoose"));
const jugadorEquipoSchema = new mongoose_1.Schema({
    id_jugador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    },
    fecha_inscripcion: {
        type: Date,
        default: Date.now
    },
    posicion_principal: {
        type: String,
        required: true
    },
    posiciones_secundarias: [String],
    numero_camiseta: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'lesionado', 'suspendido'],
        default: 'activo'
    },
    fecha_asignacion_numero: {
        type: Date,
        default: Date.now
    },
    historial_numeros: [Number]
});
const numeroOcupadoSchema = new mongoose_1.Schema({
    numero: {
        type: Number,
        required: true
    },
    id_jugador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    }
});
const equipoSchema = new mongoose_1.Schema({
    id_organizador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Organizador',
        required: true
    },
    id_entrenador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Entrenador',
        required: true
    },
    nombre_equipo: {
        type: String,
        required: true,
        trim: true
    },
    logo_equipo: String,
    colores: {
        principal: String,
        secundario: String
    },
    datos_equipo: {
        fecha_creacion: {
            type: Date,
            required: true
        },
        lugar_residencia: {
            colonia: String,
            municipio: String,
            estado: String
        },
        numero_licencia: {
            type: String,
            required: true,
            unique: true
        }
    },
    jugadores: [jugadorEquipoSchema],
    numeros_camiseta: {
        disponibles: [Number],
        ocupados: [numeroOcupadoSchema],
        numeros_retirados: [Number]
    },
    estadisticas: {
        partidos_jugados: {
            type: Number,
            default: 0
        },
        partidos_ganados: {
            type: Number,
            default: 0
        },
        partidos_empatados: {
            type: Number,
            default: 0
        },
        partidos_perdidos: {
            type: Number,
            default: 0
        },
        goles_favor: {
            type: Number,
            default: 0
        },
        goles_contra: {
            type: Number,
            default: 0
        },
        puntos: {
            type: Number,
            default: 0
        }
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido'],
        default: 'activo'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Equipo', equipoSchema);
