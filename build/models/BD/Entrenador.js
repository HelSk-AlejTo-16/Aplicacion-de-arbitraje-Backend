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
// models/Entrenador.ts
const mongoose_1 = __importStar(require("mongoose"));
const entrenadorSchema = new mongoose_1.Schema({
    id_organizador: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model('Entrenador', entrenadorSchema);
