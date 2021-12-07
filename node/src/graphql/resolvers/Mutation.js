import Usuario from "../../models/Usuario.js";
import Inscripcion from "../../models/InscripEstudiante.js";
import Proyecto from "../../models/Proyecto.js";

const Mutation = {
  login: async(_,{content}) => {
    try{
      // Se hace la busqueda del usuario a registrar en caso de encontrarlo retornamos los valores
      return await Usuario.findOne({
        "correo": content.correo,
        "contrasena": content.contrasena
      });
      // console.log(res);
    }catch(e){
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
    try{
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
      await Proyecto.findOneAndUpdate({'id_lider': args._id}, {'nombre_lider': args._id});
      await Proyecto.findOneAndUpdate(
        {'avances.id_estudiante': args._id}, // Buscamos por el id_estudiante en avances
        {$set:{'avances.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
          arrayFilters:[{'elem.id_estudiante': args._id}]
      });
      await Proyecto.findOneAndUpdate(
        {'inscripciones_estudiantes.id_estudiante': args._id},  // Buscamos por el id_estudiante en inscripciones
        {$set:{'inscripciones_estudiantes.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
          arrayFilters:[{'elem.id_estudiante': args._id}]
      });
        
      return await usuario.save();
    }catch(e){
      return e;
    }
  },

  
  createInscripcion: async (_, { nombre_estudiante, estado }) => {
    const newInscripcion = new Inscripcion(nombre_estudiante, estado);
    return await newInscripcion.save();
  },

  addAvance: async(_,{_id,content})=>{
  //  return await Proyecto.updateOne(id,{
  //   $push:{
  //     "avances":{
  //       $each:[content]
  //     }/////
  //   }{
  // });
    try{
      await Proyecto.findByIdAndUpdate(_id,{
        $push:{'avances':content}
      });
      return content;
    }catch(err){
      return err;
    }
  
  }
};

export default Mutation;