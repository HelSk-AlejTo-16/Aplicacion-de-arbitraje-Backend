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
// models/Participante.ts
const mongoose_1 = __importStar(require("mongoose"));
const equipoParticipanteSchema = new mongoose_1.Schema({
    id_equipo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    nombre_equipo: {
        type: String,
        required: true
    },
    fecha_inscripcion: {
        type: Date,
        default: Date.now
    },
    fecha_baja: Date,
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido'],
        default: 'activo'
    },
    configuracion_equipo: {
        posicion_principal: {
            type: String,
            required: true
        },
        posiciones_secundarias: [String],
        numero_camiseta: {
            type: Number,
            required: true
        },
        pie_dominante: {
            type: String,
            enum: ['derecho', 'izquierdo', 'ambidiestro'],
            default: 'derecho'
        }
    },
    restricciones_equipo: {
        puede_jugar: {
            type: Boolean,
            default: true
        },
        partidos_suspendidos: {
            type: Number,
            default: 0
        },
        motivo_suspension: String,
        fecha_fin_suspension: Date
    }
});
const estadisticasEquipoSchema = new mongoose_1.Schema({
    id_equipo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    partidos_jugados: {
        type: Number,
        default: 0
    },
    goles: {
        type: Number,
        default: 0
    },
    asistencias: {
        type: Number,
        default: 0
    },
    faltas: {
        type: Number,
        default: 0
    },
    tarjetas_amarillas: {
        type: Number,
        default: 0
    },
    tarjetas_rojas: {
        type: Number,
        default: 0
    },
    minutos_jugados: {
        type: Number,
        default: 0
    }
});
const historialNumeroSchema = new mongoose_1.Schema({
    id_equipo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    numeros: [{
            numero: {
                type: Number,
                required: true
            },
            temporada: {
                type: String,
                required: true
            },
            fecha_asignacion: {
                type: Date,
                default: Date.now
            },
            fecha_cambio: Date,
            activo: {
                type: Boolean,
                default: true
            }
        }]
});
const participanteSchema = new mongoose_1.Schema({
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
        sexo: {
            type: String,
            enum: ['M', 'F'],
            required: true
        },
        foto_participante: String,
        lugar_nacimiento: String
    },
    documentos: {
        permiso_tutor: {
            type: String,
            required: true
        },
        ine_tutor: {
            type: String,
            required: true
        },
        acta_nacimiento: {
            type: String,
            required: true
        }
    },
    datos_tutor: {
        nombre_completo: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true
        },
        parentesco: {
            type: String,
            required: true
        }
    },
    categoria: {
        id_categoria: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        },
        nombre_categoria: String,
        año_nacimiento_minimo: Number,
        año_nacimiento_maximo: Number
    },
    equipos: [equipoParticipanteSchema],
    estadisticas_generales: {
        total_partidos_jugados: {
            type: Number,
            default: 0
        },
        total_goles: {
            type: Number,
            default: 0
        },
        total_asistencias: {
            type: Number,
            default: 0
        },
        total_faltas: {
            type: Number,
            default: 0
        },
        total_tarjetas_amarillas: {
            type: Number,
            default: 0
        },
        total_tarjetas_rojas: {
            type: Number,
            default: 0
        },
        minutos_jugados: {
            type: Number,
            default: 0
        }
    },
    estadisticas_por_equipo: [estadisticasEquipoSchema],
    historial_numeros: [historialNumeroSchema],
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'suspendido'],
        default: 'activo'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Participante', participanteSchema);
