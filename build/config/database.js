"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Configuración de la base de datos
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/liga';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB exitosamente');
    }
    catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Eventos de conexión
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose conectado a la base de datos');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Error en la conexión de Mongoose:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose desconectado');
});
// Cerrar conexión cuando la app se cierra
process.on('SIGINT', async () => {
    await mongoose_1.default.connection.close();
    console.log('Conexión de MongoDB cerrada por terminación de la aplicación');
    process.exit(0);
});
