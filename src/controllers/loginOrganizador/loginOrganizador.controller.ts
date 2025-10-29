import { Request, Response } from 'express';
import loginOrganizadorService from '../../services/loginOrganizador/loginOrganizador.service';

export const loginOrganizadorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, contraseña } = req.body;

    const resultado = await loginOrganizadorService.loginOrganizador({
      correo,
      contraseña
    });

    res.status(200).json(resultado);
  } catch (error) {
    if (error instanceof Error) {
      // Errores conocidos (credenciales inválidas, cuenta suspendida, etc.)
      res.status(401).json({ error: error.message });
    } else {
      // Error desconocido
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
