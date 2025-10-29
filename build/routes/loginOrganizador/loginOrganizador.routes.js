"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.routes.ts
const express_1 = require("express");
const loginOrganizador_controller_1 = require("../../controllers/loginOrganizador/loginOrganizador.controller");
const auth_middleware_1 = require("../../middleware/auth/auth.middleware");
const loginOrganizador_service_1 = __importDefault(require("../../services/loginOrganizador/loginOrganizador.service"));
class LoginOrganizadorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/loginOrganizador', loginOrganizador_controller_1.loginOrganizadorController);
        this.router.get('/perfil-organizador', auth_middleware_1.verificarTokenMiddleware, async (req, res) => {
            try {
                const organizadorId = req.organizador?.organizadorId;
                if (!organizadorId) {
                    return res.status(401).json({ error: 'No autorizado' });
                }
                const organizador = await loginOrganizador_service_1.default.obtenerOrganizadorPorId(organizadorId);
                if (!organizador) {
                    return res.status(404).json({ error: 'Organizador no encontrado' });
                }
                res.json({ organizador });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener perfil' });
            }
        });
    }
}
const loginOrganizadorRoutes = new LoginOrganizadorRoutes;
exports.default = loginOrganizadorRoutes.router;
