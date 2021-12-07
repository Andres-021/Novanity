import pkg from "mongoose";
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const inscripcionSchema = new Schema({

  nombre_estudiante: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    required: true,
  }
});
export default model("inscripcion", inscripcionSchema);
