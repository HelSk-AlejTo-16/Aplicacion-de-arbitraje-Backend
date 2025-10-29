"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
// services/EmailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async enviarCorreoRecuperacion(correo, nombre, token) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: correo,
            subject: 'Recuperación de Contraseña - Bioprode',
            html: `
      <div style="
        font-family: 'Segoe UI', Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        background-color: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      ">
        <div style="background-color: #22c55e; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">Recuperación de Contraseña</h2>
        </div>

        <div style="padding: 25px;">
          <p style="color: #374151; font-size: 16px;">Hola <strong>${nombre}</strong>,</p>

          <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
            Has solicitado restablecer tu contraseña en <strong>Bioprode</strong>. Usa el siguiente código para continuar con el proceso de recuperación:
          </p>

          <div style="
            background-color: #f97316;
            color: white;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 3px;
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            margin: 25px 0;
          ">
            ${token}
          </div>

          <p style="color: #4b5563; font-size: 14px;">
            Este código expirará en <strong>1 hora</strong>. Si no solicitaste este cambio, puedes ignorar este mensaje.
          </p>

          <br>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Saludos,<br>
            <strong>El equipo de Bioprode</strong>
          </p>
        </div>
      </div>
    `,
        };
        await this.transporter.sendMail(mailOptions);
    }
    async enviarCorreoConfirmacionCambio(correo) {
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: correo,
            subject: 'Contraseña Actualizada - Tu Organización',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Contraseña Actualizada</h2>
          <p>Tu contraseña ha sido actualizada exitosamente.</p>
          <p>Si no realizaste este cambio, por favor contacta con soporte inmediatamente.</p>
          <br>
          <p>Saludos,<br>El equipo de Tu Organización</p>
        </div>
      `,
        };
        await this.transporter.sendMail(mailOptions);
    }
}
exports.EmailService = EmailService;
exports.default = new EmailService();
