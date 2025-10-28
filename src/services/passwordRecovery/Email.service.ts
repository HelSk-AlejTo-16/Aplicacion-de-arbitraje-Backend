// services/EmailService.ts
import nodemailer from 'nodemailer';

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async enviarCorreoRecuperacion(
    correo: string, 
    nombre: string, 
    token: string
  ): Promise<void> {
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

  async enviarCorreoConfirmacionCambio(correo: string): Promise<void> {
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

export default new EmailService();