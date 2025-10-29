import { Request, Response, NextFunction } from 'express';
import loginOrganizadorService from '../../services/loginOrganizador/loginOrganizador.service';

// Extender el tipo Request para incluir organizador
declare global {
  namespace Express {
    interface Request {
      organizador?: {
        organizadorId: string;
        correo: string;
        clave_organizacion: string;
        nombre_organizacion: string;
      };
    }
  }
}

export const verificarTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar y decodificar token
    const decoded = loginOrganizadorService.verificarToken(token);

    // 3. Verificar que el organizador siga activo (opcional pero recomendado)
    const organizadorActivo = await loginOrganizadorService.verificarOrganizadorActivo(decoded.correo);
    
    if (!organizadorActivo) {
      res.status(401).json({ error: 'La cuenta ya no está activa' });
      return;
    }

    // 4. Agregar datos al request
    req.organizador = decoded;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: 'Token inválido' });
    }
  }
};