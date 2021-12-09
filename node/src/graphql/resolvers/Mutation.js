import Usuario from "../../models/Usuario.js";
import Proyecto from "../../models/Proyecto.js";

const Mutation = {
  login: async (_, { content }) => {
    try {
      // Se hace la busqueda del usuario a registrar en caso de encontrarlo retornamos los valores
      return await Usuario.findOne({
        correo: content.correo,
        contrasena: content.contrasena,
      });
      // console.log(res);
    } catch (e) {
      return e;
    }
  },
  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_, { content }) => {
    const newUsuario = new Usuario(content);
    return await newUsuario.save();
  },

  // updateUsuario: async (_,{content}) =>{
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // },

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

      // Tomamos el id del usuario que actualizo su perfil y lo buscamos en proyectos participados.
      // Luego en proyecto actualizamos el dato que cambio el usuario o edito en su perfil.
      await Proyecto.findOneAndUpdate(
        { id_lider: args._id },
        { nombre_lider: args._id }
      );
      await Proyecto.findOneAndUpdate(
        { "avances.id_estudiante": args._id }, // Buscamos por el id_estudiante en avances
        { $set: { "avances.$[elem].nombre_estudiante": args.nombre } },
        {
          // En todos los elemtos de nombre_e actualizamos por args.nombre
          arrayFilters: [{ "elem.id_estudiante": args._id }],
        }
      );
      await Proyecto.findOneAndUpdate(
        { "inscripciones_estudiantes.id_estudiante": args._id }, // Buscamos por el id_estudiante en inscripciones
        {
          $set: {
            "inscripciones_estudiantes.$[elem].nombre_estudiante": args.nombre,
          },
        },
        {
          // En todos los elemtos de nombre_e actualizamos por args.nombre
          arrayFilters: [{ "elem.id_estudiante": args._id }],
        }
      );

      return await usuario.save();
    } catch (e) {
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
