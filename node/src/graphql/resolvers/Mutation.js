import Usuario from "../../models/Usuario.js";
import Inscripcion from "../../models/InscripEstudiante.js";
import Proyecto from "../../models/Proyecto.js";

const Mutation = {

  // Resolver de createUsuario en el schema para realizar el registro
  // En el content estarian todos los datos de usuario
  createUsuario: async (_, {cedula, nombre, correo, contrasena, rol, estado}) => {
    const newUsuario = new Usuario({cedula, nombre, correo, contrasena, rol, estado });
    return await newUsuario.save();
  },

  // updateUsuario: async (_,{content}) =>{
  //   return await Usuario.findByIdAndUpdate(_id, content);
  // },
  

  estadoUsuario: async(_,{_id, estado}) => {
    try{
      // Se hace la busqueda del usuario a registrar en caso de encontrarlo retornamos los valores
      const user = await Usuario.findByIdAndUpdate(_id, {'estado': estado})

      if(user){

        return user
      }else return null; // Si falla el if, user retorna null
      // console.log(res);
    }catch(e){
      return e;
    }
  },

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
      
      // Como antes de cambiar los datos se realiza una busquda, podemos comparar los roles
      // para asi saber cual elemento cambiar o modificar.

      if(usuario.rol === 'Lider'){
        // Tomamos el id del usuario que actualizo su perfil y lo buscamos en proyectos participados.
        // Luego en proyecto actualizamos el dato que cambio el usuario o edito en su perfil.
        await Proyecto.findByIdAndUpdate({'id_lider': args._id}, {'nombre_lider': args._id});
      }

      if(usuario.rol === 'Estudiante'){

        await Proyecto.updateOne({'avances.id_estudiante': args._id}, // Buscamos por el id_estudiante en avances
          {$set:{'avances.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
            multi:true,
            arrayFilters:[{'elem.id_estudiante': args._id}]
        });
        await Proyecto.updateOne({'inscripciones_estudiantes.id_estudiante': args._id},  // Buscamos por el id_estudiante en inscripciones
          {$set:{'inscripciones_estudiantes.$[elem].nombre_estudiante': args.nombre}},{ // En todos los elemtos de nombre_e actualizamos por args.nombre
            multi: true,
            arrayFilters:[{'elem.id_estudiante': args._id}]
        });
      }

      return await usuario.save(); // Se retorna elemento guardado.
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