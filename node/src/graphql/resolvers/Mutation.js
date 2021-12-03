import Usuario from "../../models/Usuario.js";

const Mutation = {
  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_,{content}) => {
    const newUsuario = new Usuario(content);
    return await newUsuario.save();
  },

  updateUsuario: async (_,{ _id, cedula, nombre, correo, contrasena, rol, estado }) => {
    const updateUsuario = {
      cedula,
      nombre,
      correo,
      contrasena,
      rol,
      estado
    }
    return await Usuario.findByIdAndUpdate(_id, updateUsuario);
  }

  // En caso de usar content
  // updateUsuario: async (_,{_id, content}) => {
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // }
  
};

export default Mutation;
