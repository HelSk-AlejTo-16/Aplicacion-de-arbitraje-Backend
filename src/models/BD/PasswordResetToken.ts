// models/PasswordResetToken.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPasswordResetToken extends Document {
  usuario_id: mongoose.Types.ObjectId;
  usuario_rol: 'organizador' | 'arbitro' | 'entrenador';
  token: string;
  expires_at: Date;
  used: boolean;
  created_at: Date;
}

const passwordResetTokenSchema = new Schema<IPasswordResetToken>({
  usuario_id: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'usuario_rol'
  },
  usuario_rol: {
    type: String,
    required: true,
    enum: ['organizador', 'arbitro', 'entrenador']
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expires_at: {
    type: Date,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Índice para limpieza automática de tokens expirados
passwordResetTokenSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

// Índice compuesto para búsquedas eficientes
passwordResetTokenSchema.index({ usuario_id: 1, usuario_rol: 1 });
passwordResetTokenSchema.index({ token: 1, used: 1 });

export default mongoose.model<IPasswordResetToken>('PasswordResetToken', passwordResetTokenSchema);