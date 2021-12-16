// --- Modulos ---
import Proyecto from "../../models/Proyecto.js";
import Usuario from "../../models/Usuario.js";

const Query = {
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

  //proyectos estudiante

  proyectosEstudiante: async (root, args) => {
    const id_estudiante = args.id_estudiante;
    let proyectos = await Proyecto.find();
    proyectos = proyectos.filter((i) =>
      i.inscripciones_estudiantes.some((e) => e.id_estudiante == id_estudiante)
    );
    return proyectos;
  },

  //Busca proyecto filtrandolo por su id. Se debe ingresar el id del proyecto que se quiere buscar

  proyectoId: async (root, args) => {
    return await Proyecto.find({ _id: args._id });
  },

  //busca usuario por id
  usuarioId: async (root, args) => {
    return await Usuario.find({ _id: args._id });
  },

  //filtra usuarios por rol

  usuariosRol: async (root, args) => {
    return await Usuario.find({ rol: args.rol });
  },
};

export default Query;
