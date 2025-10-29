"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const PasswordRecovery_routes_1 = __importDefault(require("./routes/passordRecovery/PasswordRecovery.routes"));
const registerOrganizador_routes_1 = __importDefault(require("./routes/registerOrganizador/registerOrganizador.routes"));
const loginOrganizador_routes_1 = __importDefault(require("./routes/loginOrganizador/loginOrganizador.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3006);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '30mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '30mb', extended: false }));
    }
    routes() {
        this.app.use('/api/password-recovery', PasswordRecovery_routes_1.default);
        this.app.use('/api/auth', registerOrganizador_routes_1.default);
        this.app.use('/api/auth', loginOrganizador_routes_1.default);
    }
    async start() {
        await (0, database_1.connectDB)();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
