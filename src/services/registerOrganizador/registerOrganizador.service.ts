
//service/registerOrganuzador.service.ts.
import bcrypt from 'bcrypt';
import Organizador, { IOrganizador } from '../../models/BD/Organizador';
import { CrearOrganizadorInput } from '../../types/organizador.types';

class LoginOrganizadorService{
     async generarClaveOrganizacion(
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    fechaNacimiento: Date
  ): Promise<string> {
    // 1. Normalizar y limpiar textos
    const normalizarTexto = (texto: string): string => {
      return texto
        .toUpperCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/Ñ/g, 'N')
        .replace(/[^A-Z]/g, ''); // Solo letras
    };

    // 2. Extraer las primeras 3 letras del nombre
    const nombreLimpio = normalizarTexto(nombre);
    const codigoNombre = (nombreLimpio.substring(0, 3) + 'XXX').substring(0, 3);

    // 3. Obtener contador secuencial
    // Buscar cuántos organizadores ya tienen este patrón de nombre
    const patronBase = `ORG-${codigoNombre}`;
    const organizadoresExistentes = await Organizador.find({
      clave_organizacion: new RegExp(`^${patronBase}\\d{3}-`)
    }).sort({ clave_organizacion: -1 });

    let contador = 1;
    if (organizadoresExistentes.length > 0) {
      // Extraer el número del último registro y sumar 1
      const ultimaClave = organizadoresExistentes[0].clave_organizacion;
      const match = ultimaClave.match(/ORG-[A-Z]{3}(\d{3})-/);
      if (match) {
        contador = parseInt(match[1]) + 1;
      }
    }

    const contadorStr = contador.toString().padStart(3, '0');

    // 4. Extraer apellidos (2 letras paterno + 1 letra materno)
    const apellidoPLimpio = normalizarTexto(apellidoP);
    const apellidoMLimpio = normalizarTexto(apellidoM);
    const codigoApellidos = (
      apellidoPLimpio.substring(0, 2) + 
      apellidoMLimpio.substring(0, 1) + 
      'XXX'
    ).substring(0, 3);

    // 5. Extraer últimos 2 dígitos del año
    const año = fechaNacimiento.getFullYear().toString().slice(-2);

    // 6. Construir clave completa
    const claveCompleta = `ORG-${codigoNombre}${contadorStr}-${codigoApellidos}${año}`;

    // 7. Verificar unicidad (por si acaso)
    const existeClave = await Organizador.findOne({ clave_organizacion: claveCompleta });
    if (existeClave) {
      // Si por alguna razón ya existe, agregar un sufijo aleatorio
      const sufijo = Math.floor(Math.random() * 10);
      return `${claveCompleta}${sufijo}`;
    }

    return claveCompleta;
  }
    async verificarExistencia(correo:string, curp:string,){
 const organizadorExistente = await Organizador.findOne({
      $or: [
        { 'datos_personales.correo': correo },
        { 'datos_personales.curp': curp },
      ]
    });
    
    if (organizadorExistente) {
      if (organizadorExistente.datos_personales.correo === correo) {
        throw new Error('Ya existe un organizador con ese correo');
      } else if (organizadorExistente.datos_personales.curp === curp) {
        throw new Error('Ya existe un organizador con ese CURP');
      } else {
        throw new Error('Ya existe un organizador con esa clave de organización');
      }
    }
  }

  /*Encriptación de contraseña */
  async encriptarContraseña(contraseña:string): Promise<string>{
        const saltRounds = 12;
       return await bcrypt.hash(contraseña, saltRounds);
  }


