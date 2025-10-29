"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PasswordRecovery_controller_1 = __importDefault(require("../../controllers/passordRecovery/PasswordRecovery.controller"));
class PasswordRecoveryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/solicitar', PasswordRecovery_controller_1.default.solicitarRecuperacion);
        this.router.post('/validar-token', PasswordRecovery_controller_1.default.validarToken);
        this.router.post('/restablecer', PasswordRecovery_controller_1.default.restablecerContraseña);
    }
}
const passwordRecoveryRoutes = new PasswordRecoveryRoutes;
exports.default = passwordRecoveryRoutes.router;
