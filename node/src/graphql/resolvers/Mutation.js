import bcrypt from 'bcrypt';

// -- Modulos --
import Usuario from "../../models/Usuario.js";
import Proyecto from "../../models/Proyecto.js";
import auth from '../../auth.js';

const formatErrors = (error, otherErrors) => {
  const errors = error.errors;
  let objErrors = []

  // Si errors es indefinido significa que no hubo problema con el try
  // entonces retornamos otherErrors
  if(errors){
    Object.entries(errors).map(error =>{
      const {path, message} = error[1];
      objErrors.push({path, message})
    });
    // Concatenamos para mostrar los errores juntos
    objErrors = objErrors.concat(otherErrors);
    return objErrors;
  }else if(otherErrors.length){
    return otherErrors;
  }
  

  const unknowError = {}
  // Pero si ningun if anterior sucede, buscamos el caso de error
  // Esto es solo si no obtenemos ningun error anterior o es un error no visible
  switch(error.code){
    case 11000:
      unknowError.path = 'correo'
      unknowError.message = 'El correo ya se encuentra en uso.'
      //console.log(objErrors)
      break;

    default:
      unknowError.path = 'Desconocido'
      unknowError.message = error.message
  }

  return [unknowError];
}

const Mutation = {
  login: async(_,{correo, contrasena})  => auth.login(correo, contrasena, Usuario),
  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_, {correo, cedula, nombre, contrasena, rol, estado}) => {
    
    const otherErrors = []
    try{

      if(contrasena.length<8){
        otherErrors.push({path: 'contrasena', message: 'La contraseña debe tener minimo 8 caracteres.'})
      }

      if(otherErrors.length){
        throw otherErrors;
      }
      
      // Creacion de hash para contraseña
      const hashpassword = await bcrypt.hash(contrasena, 10);
      const user = await Usuario.create({cedula, nombre, correo, contrasena: hashpassword, rol, estado });

      return {
        // Como en el schema de usuario el email es unique
        // Si intentan introducir un email repetido success sera falso, de lo contrario tru
        success: user && user._id? true: false,
        errors: []
      }
    }catch(e){
      //console.log(e)
      return {
        success: false,
        errors: formatErrors(e, otherErrors)
      }
    }
  },

  // updateUsuario: async (_,{content}) =>{
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // },
  

  estadoUsuario: async(_,{_id, estado}) => {
    try{
      // Se hace la busqueda del usuario a registrar en caso de encontrarlo retornamos los valores
      const user = await Usuario.findByIdAndUpdate(_id, {'estado': estado})

      if(user){

        return user
      }else return null; // Si falla el if, user retorna null
      // console.log(res);
    }catch(e){
      return e;
    }
  },

  editUsuario: async (root, args) => {
    //se crea mutacion para editar uno o varios datos de un registro de la coleccion usuarios ingresando el id -> se agregan los parametros en el schema
    try {
      const usuario = await Usuario.findOne({ _id: args._id });

      if (args.nombre) {
        usuario.nombre = args.nombre;
      }
      if (args.cedula) {
        usuario.cedula = args.cedula;
      }
      if (args.correo) {
        usuario.correo = args.correo;
      }

      if (args.contrasena) {
        usuario.contrasena = args.contrasena;
      }
      if (args.rol) {
        usuario.rol = args.rol;
      }
      if (args.estado) {
        usuario.estado = args.estado;
      }
      
      // Como antes de cambiar los datos se realiza una busquda, podemos comparar los roles
      // para asi saber cual elemento cambiar o modificar.

      if(usuario.rol === 'Lider'){
        // Tomamos el id del usuario que actualizo su perfil y lo buscamos en proyectos participados.
        // Luego en proyecto actualizamos el dato que cambio el usuario o edito en su perfil.
        await Proyecto.findByIdAndUpdate({'id_lider': args._id}, {'nombre_lider': args._id});
      }

      if(usuario.rol === 'Estudiante'){

        await Proyecto.updateOne({'avances.id_estudiante': args._id}, // Buscamos por el id_estudiante en avances
          {$set:{'avances.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
            multi:true,
            arrayFilters:[{'elem.id_estudiante': args._id}]
        });
        await Proyecto.updateOne({'inscripciones_estudiantes.id_estudiante': args._id},  // Buscamos por el id_estudiante en inscripciones
          {$set:{'inscripciones_estudiantes.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
            multi: true,
            arrayFilters:[{'elem.id_estudiante': args._id}]
        });
      }

      return await usuario.save(); // Se retorna elemento guardado.
    }catch(e){
      return e;
    }
  },

  addAvance: async (_, { _id, content }) => {
    //  return await Proyecto.updateOne(id,{
    //   $push:{
    //     "avances":{
    //       $each:[content]
    //     }/////
    //   }{
    // });
    try {
      await Proyecto.findByIdAndUpdate(_id, {
        $push: { avances: content },
      });
      return content;
    } catch (err) {
      return err;
    }
  },

  //Permite cambiar el estado de una inscripcion de un estudiantes a un proyecto. Se debe ingresar id del proyecto, el id de la inscripcion que se quiere editar y el nuevo estado.

  editEstadoInscripcion: async (root, args) => {
    const proyecto = await Proyecto.findOne({ _id: args.id_proyecto });
    const buscar = (i) => i._id == args.id_inscripcion;
    const inscripcion = proyecto.inscripciones_estudiantes.find(buscar);
    inscripcion.estado = args.nuevoEstado;
    return proyecto.save();
  },

  //Permite agregar la incripción de un estudiante a un proyecto, se debe ingresar el id del proyecto al que se quiere agregar la inscripción y los datos del estudiante.

  agregarInscripcion: async (root, args) => {
    const proyecto = await Proyecto.findOne({ _id: args._id });
    const inscripcion = {
      id_estudiante: args.id_estudiante,
      nombre_estudiante: args.nombre_estudiante,
      estado: args.estado,
    };
    proyecto.inscripciones_estudiantes.push(inscripcion);
    return proyecto.save();
  },

  //Permite crear crear un nuevo proyecto

  createProyecto: async (
    _,
    {
      nombre_proyecto,
      objetivos_generales,
      objetivos_especificos,
      presupuesto,
      fecha_ini,
      fecha_final,
      id_lider,
      nombre_lider,
      estado_inscripcion,
      estado_proyecto,
      fase,
    }
  ) => {
    const newProyecto = new Proyecto({
      nombre_proyecto,
      objetivos_generales,
      objetivos_especificos,
      presupuesto,
      fecha_ini,
      fecha_final,
      id_lider,
      nombre_lider,
      estado_inscripcion,
      estado_proyecto,
      fase,
    });
    return await newProyecto.save();
  },

  //permite editar elementos de un poyecto requeridos en las historias usuario.

  editProyecto: async (root, args) => {
    const proyecto = await Proyecto.findOne({ _id: args._id });
    if (args.nombre_proyecto) {
      proyecto.nombre_proyecto = args.nombre_proyecto;
    }
    if (args.objetivos_generales) {
      proyecto.objetivos_generales = args.objetivos_generales;
    }
    if (args.objetivos_especificos) {
      proyecto.objetivos_especificos = args.objetivos_especificos;
    }

    if (args.presupuesto) {
      proyecto.presupuesto = args.presupuesto;
    }
    if (args.fecha_ini) {
      proyecto.fecha_ini = args.fecha_ini;
    }
    if (args.fecha_final) {
      proyectofecha_final = args.fecha_final;
    }

    if (args.id_lider) {
      proyecto.id_lider = args.id_lider;
    }
    if (args.nombre_lider) {
      proyecto.nombre_lider = args.nombre_lider;
    }
    if (args.estado_inscripcion) {
      proyecto.estado_inscripcion = args.estado_inscripcion;
    }

    if (args.estado_inscripcion) {
      proyecto.estado_inscripcion = args.estado_inscripcion;
    }

    if (args.estado_proyecto) {
      proyecto.estado_proyecto = args.estado_proyecto;
    }
    if (args.fase) {
      proyecto.fase = args.fase;
    }
    return proyecto.save();
  },
};

export default Mutation;
