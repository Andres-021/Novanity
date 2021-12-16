import bcrypt from'bcrypt';
import jwt from "jsonwebtoken";
import "dotenv/config";
import { rule, shield, and, or, not } from "graphql-shield";


const auth = {
  checkAuth: () =>{
    const isAuthenticated = rule({ cache: 'contextual'})(async (parent, args, ctx, info) => {
      return ctx.claims !== null;
    });
    
    const isLeader = rule({ cache: 'contextual'})(async (parent, args, ctx, info) => {
      return ctx.claims.rol === "Lider";
    });

    const isStudent = rule({ cache: 'contextual'})(async (parent, args, ctx, info) => {
      return ctx.claims.rol === "Estudiante";
    });
    
    const isAdmin = rule({ cache: 'contextual'})(async (parent, args, ctx, info) => {
      return ctx.claims.rol === "Admin";
    });
    
    const permissions = shield({
      Query: {
        usuarios: and(isAuthenticated, isAdmin),
        proyectos: and(isAuthenticated),
        proyectosLider: and(isAuthenticated, or(isLeader, isAdmin)),
        proyectosEstudiante: and(isAuthenticated, or(isStudent, isAdmin)),
      },
      Mutation: {
        editUsuario: and(isAuthenticated),
        createProyecto: and(isAuthenticated, or(isLeader, isAdmin)),
        createUsuario: not(isAuthenticated)
      }
    });

    return permissions;
  }
  ,
  // Chequear token
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
  // Generar token
  getToken: (user) => {
    const token = jwt.sign({id: user._id, correo: user.correo, name: user.nombre, rol: user.rol}, process.env.SECRET, {expiresIn: '1h'});
    const refreshToken = jwt.sign({id: user._id, correo: user.correo, rol: user.rol}, process.env.SECRET, {expiresIn: '10m'});
    
    return [token, refreshToken]; // Retornamos los valores
  },
  // Logueo y manejo de errores
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