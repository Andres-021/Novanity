import Proyecto from "../../models/Proyecto.js";
import Usuario from "../../models/Usuario.js";
import Inscripcion from "../../models/InscripEstudiante.js";

const Query = {
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
