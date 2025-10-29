import { Router } from "express";
import { registrarOrganizador } from "../../controllers/registerOrganizador/registerOrganizadorController";

class RegisterOrganizadorRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.post('/registerOrganizador', registrarOrganizador);
    }
}
const registerOrganizadorRoutes = new RegisterOrganizadorRoutes;
export default registerOrganizadorRoutes.router;