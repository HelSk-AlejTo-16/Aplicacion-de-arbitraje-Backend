import { Router } from 'express';
import PasswordRecoveryController from '../../controller/passordRecovery/PasswordRecovery.controller';

class PasswordRecoveryRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/auth/forgot-password', PasswordRecoveryController.solicitarRecuperacion);
        this.router.post('/validar-token', PasswordRecoveryController.validarToken);
        this.router.post('/auth/reset-password', PasswordRecoveryController.restablecerContraseña);
    }
}

const passwordRecoveryRoutes = new PasswordRecoveryRoutes;
export default passwordRecoveryRoutes.router;