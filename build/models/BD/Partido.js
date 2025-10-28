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
// models/Partido.ts
const mongoose_1 = __importStar(require("mongoose"));
const jugadorAlineacionSchema = new mongoose_1.Schema({
    id_jugador: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    },
    nombre_completo: {
        type: String,
        required: true
    },
    numero_camiseta: {
        type: Number,
        required: true
    },
    posicion: {
        type: String,
        required: true
    },
    es_titular: {
        type: Boolean,
        required: true
    },
    capitán: {
        type: Boolean,
        default: false
    },
    estadisticas_partido: {
        goles: {
            type: Number,
            default: 0
        },
        asistencias: {
            type: Number,
            default: 0
        },
        faltas_cometidas: {
            type: Number,
            default: 0
        },
        faltas_recibidas: {
            type: Number,
            default: 0
        },
        tiros: {
            type: Number,
            default: 0
        },
        tiros_a_gol: {
            type: Number,
            default: 0
        },
        minutos_jugados: {
            type: Number,
            default: 0
        },
        cambios: {
            entrada: {
                type: String,
                required: true
            },
            salida: String,
            sustituido_por: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Participante'
            }
        }
    },
    sanciones: [{
            tipo: {
                type: String,
                required: true
            },
            minuto: {
                type: Number,
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
            arbitro: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Arbitro',
                required: true
            },
            hora: {
                type: String,
                required: true
            },
            consecuencia: {
                type: String,
                required: true
            }
        }]
});
const eventoPartidoSchema = new mongoose_1.Schema({
    tipo: {
        type: String,
        required: true
    },
    minuto: {
        type: Number,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    equipo: {
        type: String,
        enum: ['local', 'visitante'],
        required: true
    },
    jugador: {
        id_jugador: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Participante',
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        numero: {
            type: Number,
            required: true
        }
    },
    descripcion: String,
    asistencia: {
        id_jugador: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Participante'
        },
        nombre: String,
        numero: Number
    },
    motivo: String,
    arbitro: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Arbitro'
    },
    consecuencia: String
});
const equipoPartidoSchema = new mongoose_1.Schema({
    id_equipo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    goles: {
        type: Number,
        default: 0
    },
    alineacion: [jugadorAlineacionSchema],
    suplentes: [jugadorAlineacionSchema],
    sanciones_equipo: [{
            tipo: {
                type: String,
                required: true
            },
            minuto: {
                type: Number,
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
            arbitro: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Arbitro',
                required: true
            },
            hora: {
                type: String,
                required: true
            },
            consecuencia: {
                type: String,
                required: true
            }
        }]
});
const partidoSchema = new mongoose_1.Schema({
    codigo_unico: {
        type: String,
        required: true,
        unique: true
    },
    id_jornada: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Jornada',
        required: true
    },
    id_liga: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Liga',
        required: true
    },
    id_categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    equipos: {
        local: equipoPartidoSchema,
        visitante: equipoPartidoSchema
    },
    eventos: [eventoPartidoSchema],
    resumen_sanciones: {
        total_tarjetas_amarillas: {
            type: Number,
            default: 0
        },
        total_tarjetas_rojas: {
            type: Number,
            default: 0
        },
        tarjetas_amarillas_local: {
            type: Number,
            default: 0
        },
        tarjetas_amarillas_visitante: {
            type: Number,
            default: 0
        },
        tarjetas_rojas_local: {
            type: Number,
            default: 0
        },
        tarjetas_rojas_visitante: {
            type: Number,
            default: 0
        },
        sanciones_posteriores: [{
                id_jugador: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Participante',
                    required: true
                },
                nombre: {
                    type: String,
                    required: true
                },
                sancion: {
                    type: String,
                    required: true
                },
                motivo: {
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
                }
            }]
    },
    arbitraje: {
        id_arbitro: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Arbitro',
            required: true
        },
        arbitros_asistentes: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Arbitro'
            }],
        observaciones: String,
        incidencias_arbitrales: [{
                minuto: {
                    type: Number,
                    required: true
                },
                descripcion: {
                    type: String,
                    required: true
                },
                accion_tomada: {
                    type: String,
                    required: true
                }
            }]
    },
    cancha: {
        id_cancha: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cancha',
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        direccion: {
            type: String,
            required: true
        },
        condiciones: {
            type: String,
            required: true
        },
        observaciones_cancha: String
    },
    horarios: {
        programado: {
            fecha: {
                type: Date,
                required: true
            },
            hora_inicio: {
                type: String,
                required: true
            },
            hora_termino: {
                type: String,
                required: true
            }
        },
        real: {
            hora_inicio: String,
            hora_termino: String,
            duracion_real: Number,
            motivo_retraso: String,
            tiempo_adicional: Number
        }
    },
    resultado: {
        goles_local: {
            type: Number,
            default: 0
        },
        goles_visitante: {
            type: Number,
            default: 0
        },
        resultado_final: {
            type: String,
            enum: ['victoria_local', 'victoria_visitante', 'empate']
        },
        detalles: {
            tarjetas_amarillas: {
                type: Number,
                default: 0
            },
            tarjetas_rojas: {
                type: Number,
                default: 0
            },
            penales: {
                type: Number,
                default: 0
            },
            cambios_realizados: {
                type: Number,
                default: 0
            },
            goles_detalle: [{
                    id_jugador: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: 'Participante',
                        required: true
                    },
                    numero_camiseta: {
                        type: Number,
                        required: true
                    },
                    minuto: {
                        type: Number,
                        required: true
                    },
                    tipo: {
                        type: String,
                        required: true
                    },
                    es_penal: {
                        type: Boolean,
                        default: false
                    },
                    descripcion: {
                        type: String,
                        required: true
                    }
                }]
        }
    },
    condiciones_climaticas: {
        temperatura: Number,
        clima: String,
        humedad: Number,
        viento: String
    },
    estado: {
        type: String,
        enum: ['programado', 'en_juego', 'finalizado', 'cancelado', 'suspendido'],
        default: 'programado'
    },
    acta_cerrada: {
        type: Boolean,
        default: false
    },
    firmas: {
        arbitro_principal: {
            type: Boolean,
            default: false
        },
        capitan_local: {
            type: Boolean,
            default: false
        },
        capitan_visitante: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Partido', partidoSchema);
