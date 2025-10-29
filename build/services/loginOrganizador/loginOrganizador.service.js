"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Organizador_1 = __importDefault(require("../../models/BD/Organizador"));
class LoginOrganizadorService {
    /**
     * Realiza el login del organizador
     */
    async loginOrganizador(datos) {
        const { correo, contraseña } = datos;
        // 1. Validar que vengan los datos
        if (!correo || !contraseña) {
            throw new Error('Correo y contraseña son requeridos');
        }
        // 2. Buscar organizador por correo
        const organizador = await Organizador_1.default.findOne({
            'datos_personales.correo': correo.toLowerCase().trim()
        });
        if (!organizador) {
            throw new Error('Credenciales inválidas');
        }
        // 3. Verificar que el organizador esté activo
        if (organizador.estado !== 'activo') {
            throw new Error(`La cuenta está ${organizador.estado}. Contacta al administrador`);
        }
        // 4. Verificar contraseña
        const contraseñaValida = await bcrypt_1.default.compare(contraseña, organizador.datos_personales.contraseña);
        if (!contraseñaValida) {
            throw new Error('Credenciales inválidas');
        }
        // 5. Generar JWT
        const token = this.generarToken(organizador);
        // 6. Actualizar fecha de última actualización (opcional)
        organizador.fecha_actualizacion = new Date();
        await organizador.save();
        // 7. Preparar respuesta sin contraseña
        return {
            message: 'Login exitoso',
            token,
            organizador: {
                id: organizador._id.toString(),
                clave_organizacion: organizador.clave_organizacion,
                correo: organizador.datos_personales.correo,
                nombre_completo: `${organizador.datos_personales.nombre} ${organizador.datos_personales.apellido_p} ${organizador.datos_personales.apellido_m}`,
                nombre_organizacion: organizador.datos_organizacion.nombre_organizacion,
                estado: organizador.estado
            }
        };
    }
    /**
     * Genera el token JWT
     */
    generarToken(organizador) {
        const payload = {
            organizadorId: organizador._id.toString(),
            correo: organizador.datos_personales.correo,
            clave_organizacion: organizador.clave_organizacion,
            nombre_organizacion: organizador.datos_organizacion.nombre_organizacion
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET no está configurado en las variables de entorno');
        }
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: '24h' // El token expira en 24 horas
        });
    }
    /**
     * Verifica y decodifica un token JWT
     */
    verificarToken(token) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET no está configurado');
        }
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
    /**
     * Obtiene un organizador por su ID sin la contraseña
     */
    async obtenerOrganizadorPorId(id) {
        const organizador = await Organizador_1.default.findById(id).select('-datos_personales.contraseña');
        return organizador;
    }
    /**
     * Verifica si un organizador existe y está activo
     */
    async verificarOrganizadorActivo(correo) {
        const organizador = await Organizador_1.default.findOne({
            'datos_personales.correo': correo.toLowerCase().trim(),
            estado: 'activo'
        });
        return !!organizador;
    }
}
const loginOrganizadorService = new LoginOrganizadorService;
exports.default = new LoginOrganizadorService();
