import jwt from "jsonwebtoken";
import "dotenv/config";

// --- Modulos ---
import Proyecto from "../../models/Proyecto.js";
import Usuario from "../../models/Usuario.js";
import Inscripcion from "../../models/InscripEstudiante.js";


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
          email: user.correo, 
          id: user.cedula, 
          role: user.rol, 
          name: user.nombre, 
          contrasena: user.contrasena
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

  inscripciones: async () => {
    return await Inscripcion.find();
  },
};

export default Query;
