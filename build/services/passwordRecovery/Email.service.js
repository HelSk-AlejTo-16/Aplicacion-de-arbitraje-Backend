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
        const resetLink = `${process.env.FRONTEND_URL}/recuperar-contraseña?token=${token}`;
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: correo,
            subject: 'Recuperación de Contraseña - Tu Organización',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recuperación de Contraseña</h2>
          <p>Hola ${nombre},</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
          <p>
            <a href="${resetLink}" 
               style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Restablecer Contraseña
            </a>
          </p>
          <p>Este enlace expirará en 1 hora. ${token}</p>

          <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
          <br>
          <p>Saludos,<br>El equipo de Tu Organización</p>
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
