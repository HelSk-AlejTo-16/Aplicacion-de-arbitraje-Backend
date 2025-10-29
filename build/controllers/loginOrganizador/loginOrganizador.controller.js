"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrganizadorController = void 0;
const loginOrganizador_service_1 = __importDefault(require("../../services/loginOrganizador/loginOrganizador.service"));
const loginOrganizadorController = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        const resultado = await loginOrganizador_service_1.default.loginOrganizador({
            correo,
            contraseña
        });
        res.status(200).json(resultado);
    }
    catch (error) {
        if (error instanceof Error) {
            // Errores conocidos (credenciales inválidas, cuenta suspendida, etc.)
            res.status(401).json({ error: error.message });
        }
        else {
            // Error desconocido
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};
exports.loginOrganizadorController = loginOrganizadorController;
