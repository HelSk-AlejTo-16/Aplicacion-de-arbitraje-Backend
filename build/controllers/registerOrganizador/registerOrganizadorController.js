"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarOrganizador = void 0;
const registerOrganizador_service_1 = __importDefault(require("../../services/registerOrganizador/registerOrganizador.service"));
const registrarOrganizador = async (req, res) => {
    try {
        const { datos_personales, datos_organizacion, contacto, configuracion } = req.body;
        // ====== VALIDACIONES HTTP (responsabilidad del controlador) ======
        // 1. Validar que vengan los datos principales
        if (!datos_personales || !datos_organizacion || !contacto) {
            res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos'
            });
            return;
        }
        // 2. Validar campos requeridos de datos_personales
        const camposRequeridos = [
            'correo',
            'contraseña',
            'nombre',
            'apellido_p',
            'apellido_m',
            'fecha_nacimiento',
            'curp',
            'ine',
            'sexo'
        ];
        for (const campo of camposRequeridos) {
            if (!datos_personales[campo]) {
                res.status(400).json({
                    success: false,
                    message: `El campo ${campo} es requerido en datos_personales`
                });
                return;
            }
        }
        // 3. Validar que el sexo sea H o M
        if (datos_personales.sexo !== 'H' && datos_personales.sexo !== 'M') {
            res.status(400).json({
                success: false,
                message: 'El sexo debe ser H (Hombre) o M (Mujer)'
            });
            return;
        }
        // 4. Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos_personales.correo)) {
            res.status(400).json({
                success: false,
                message: 'El formato del correo no es válido'
            });
            return;
        }
        // 5. Validar longitud de contraseña
        if (datos_personales.contraseña.length < 8) {
            res.status(400).json({
                success: false,
                message: 'La contraseña debe tener al menos 8 caracteres'
            });
            return;
        }
        // 6. Validar CURP con datos personales
        const validacionCURP = registerOrganizador_service_1.default.validarCURPCompleto(datos_personales.curp, datos_personales.nombre, datos_personales.apellido_p, datos_personales.apellido_m, new Date(datos_personales.fecha_nacimiento), datos_personales.sexo);
        if (!validacionCURP.valido) {
            res.status(400).json({
                success: false,
                message: 'El CURP no es consistente con los datos proporcionados',
                errores: validacionCURP.errores
            });
            return;
        }
        // ====== LLAMAR AL SERVICIO (lógica de negocio) ======
        const nuevoOrganizador = await registerOrganizador_service_1.default.crearOrganizador(req.body);
        // Obtener organizador sin contraseña para la respuesta
        const organizadorRespuesta = registerOrganizador_service_1.default.obtenerOrganizadorSinContraseña(nuevoOrganizador);
        // ====== RESPUESTA HTTP ======
        res.status(201).json({
            success: true,
            message: 'Organizador registrado exitosamente',
            data: organizadorRespuesta
        });
    }
    catch (error) {
        console.error('Error al registrar organizador:', error);
        // Manejo de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map((e) => e.message);
            res.status(400).json({
                success: false,
                message: 'Error de validación de Mongoose',
                errores
            });
            return;
        }
        // Manejo de errores de duplicados (índice único de MongoDB)
        if (error.code === 11000) {
            const campo = Object.keys(error.keyPattern)[0];
            res.status(409).json({
                success: false,
                message: `Ya existe un registro con ese ${campo}`
            });
            return;
        }
        // Errores lanzados por el servicio (correo o CURP duplicado)
        if (error.message.includes('Ya existe')) {
            res.status(409).json({
                success: false,
                message: error.message
            });
            return;
        }
        // Error genérico del servidor
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.registrarOrganizador = registrarOrganizador;
