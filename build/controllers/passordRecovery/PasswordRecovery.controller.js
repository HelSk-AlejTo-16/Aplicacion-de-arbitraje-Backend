"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryController = void 0;
const PasswordRecovery_service_1 = __importDefault(require("../../services/passwordRecovery/PasswordRecovery.service"));
const RestorePassword_service_1 = __importDefault(require("../../services/passwordRecovery/RestorePassword.service"));
const Organizador_1 = __importDefault(require("../../models/BD/Organizador"));
class PasswordRecoveryController {
    async solicitarRecuperacion(req, res) {
        try {
            const { correo } = req.body;
            if (!correo) {
                return res.status(400).json({
                    success: false,
                    message: 'El correo es requerido'
                });
            }
            const usuario = await Organizador_1.default.findOne({
                'datos_personales.correo': correo.toLowerCase(),
                estado: 'activo'
            });
            var typeUser;
            if (usuario) {
                typeUser = "organizador";
            }
            else {
                typeUser = "arbitro";
            }
            const result = await PasswordRecovery_service_1.default.solicitarRecuperacion(correo, typeUser);
            res.json(result);
        }
        catch (error) {
            console.error('Error en solicitarRecuperacion controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
    async validarToken(req, res) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: 'El token es requerido'
                });
            }
            const result = await PasswordRecovery_service_1.default.validarToken(token);
            res.json(result);
        }
        catch (error) {
            console.error('Error en validarToken controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
    async restablecerContraseña(req, res) {
        try {
            const { token, nuevaContraseña } = req.body;
            if (!token || !nuevaContraseña) {
                return res.status(400).json({
                    success: false,
                    message: 'Token y nueva contraseña son requeridos'
                });
            }
            if (nuevaContraseña.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                });
            }
            const result = await RestorePassword_service_1.default.restablecerContraseña(token, nuevaContraseña);
            res.json(result);
        }
        catch (error) {
            console.error('Error en restablecerContraseña controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
    async cambiarContraseña(req, res) {
        try {
            const { contraseñaActual, nuevaContraseña } = req.body;
            const organizadorId = req.user?.id;
            if (!organizadorId) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado'
                });
            }
            if (!contraseñaActual || !nuevaContraseña) {
                return res.status(400).json({
                    success: false,
                    message: 'Contraseña actual y nueva contraseña son requeridas'
                });
            }
            const result = await RestorePassword_service_1.default.cambiarContraseña(organizadorId, contraseñaActual, nuevaContraseña);
            res.json(result);
        }
        catch (error) {
            console.error('Error en cambiarContraseña controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}
exports.PasswordRecoveryController = PasswordRecoveryController;
exports.default = new PasswordRecoveryController();
