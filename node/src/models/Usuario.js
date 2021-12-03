import pkg from "mongoose";
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const usuarioSchema = new Schema({
  cedula: {
    type: String,
    required: true,
  },

  nombre: {
    type: String,
    required: true,
  },

  correo: {
    type: String,
    required: true,
  },

  contrasena: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
});
export default model("usuarios", usuarioSchema);
