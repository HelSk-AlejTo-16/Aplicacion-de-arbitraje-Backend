import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Organizador, { IOrganizador } from '../../models/BD/Organizador';

interface LoginInput {
  correo: string;
  contraseña: string;
}

interface LoginResponse {
  message: string;
  token: string;
  organizador: {
    id: string;
    clave_organizacion: string;
    correo: string;
    nombre: string;
    apellido_p: string;
    apellido_m: string;
    nombre_organizacion: string;
    estado: string;
  };
}

interface JwtPayload {
  organizadorId: string;
  correo: string;
  clave_organizacion: string;
  nombre_organizacion: string;
}

class LoginOrganizadorService {
  
  /**
   * Realiza el login del organizador
   */
  async loginOrganizador(datos: LoginInput): Promise<LoginResponse> {
    const { correo, contraseña } = datos;

    // 1. Validar que vengan los datos
    if (!correo || !contraseña) {
      throw new Error('Correo y contraseña son requeridos');
    }

    // 2. Buscar organizador por correo
    const organizador = await Organizador.findOne({
      'datos_personales.correo': correo.toLowerCase().trim()
    }) as IOrganizador | null;

    if (!organizador) {
      throw new Error('Credenciales inválidas');
    }

    // 3. Verificar que el organizador esté activo
    if (organizador.estado !== 'activo') {
      throw new Error(`La cuenta está ${organizador.estado}. Contacta al administrador`);
    }

    // 4. Verificar contraseña
    const contraseñaValida = await bcrypt.compare(
      contraseña,
      organizador.datos_personales.contraseña
    );

    if (!contraseñaValida) {
      throw new Error('Credenciales inválidas');
    }

    // 5. Generar JWT
    const token = this.generarToken(organizador);

    // 6. Actualizar fecha de última actualización (opcional)
    organizador.fecha_actualizacion = new Date();
    await organizador.save();

    // 7. Preparar respuesta sin contraseña
    return {
      message: 'Login exitoso',
      token,
      organizador: {
        id: (organizador._id as any).toString(),
        clave_organizacion: organizador.clave_organizacion,
        correo: organizador.datos_personales.correo,
        nombre: organizador.datos_personales.nombre,
        apellido_p: organizador.datos_personales.apellido_p,
        apellido_m: organizador.datos_personales.apellido_m,
        nombre_organizacion: organizador.datos_organizacion.nombre_organizacion,
        estado: organizador.estado
      }
    };
  }

  /**
   * Genera el token JWT
   */
  private generarToken(organizador: IOrganizador): string {
    const payload: JwtPayload = {
      organizadorId: (organizador._id as any).toString(),
      correo: organizador.datos_personales.correo,
      clave_organizacion: organizador.clave_organizacion,
      nombre_organizacion: organizador.datos_organizacion.nombre_organizacion
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado en las variables de entorno');
    }

    return jwt.sign(payload, secret, {
      expiresIn: '24h' // El token expira en 24 horas
    });
  }

  /**
   * Verifica y decodifica un token JWT
   */
  verificarToken(token: string): JwtPayload {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado');
    }

    try {
      return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  /**
   * Obtiene un organizador por su ID sin la contraseña
   */
  async obtenerOrganizadorPorId(id: string): Promise<IOrganizador | null> {
    const organizador = await Organizador.findById(id).select('-datos_personales.contraseña');
    return organizador;
  }

  /**
   * Verifica si un organizador existe y está activo
   */
  async verificarOrganizadorActivo(correo: string): Promise<boolean> {
    const organizador = await Organizador.findOne({
      'datos_personales.correo': correo.toLowerCase().trim(),
      estado: 'activo'
    }) as IOrganizador | null;
    return !!organizador;
  }
}
const loginOrganizadorService = new LoginOrganizadorService;
export default new LoginOrganizadorService();