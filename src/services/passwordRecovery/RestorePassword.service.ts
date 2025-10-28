// services/PasswordRecoveryService.ts
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Organizador, { IOrganizador } from '../../models/BD/Organizador';
import Arbitro, { IArbitro } from '../../models/BD/Arbitro';
import PasswordResetToken from '../../models/BD/PasswordResetToken';
import { EmailService } from './Email.service';
import { PasswordRecoveryService } from './PasswordRecovery.service';

export class RestorePasswordService {
    private emailService: EmailService;
    private passwordRecoveryService: PasswordRecoveryService;

    constructor() {
        this.emailService = new EmailService();
        this.passwordRecoveryService = new PasswordRecoveryService();
    }


    /**
     * Restablecer contraseña con token válido
     */

    async restablecerContraseña(
        token: string,
        nuevaContraseña: string
    ): Promise<{ success: boolean; message: string }> {
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
            const hashedPassword = await bcrypt.hash(nuevaContraseña, saltRounds);

            if (tokenValidation.usuario_rol === "organizador") {
                await Organizador.findByIdAndUpdate(
                    tokenValidation.usuario_id,
                    {
                        'datos_personales.contraseña': hashedPassword,
                        fecha_actualizacion: new Date()
                    }
                );
            }
            else if (tokenValidation.usuario_rol === "arbitro") {
                await Arbitro.findByIdAndUpdate(
                    tokenValidation.usuario_id,
                    {
                        contraseña: hashedPassword,
                        fecha_actualizacion: new Date()
                    }
                );
            }


            // Marcar token como utilizado
            await PasswordResetToken.findOneAndUpdate(
                { token },
                { used: true }
            );

            // Enviar correo de confirmación
            if (tokenValidation.email) {
                await this.emailService.enviarCorreoConfirmacionCambio(
                    tokenValidation.email
                );
            }

            return {
                success: true,
                message: 'Contraseña restablecida exitosamente'
            };

        } catch (error) {
            console.error('Error en restablecerContraseña:', error);
            throw new Error('Error al restablecer la contraseña');
        }
    }

    /**
     * Cambiar contraseña (cuando el usuario está loggeado)
     */
    async cambiarContraseña(
        organizadorId: string,
        contraseñaActual: string,
        nuevaContraseña: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            const organizador = await Organizador.findById(organizadorId);

            if (!organizador) {
                return {
                    success: false,
                    message: 'Organizador no encontrado'
                };
            }

            // Verificar contraseña actual
            const isCurrentPasswordValid = await bcrypt.compare(
                contraseñaActual,
                organizador.datos_personales.contraseña
            );

            if (!isCurrentPasswordValid) {
                return {
                    success: false,
                    message: 'La contraseña actual es incorrecta'
                };
            }

            // Hashear nueva contraseña
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(nuevaContraseña, saltRounds);

            // Actualizar contraseña
            await Organizador.findByIdAndUpdate(
                organizadorId,
                {
                    'datos_personales.contraseña': hashedPassword,
                    fecha_actualizacion: new Date()
                }
            );

            return {
                success: true,
                message: 'Contraseña actualizada exitosamente'
            };

        } catch (error) {
            console.error('Error en cambiarContraseña:', error);
            throw new Error('Error al cambiar la contraseña');
        }
    }
}

export default new RestorePasswordService();