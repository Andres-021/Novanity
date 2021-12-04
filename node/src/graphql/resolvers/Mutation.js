import Usuario from "../../models/Usuario.js";

const Mutation = {
  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_, { content }) => {
    const newUsuario = new Usuario(content);
    return await newUsuario.save();
  },

  updateUsuario: async (
    _,
    { _id, cedula, nombre, correo, contrasena, rol, estado }
  ) => {
    const updateUsuario = {
      cedula,
      nombre,
      correo,
      contrasena,
      rol,
      estado,
    };
    return await Usuario.findByIdAndUpdate(_id, updateUsuario);
  },

  // En caso de usar content
  // updateUsuario: async (_,{_id, content}) => {
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // }

  editUsuario: async (root, args) => {
    //se crea mutacion para editar uno o varios datos de un registro de la coleccion usuarios ingresando el id -> se agregan los parametros en el schema

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
    return usuario.save();
  },
};

export default Mutation;
