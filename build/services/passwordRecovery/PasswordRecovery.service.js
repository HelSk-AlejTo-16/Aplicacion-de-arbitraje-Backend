"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Organizador_1 = __importDefault(require("../../models/BD/Organizador"));
const Arbitro_1 = __importDefault(require("../../models/BD/Arbitro"));
const PasswordResetToken_1 = __importDefault(require("../../models/BD/PasswordResetToken"));
const Email_service_1 = require("./Email.service");
class PasswordRecoveryService {
    constructor() {
        this.emailService = new Email_service_1.EmailService();
    }
    /**
     * Solicitar recuperación de contraseña
     */
    async solicitarRecuperacion(correo, typeUser) {
        try {
            // Buscar organizador por correo
            var usuario;
            if (typeUser = "organizador") {
                usuario = await Organizador_1.default.findOne({
                    'datos_personales.correo': correo.toLowerCase(),
                    estado: 'activo'
                });
            }
            else {
                usuario = await Arbitro_1.default.findOne({
                    'datos_personales.correo': correo.toLowerCase(),
                    estado: 'activo'
                });
            }
            if (!usuario) {
                return {
                    success: true,
                    message: 'Si el correo existe en nuestro sistema, recibirás un enlace para recuperar tu contraseña.'
                };
            }
            // Generar token único
            const token = crypto_1.default.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora
            // Invalidar tokens anteriores no utilizados
            await PasswordResetToken_1.default.updateMany({
                usuario_id: usuario._id,
                used: false
            }, {
                used: true
            });
            // Crear nuevo token
            const resetToken = new PasswordResetToken_1.default({
                usuario_id: usuario._id,
                token,
                expires_at: expiresAt,
                usuario_rol: typeUser
            });
            await resetToken.save();
            // Enviar correo con enlace de recuperación
            await this.emailService.enviarCorreoRecuperacion(correo, usuario.datos_personales.nombre, token);
            return {
                success: true,
                message: 'Si el correo existe en nuestro sistema, recibirás un enlace para recuperar tu contraseña.'
            };
        }
        catch (error) {
            console.error('Error en solicitarRecuperacion:', error);
            throw new Error('Error al procesar la solicitud de recuperación');
        }
    }
    /**
     * Validar token de recuperación
     */
    async validarToken(token) {
        try {
            const resetToken = await PasswordResetToken_1.default.findOne({
                token,
                used: false,
                expires_at: { $gt: new Date() }
            });
            if (!resetToken) {
                return {
                    valid: false,
                    message: 'El enlace de recuperación es inválido o ha expirado.'
                };
            }
            // Obtener el email según el rol del usuario
            let email = '';
            let usuario;
            switch (resetToken.usuario_rol) {
                case 'organizador':
                    usuario = await Organizador_1.default.findById(resetToken.usuario_id);
                    email = usuario?.datos_personales?.correo || '';
                    break;
                case 'arbitro':
                    usuario = await Arbitro_1.default.findById(resetToken.usuario_id);
                    email = usuario?.datos_personales?.correo || '';
                    break;
                default:
                    return {
                        valid: false,
                        message: 'Rol de usuario no válido.'
                    };
            }
            if (!usuario) {
                return {
                    valid: false,
                    message: 'Usuario no encontrado.'
                };
            }
            if (!email) {
                return {
                    valid: false,
                    message: 'No se pudo obtener el email del usuario.'
                };
            }
            return {
                valid: true,
                message: 'Token válido',
                usuario_id: resetToken.usuario_id.toString(),
                usuario_rol: resetToken.usuario_rol,
                email: email
            };
        }
        catch (error) {
            console.error('Error en validarToken:', error);
            return {
                valid: false,
                message: 'Error al validar el token'
            };
        }
    }
}
exports.PasswordRecoveryService = PasswordRecoveryService;
exports.default = new PasswordRecoveryService();
