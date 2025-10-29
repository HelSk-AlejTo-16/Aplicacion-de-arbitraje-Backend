import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/database';
import passwordRecoveryRoutes from './routes/passordRecovery/PasswordRecovery.routes'
import registerOrganizadorRoutes  from './routes/registerOrganizador/registerOrganizador.routes';
import loginOrganizadorRoutes from './routes/loginOrganizador/loginOrganizador.routes';
class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3006);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({ limit: '30mb' }));
        this.app.use(express.urlencoded({ limit: '30mb', extended: false }));
    }


    routes(): void {
        this.app.use('/api/password-recovery', passwordRecoveryRoutes);
        this.app.use('/api/auth',registerOrganizadorRoutes);
        this.app.use('/api/auth', loginOrganizadorRoutes);
    }

    async start(): Promise<void> {
        await connectDB();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }


}


const server = new Server();
server.start();