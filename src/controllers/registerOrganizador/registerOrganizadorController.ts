import { Request,Response } from "express";
import registerOrganizadorService from "../../services/registerOrganizador/registerOrganizador.service";
import { CrearOrganizadorInput } from "../../types/organizador.types";


export const registrarOrganizador = async (
  req: Request<{}, {}, CrearOrganizadorInput>,
  res: Response
): Promise<void> => {
  try {
    const {
      datos_personales,
      datos_organizacion,
      contacto,
      configuracion
    } = req.body;

    // ====== VALIDACIONES HTTP (responsabilidad del controlador) ======
    
    // 1. Validar que vengan los datos principales
    if (!datos_personales || !datos_organizacion || !contacto || !configuracion) {
      res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
      return;
    }

    // 2. Validar campos requeridos de datos_personales
    const camposRequeridos = [
      'correo',
      'contraseña',
      'nombre',
      'apellido_p',
      'apellido_m',
      'fecha_nacimiento',
      'curp',
      'ine',
      'sexo',
      'lugar_residencia'
    ];

    for (const campo of camposRequeridos) {
      if (!datos_personales[campo as keyof typeof datos_personales]) {
        res.status(400).json({
          success: false,
          message: `El campo ${campo} es requerido en datos_personales`
        });
        return;
      }
    }

  
// 3. Validar lugar_residencia (subdocumento anidado)
if (!datos_personales.lugar_residencia || 
    typeof datos_personales.lugar_residencia !== 'object') {
  res.status(400).json({
    success: false,
    message: 'lugar_residencia es requerido en datos_personales'
  });
  return;
}
 const camposResidencia = ['calle', 'municipio', 'estado', 'pais'];
    for (const campo of camposResidencia) {
      if (!datos_personales.lugar_residencia[campo as keyof typeof datos_personales.lugar_residencia]) {
        res.status(400).json({
          success: false,
          message: `El campo ${campo} es requerido en lugar_residencia`
        });
        return;
      }
    }

// 4. Validar contacto (subdocumento)
if (typeof contacto !== 'object') {
  res.status(400).json({
    success: false,
    message: 'contacto debe ser un objeto válido'
  });
  return;
}

// 5. Validar campos de datos_organizacion
const camposOrganizacion = ['nombre_organizacion', 'fecha_creacion_organizacion'];

for (const campo of camposOrganizacion) {
  if (!datos_organizacion[campo as keyof typeof datos_organizacion]) {
    res.status(400).json({
      success: false,
      message: `El campo ${campo} es requerido en datos_organizacion`
    });
    return;
  }
}


    // 3. Validar que el sexo sea H o M
    if (datos_personales.sexo !== 'H' && datos_personales.sexo !== 'M') {
      res.status(400).json({
        success: false,
        message: 'El sexo debe ser H (Hombre) o M (Mujer)'
      });
      return;
    }

    // 4. Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos_personales.correo)) {
      res.status(400).json({
        success: false,
        message: 'El formato del correo no es válido'
      });
      return;
    }

    // 5. Validar longitud de contraseña
    if (datos_personales.contraseña.length < 8) {
      res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres'
      });
      return;
    }

    // 6. Validar CURP con datos personales
    const validacionCURP = registerOrganizadorService.validarCURPCompleto(
      datos_personales.curp,
      datos_personales.nombre,
      datos_personales.apellido_p,
      datos_personales.apellido_m,
      new Date(datos_personales.fecha_nacimiento),
      datos_personales.sexo
    );

    if (!validacionCURP.valido) {
      res.status(400).json({
        success: false,
        message: 'El CURP no es consistente con los datos proporcionados',
        errores: validacionCURP.errores
      });
      return;
    }

    // ====== LLAMAR AL SERVICIO (lógica de negocio) ======
    const nuevoOrganizador = await registerOrganizadorService.crearOrganizador(req.body);

    // Obtener organizador sin contraseña para la respuesta
    const organizadorRespuesta = registerOrganizadorService.obtenerOrganizadorSinContraseña(
      nuevoOrganizador
    );

    // ====== RESPUESTA HTTP ======
    res.status(201).json({
      success: true,
      message: 'Organizador registrado exitosamente',
      data: organizadorRespuesta
    });

  } catch (error: any) {
    console.error('Error al registrar organizador:', error);

    // Manejo de errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({
        success: false,
        message: 'Error de validación de Mongoose',
        errores
      });
      return;
    }

    // Manejo de errores de duplicados (índice único de MongoDB)
    if (error.code === 11000) {
      const campo = Object.keys(error.keyPattern)[0];
      res.status(409).json({
        success: false,
        message: `Ya existe un registro con ese ${campo}`
      });
      return;
    }

    // Errores lanzados por el servicio (correo o CURP duplicado)
    if (error.message.includes('Ya existe')) {
      res.status(409).json({
        success: false,
        message: error.message
      });
      return;
    }

    // Error genérico del servidor
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};