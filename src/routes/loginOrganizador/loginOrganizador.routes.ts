// routes/auth.routes.ts
import { Router } from 'express';
import { loginOrganizadorController } from '../../controllers/loginOrganizador/loginOrganizador.controller';
import { verificarTokenMiddleware } from '../../middleware/auth/auth.middleware';
import loginOrganizadorService from '../../services/loginOrganizador/loginOrganizador.service'

class LoginOrganizadorRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }
  config(): void {
    this.router.post('/loginOrganizador', loginOrganizadorController);
    this.router.get('/perfil-organizador', verificarTokenMiddleware, async (req, res) => {
      try {
        const organizadorId = req.organizador?.organizadorId;

        if (!organizadorId) {
          return res.status(401).json({ error: 'No autorizado' });
        }

        const organizador = await loginOrganizadorService.obtenerOrganizadorPorId(organizadorId);

        if (!organizador) {
          return res.status(404).json({ error: 'Organizador no encontrado' });
        }

        res.json({ organizador });
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener perfil' });
      }
    });

  }
}


const loginOrganizadorRoutes = new LoginOrganizadorRoutes;
export default loginOrganizadorRoutes.router;