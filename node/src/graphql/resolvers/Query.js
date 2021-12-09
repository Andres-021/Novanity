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

  //Busca proyecto filtrandolo por su id. Se debe ingresar el id del proyecto que se quiere buscar

  proyectoId: async (root, args) => {
    return await Proyecto.find({ _id: args._id });
  },
};

export default Query;
