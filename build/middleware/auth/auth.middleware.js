"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarTokenMiddleware = void 0;
const loginOrganizador_service_1 = __importDefault(require("../../services/loginOrganizador/loginOrganizador.service"));
const verificarTokenMiddleware = async (req, res, next) => {
    try {
        // 1. Obtener token del header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token no proporcionado' });
            return;
        }
        const token = authHeader.split(' ')[1];
        // 2. Verificar y decodificar token
        const decoded = loginOrganizador_service_1.default.verificarToken(token);
        // 3. Verificar que el organizador siga activo (opcional pero recomendado)
        const organizadorActivo = await loginOrganizador_service_1.default.verificarOrganizadorActivo(decoded.correo);
        if (!organizadorActivo) {
            res.status(401).json({ error: 'La cuenta ya no está activa' });
            return;
        }
        // 4. Agregar datos al request
        req.organizador = decoded;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(401).json({ error: 'Token inválido' });
        }
    }
};
exports.verificarTokenMiddleware = verificarTokenMiddleware;
