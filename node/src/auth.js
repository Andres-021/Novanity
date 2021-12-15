import bcrypt from'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = 'asdasdads';

const auth = {
  checkToken: (req) => {
    let token;
    //const tokenHeader = req.headers['token'];
    try{
        // Verificamos y guardamos el token
        token = jwt.verify(req.request.headers.authorization, process.env.SECRET);
    }catch(e){
        return null;
    }
    return token; // Retornamos el token
  },
  // Funcion generadora del token
  getToken: ({_id, correo, nombre, rol}) => {
    const token = jwt.sign({id: _id, correo: correo, name: nombre, rol: rol}, process.env.SECRET, {expiresIn: '1h'});
    const refreshToken = jwt.sign({id: _id, correo: correo, rol: rol}, process.env.SECRET, {expiresIn: '10m'});
    
    return [token, refreshToken]; // Retornamos los valores
  },
  login: async(correo, contrasena, Usuario) => {
    // Buscamos si se encuentra el correo
    const user = await Usuario.findOne({'correo': correo});
    if(!user){
      return{
        success: false,
        errors: [{path: 'correo', message: 'El email no existe'}]
      }
    }    

    // Comparamos si la contrasena introducida se encuentra en algun has en mongo
    const hasPassword = await bcrypt.compare(contrasena, user.contrasena);
    if(!hasPassword){
      return{
        success: false,
        errors: [{path: 'contrasena', message: 'Contraseña incorrecta'}]
      }
    }

    // Generamos el token
    const [token, refreshToken] = auth.getToken(user);
    return{
      success: true,
      token, // Pasamos el token
      user: user,
      errors: []
    }
  }
}

export default auth;