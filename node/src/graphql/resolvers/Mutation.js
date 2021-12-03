import Usuario from "../../models/Usuario.js";

const Mutation = {
  createUsuario: async (
    _,
    { cedula, nombre, correo, contrasena, rol, estado }
  ) => {
    const newUsuario = new Usuario({
      cedula,
      nombre,
      correo,
      contrasena,
      rol,
      estado,
    });
    return await newUsuario.save();
  },
};

export default Mutation;
