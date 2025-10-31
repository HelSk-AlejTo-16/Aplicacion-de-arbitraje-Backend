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
// models/Organizador.ts
const mongoose_1 = __importStar(require("mongoose"));
const organizadorSchema = new mongoose_1.Schema({
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
        sexo: {
            type: String,
            enum: ['H', 'M'],
            required: true
        },
        icono_perfil: {
            type: String,
            required: true
        },
        lugar_residencia: {
            cp: {
                type: String,
                required: true
            },
            calle: {
                type: String,
                required: true
            },
            colonia: {
                type: String,
                required: false
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
            }
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
        telefono_principal: {
            type: String,
            required: true
        },
        telefono_emergencia: {
            type: String,
            required: false
        }
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
//Creado por: cuando hagamos la parte de administrador.
exports.default = mongoose_1.default.model('Organizador', organizadorSchema);
