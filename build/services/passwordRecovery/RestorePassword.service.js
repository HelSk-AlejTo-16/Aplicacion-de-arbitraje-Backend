"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestorePasswordService = void 0;
// services/PasswordRecoveryService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const Organizador_1 = __importDefault(require("../../models/BD/Organizador"));
const Arbitro_1 = __importDefault(require("../../models/BD/Arbitro"));
const PasswordResetToken_1 = __importDefault(require("../../models/BD/PasswordResetToken"));
const Email_service_1 = require("./Email.service");
const PasswordRecovery_service_1 = require("./PasswordRecovery.service");
class RestorePasswordService {
    constructor() {
        this.emailService = new Email_service_1.EmailService();
        this.passwordRecoveryService = new PasswordRecovery_service_1.PasswordRecoveryService();
    }
    /**
     * Restablecer contraseña con token válido
     */
    async restablecerContraseña(token, nuevaContraseña) {
        try {
            // Validar token
            const tokenValidation = await this.passwordRecoveryService.validarToken(token);
            if (!tokenValidation.valid || !tokenValidation.usuario_rol || !tokenValidation.usuario_id) {
                return {
                    success: false,
                    message: tokenValidation.message
                };
            }
            // Hashear nueva contraseña
            const saltRounds = 12;
            const hashedPassword = await bcrypt_1.default.hash(nuevaContraseña, saltRounds);
            if (tokenValidation.usuario_rol === "organizador") {
                await Organizador_1.default.findByIdAndUpdate(tokenValidation.usuario_id, {
                    'datos_personales.contraseña': hashedPassword,
                    fecha_actualizacion: new Date()
                });
            }
            else if (tokenValidation.usuario_rol === "arbitro") {
                await Arbitro_1.default.findByIdAndUpdate(tokenValidation.usuario_id, {
                    contraseña: hashedPassword,
                    fecha_actualizacion: new Date()
                });
            }
            // Marcar token como utilizado
            await PasswordResetToken_1.default.findOneAndUpdate({ token }, { used: true });
            // Enviar correo de confirmación
            if (tokenValidation.email) {
                await this.emailService.enviarCorreoConfirmacionCambio(tokenValidation.email);
            }
            return {
                success: true,
                message: 'Contraseña restablecida exitosamente'
            };
        }
        catch (error) {
            console.error('Error en restablecerContraseña:', error);
            throw new Error('Error al restablecer la contraseña');
        }
    }
    /**
     * Cambiar contraseña (cuando el usuario está loggeado)
     */
    async cambiarContraseña(organizadorId, contraseñaActual, nuevaContraseña) {
        try {
            const organizador = await Organizador_1.default.findById(organizadorId);
            if (!organizador) {
                return {
                    success: false,
                    message: 'Organizador no encontrado'
                };
            }
            // Verificar contraseña actual
            const isCurrentPasswordValid = await bcrypt_1.default.compare(contraseñaActual, organizador.datos_personales.contraseña);
            if (!isCurrentPasswordValid) {
                return {
                    success: false,
                    message: 'La contraseña actual es incorrecta'
                };
            }
            // Hashear nueva contraseña
            const saltRounds = 12;
            const hashedPassword = await bcrypt_1.default.hash(nuevaContraseña, saltRounds);
            // Actualizar contraseña
            await Organizador_1.default.findByIdAndUpdate(organizadorId, {
                'datos_personales.contraseña': hashedPassword,
                fecha_actualizacion: new Date()
            });
            return {
                success: true,
                message: 'Contraseña actualizada exitosamente'
            };
        }
        catch (error) {
            console.error('Error en cambiarContraseña:', error);
            throw new Error('Error al cambiar la contraseña');
        }
    }
}
exports.RestorePasswordService = RestorePasswordService;
exports.default = new RestorePasswordService();
