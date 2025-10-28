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
// models/Sancion.ts
const mongoose_1 = __importStar(require("mongoose"));
const sancionSchema = new mongoose_1.Schema({
    id_jugador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    },
    id_equipo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    id_partido: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Sancion', sancionSchema);
