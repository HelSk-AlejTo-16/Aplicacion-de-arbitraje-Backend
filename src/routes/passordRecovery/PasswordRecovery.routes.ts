import { Router } from 'express';
import PasswordRecoveryController from '../../controllers/passordRecovery/PasswordRecovery.controller';

class PasswordRecoveryRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/solicitar', PasswordRecoveryController.solicitarRecuperacion);
        this.router.post('/validar-token', PasswordRecoveryController.validarToken);
        this.router.post('/restablecer', PasswordRecoveryController.restablecerContraseña);
    }
}

const passwordRecoveryRoutes = new PasswordRecoveryRoutes;
export default passwordRecoveryRoutes.router;