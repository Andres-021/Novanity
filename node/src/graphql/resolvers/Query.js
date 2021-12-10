import jwt from "jsonwebtoken";
import "dotenv/config";

// --- Modulos ---
import Proyecto from "../../models/Proyecto.js";
import Usuario from "../../models/Usuario.js";

const Query = {
  login: async(_,{correo, contrasena}) => {
    const notUser = {
      _id: 'Undefined',
      cedula: 'Undefined',
      nombre: 'Undefined',
      correo: 'Undefined',
      contrasena: 'Undefined',
      rol: 'Undefined',
      estado: 'Undefined'
    };

    try{
      // Se hace la busqueda del usuario a registrar en caso de encontrarlo retornamos los valores
      const user = await Usuario.findOne({
        "correo": correo,
        "contrasena": contrasena
      });

      if(user){
        const token = jwt.sign({
          user: user._id,
          email: user.correo, 
          password: user.contrasena,
          role: user.rol, 
        }, process.env.SECRET, {expiresIn:'1h'});
        
        return {
          success: true,
          user: user,
          token: token
        };
      }else return {
        success: false,
        user: notUser,
        token: 'Undefined'
      };
      // console.log(res);
    }catch(e){
      return e;
    }
  },

  usuarios: async () => {
    return await Usuario.find();
  },
  
  proyectos: async () => {
    return await Proyecto.find();
  },

  //Consulta en la que se filtran todos los proyectos de un lider, se debe ingresar id del lider.

  proyectosLider: async (root, args) => {
    return await Proyecto.find({ id_lider: args.id_lider });
  },

  //Busca proyecto filtrandolo por su id. Se debe ingresar el id del proyecto que se quiere buscar

  proyectoId: async (root, args) => {
    return await Proyecto.find({ _id: args._id });
  },
};

export default Query;