async crearOrganizador(datos: CrearOrganizadorInput): Promise<IOrganizador>{
const {
    

      datos_personales,
      datos_organizacion,
      contacto,
      configuracion
    } = datos;

 await this.verificarExistencia(
      datos_personales.correo,
      datos_personales.curp,
    );
     const clave_organizacion = await this.generarClaveOrganizacion(
      datos_personales.nombre,
      datos_personales.apellido_p,
      datos_personales.apellido_m,
      new Date(datos_personales.fecha_nacimiento)
    );

    // Encriptar contraseña
    const contraseñaEncriptada = await this.encriptarContraseña(
      datos_personales.contraseña
    );

    // Crear organizador
    const nuevoOrganizador = new Organizador({
      clave_organizacion,
      datos_personales: {
        ...datos_personales,
        contraseña: contraseñaEncriptada,
        fecha_nacimiento: new Date(datos_personales.fecha_nacimiento)
      },
      datos_organizacion: {
        ...datos_organizacion,
        fecha_creacion_organizacion: new Date(datos_organizacion.fecha_creacion_organizacion),
        fecha_creacion_cuenta: new Date()
      },
      contacto,
      configuracion: {
        notificaciones_email: configuracion?.notificaciones_email ?? true,
        tema_oscuro: configuracion?.tema_oscuro ?? false,
        idioma: configuracion?.idioma ?? 'es'
      },
      estado: 'activo',
      fecha_actualizacion: new Date()
    });

    // Guardar en BD
    return await nuevoOrganizador.save();
  }
   /**
   * Obtiene un organizador sin la contraseña
   */
  obtenerOrganizadorSinContraseña(organizador: IOrganizador) {
    const org = organizador.toObject();
    delete org.datos_personales.contraseña;
    return org;
  }

  /**
   * Valida el formato del CURP Se podrá mejorar esto para comprobar
   */
  validarFormatoCURP(curp: string): boolean {
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
    return curpRegex.test(curp);
  }
 validarCURPCompleto(
    curp: string,
    nombre: string,
    apellidoP: string,
    apellidoM: string,
    fechaNacimiento: Date,
    sexo: 'H' | 'M'
  ): { valido: boolean; errores: string[] } {
    const errores: string[] = [];

    // 1. Validar formato básico
    if (!this.validarFormatoCURP(curp)) {
      errores.push('El formato del CURP no es válido');
      return { valido: false, errores };
    }

    curp = curp.toUpperCase();

    // 2. Extraer componentes del CURP
    const curpApellidoP = curp.substring(0, 2);
    const curpApellidoM = curp.charAt(2);
    const curpNombre = curp.charAt(3);
    const curpFecha = curp.substring(4, 10); // AAMMDD
    const curpSexo = curp.charAt(10);

    // 3. Validar apellido paterno
    const primeraLetraApellidoP = this.obtenerPrimeraLetra(apellidoP);
    const primeraVocalApellidoP = this.obtenerPrimeraVocal(apellidoP);
    
    if (curpApellidoP.charAt(0) !== primeraLetraApellidoP) {
      errores.push(`La primera letra del apellido paterno no coincide. Esperado: ${primeraLetraApellidoP}, En CURP: ${curpApellidoP.charAt(0)}`);
    }
    
    if (curpApellidoP.charAt(1) !== primeraVocalApellidoP) {
      errores.push(`La primera vocal del apellido paterno no coincide. Esperado: ${primeraVocalApellidoP}, En CURP: ${curpApellidoP.charAt(1)}`);
    }

    // 4. Validar apellido materno
    const primeraLetraApellidoM = this.obtenerPrimeraLetra(apellidoM);
    if (curpApellidoM !== primeraLetraApellidoM) {
      errores.push(`La inicial del apellido materno no coincide. Esperado: ${primeraLetraApellidoM}, En CURP: ${curpApellidoM}`);
    }

    // 5. Validar nombre
    const primeraLetraNombre = this.obtenerPrimeraLetra(nombre);
    if (curpNombre !== primeraLetraNombre) {
      errores.push(`La inicial del nombre no coincide. Esperado: ${primeraLetraNombre}, En CURP: ${curpNombre}`);
    }

    // 6. Validar fecha de nacimiento
   const año = fechaNacimiento.getUTCFullYear();
const mes = String(fechaNacimiento.getUTCMonth() + 1).padStart(2, '0');
const dia = String(fechaNacimiento.getUTCDate()).padStart(2, '0');
const añoCorto = String(año).substring(2, 4);
const fechaEsperada = `${añoCorto}${mes}${dia}`;

    if (curpFecha !== fechaEsperada) {
      errores.push(`La fecha de nacimiento no coincide. Esperado: ${fechaEsperada}, En CURP: ${curpFecha}`);
    }

    // 7. Validar sexo
    if (curpSexo !== sexo) {
      errores.push(`El sexo no coincide. Esperado: ${sexo}, En CURP: ${curpSexo}`);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Obtiene la primera letra de una cadena (sin Ñ ni caracteres especiales)
   */
  private obtenerPrimeraLetra(texto: string): string {
    texto = texto.toUpperCase().trim();
    // Reemplazar Ñ por X según las reglas del CURP
    texto = texto.replace(/Ñ/g, 'X');
    // Quitar acentos
    texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return texto.charAt(0);
  }

  /**
   * Obtiene la primera vocal de una cadena
   */
  private obtenerPrimeraVocal(texto: string): string {
    texto = texto.toUpperCase().trim();
    // Quitar acentos
    texto = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    const vocales = ['A', 'E', 'I', 'O', 'U'];
    
    // Empezar desde el segundo carácter
    for (let i = 1; i < texto.length; i++) {
      if (vocales.includes(texto.charAt(i))) {
        return texto.charAt(i);
      }
    }
    
    // Si no hay vocal, retornar X según las reglas del CURP
    return 'X';
  }
}


export default new LoginOrganizadorService();




