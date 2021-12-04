import Usuario from "../../models/Usuario.js";

const Mutation = {
  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_,{content}) => {
    try{

      const newUsuario = new Usuario(content);
      return await newUsuario.save();
    }catch{
    }
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



    // Usuario.updateOne(id, {
    //   $push:{
    //     "avances":{
    //       $each:[{
    //         "descripcion":"saque a paser al perro",
    //         "descripcion":"saque a paser al perro",
    //         "descripcion":"saque a paser al perro"
    //       }]
    //     }
    //   }
    // });
    return await Usuario.findByIdAndUpdate(_id, updateUsuario);
  }

  // En caso de usar content
  // updateUsuario: async (_,{_id, content}) => {
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // }
  
};

export default Mutation;
