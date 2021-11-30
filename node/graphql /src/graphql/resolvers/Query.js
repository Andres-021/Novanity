import Usuario from "../../models/Usuario.js";
const Query = {
  usuarios: async () => {
    return await Usuario.find();
  },
};

export default Query;
