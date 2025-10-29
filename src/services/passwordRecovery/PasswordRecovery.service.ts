// services/PasswordRecoveryService.ts
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Organizador, { IOrganizador } from '../../models/BD/Organizador';
import Arbitro, { IArbitro } from '../../models/BD/Arbitro';
import PasswordResetToken from '../../models/BD/PasswordResetToken';
import { EmailService } from './Email.service';

export class PasswordRecoveryService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }


  /**
   * Solicitar recuperación de contraseña
   */
  async solicitarRecuperacion(correo: string, typeUser: string): Promise<{ success: boolean; message: string }> {
    try {
      // Buscar organizador por correo
      var usuario;
      if (typeUser = "organizador") {
        usuario = await Organizador.findOne({
          'datos_personales.correo': correo.toLowerCase(),
          estado: 'activo'
        });
      } else {
        usuario = await Arbitro.findOne({
          'datos_personales.correo': correo.toLowerCase(),
          estado: 'activo'
        });
      }

      console.log(usuario);

      if (!usuario) {
        console.log("Correo");
        return {
          success: true,
          message: 'Si el correo existe en nuestro sistema, recibirás un enlace para recuperar tu contraseña.'
        };

      }

      // Generar token único
      const token = crypto.randomBytes(4).toString('hex').slice(0, 8);
      const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

      // Invalidar tokens anteriores no utilizados
      await PasswordResetToken.updateMany(
        {
          usuario_id: usuario._id,
          used: false
        },
        {
          used: true
        }
      );

      // Crear nuevo token
      const resetToken = new PasswordResetToken({
        usuario_id: usuario._id,
        token,
        expires_at: expiresAt,
        usuario_rol: typeUser
      });

      await resetToken.save();

      // Enviar correo con enlace de recuperación
      await this.emailService.enviarCorreoRecuperacion(
        correo,
        usuario.datos_personales.nombre,
        token
      );

      return {
        success: true,
        message: 'Si el correo existe en nuestro sistema, recibirás un enlace para recuperar tu contraseña.'
      };

    } catch (error) {
      console.error('Error en solicitarRecuperacion:', error);
      throw new Error('Error al procesar la solicitud de recuperación');
    }
  }

  /**
   * Validar token de recuperación
   */
  async validarToken(token: string): Promise<{
    valid: boolean;
    message: string;
    usuario_id?: string;
    usuario_rol?: string;
    email?: string;
    success: boolean;
  }> {
    try {
      const resetToken = await PasswordResetToken.findOne({
        token,
        used: false,
        expires_at: { $gt: new Date() }
      });

      if (!resetToken) {
        return {
          valid: false,
          message: 'El enlace de recuperación es inválido o ha expirado.',
          success: false
        };
      }

      // Obtener el email según el rol del usuario
      let email = '';
      let usuario;

      switch (resetToken.usuario_rol) {
        case 'organizador':
          usuario = await Organizador.findById(resetToken.usuario_id);
          email = usuario?.datos_personales?.correo || '';
          break;

        case 'arbitro':
          usuario = await Arbitro.findById(resetToken.usuario_id);
          email = usuario?.datos_personales?.correo || '';
          break;

        default:
          return {
            valid: false,
            message: 'Rol de usuario no válido.',
            success: false
          };
      }

      if (!usuario) {
        return {
          valid: false,
          message: 'Usuario no encontrado.',
          success: false
        };
      }

      if (!email) {
        return {
          valid: false,
          message: 'No se pudo obtener el email del usuario.',
          success: false
        };
      }

      return {
        valid: true,
        message: 'Token válido',
        usuario_id: resetToken.usuario_id.toString(),
        usuario_rol: resetToken.usuario_rol,
        email: email,
        success: true
      };

    } catch (error) {
      console.error('Error en validarToken:', error);
      return {
        valid: false,
        success: false,
        message: 'Error al validar el token'
      };
    }
  }
}

export default new PasswordRecoveryService();