// controllers/PasswordRecoveryController.ts
import { Request, Response } from 'express';
import PasswordRecoveryService from '../../services/passwordRecovery/PasswordRecovery.service';
import RestorePasswordService from '../../services/passwordRecovery/RestorePassword.service';
import Organizador, { IOrganizador } from '../../models/BD/Organizador';

export class PasswordRecoveryController {
    async solicitarRecuperacion(req: Request, res: Response) {
        try {
            const { correo } = req.body;

            if (!correo) {
                return res.status(400).json({
                    success: false,
                    message: 'El correo es requerido'
                });
            }

            const usuario = await Organizador.findOne({
                'datos_personales.correo': correo.toLowerCase(),
                estado: 'activo'
            });
            var typeUser;
            if (usuario) {
                typeUser = "organizador";
            } else {
                typeUser = "arbitro";
            }

            const result = await PasswordRecoveryService.solicitarRecuperacion(correo, typeUser);

            res.json(result);

        } catch (error) {
            console.error('Error en solicitarRecuperacion controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    async validarToken(req: Request, res: Response) {
        try {
            const { token } = req.body;

            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: 'El token es requerido'
                });
            }

            const result = await PasswordRecoveryService.validarToken(token);

            res.json(
                result
            );

        } catch (error) {
            console.error('Error en validarToken controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    async restablecerContraseña(req: Request, res: Response) {
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

            const result = await RestorePasswordService.restablecerContraseña(
                token,
                nuevaContraseña
            );

            res.json(result);

        } catch (error) {
            console.error('Error en restablecerContraseña controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }

    async cambiarContraseña(req: Request, res: Response) {
        try {
            const { contraseñaActual, nuevaContraseña } = req.body;
            const organizadorId = (req as any).user?.id;

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

            const result = await RestorePasswordService.cambiarContraseña(
                organizadorId,
                contraseñaActual,
                nuevaContraseña
            );

            res.json(result);

        } catch (error) {
            console.error('Error en cambiarContraseña controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    }
}

export default new PasswordRecoveryController();