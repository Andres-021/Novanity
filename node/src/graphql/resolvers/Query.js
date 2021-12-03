import Proyecto from "../../models/Proyecto.js";
import Usuario from "../../models/Usuario.js";
const Query = {
  usuarios: async () => {
    return await Usuario.find();
  },

  proyectos: async () => {
    return await Proyecto.find();
  },
};

export default Query;
