"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerOrganizadorController_1 = require("../../controllers/registerOrganizador/registerOrganizadorController");
class RegisterOrganizadorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/registerOrganizador', registerOrganizadorController_1.registrarOrganizador);
    }
}
const registerOrganizadorRoutes = new RegisterOrganizadorRoutes;
exports.default = registerOrganizadorRoutes.router;
