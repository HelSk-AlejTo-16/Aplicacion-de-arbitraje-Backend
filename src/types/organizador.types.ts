import { IOrganizador } from '../../src/models/BD/Organizador';

/**
 * Tipo para crear un organizador (datos del body del request)
 * Derivado del modelo IOrganizador pero adaptado para HTTP requests
 * NOTA: clave_organizacion se genera automáticamente, no se envía en el body
 */
export type CrearOrganizadorInput = Omit<
  IOrganizador,
  '_id' | 'clave_organizacion' | 'fecha_actualizacion' | 'fecha_eliminacion' | 'createdAt' | 'updatedAt' | 'estado'
> & {
  datos_personales: Omit<IOrganizador['datos_personales'], 'fecha_nacimiento'> & {
    fecha_nacimiento: string; // String porque viene del body como "YYYY-MM-DD"
  };
  datos_organizacion: Omit<IOrganizador['datos_organizacion'], 'fecha_creacion_organizacion' | 'fecha_creacion_cuenta'> & {
    fecha_creacion_organizacion: string; // String porque viene del body
  };
  configuracion?: {
    notificaciones_email?: boolean;
    tema_oscuro?: boolean;
    idioma?: string;
  };
};