import pkg from "mongoose";
const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const Insc_Estudiantes = new Schema({
  id_estudiante: {
    type: String,
    required: true,
  },

  nombre_estudiante: {
    type: String,
    required: true,
  },

  estado: {
    type: String,
    required: true,
  },
});
const Avances = new Schema({
  id_estudiante: {
    type: String,
    required: true,
  },

  nombre_estudiante: {
    type: String,
    required: true,
  },

  descripcion: {
    type: String,
    required: false,
  },

  observaciones: {
    type: String,
    required: false,
  },
});

const proyectoschema = new Schema({
  nombre_proyecto: {
    type: String,
    required: true,
  },

  objetivos_generales: {
    type: String,
    required: true,
  },

  objetivos_especificos: {
    type: String,
    required: true,
  },

  presupuesto: {
    type: Number,
    required: true,
  },
  fecha_ini: {
    type: Date,
    required: false,
  },
  fecha_final: {
    type: Date,
    required: false,
  },
  id_lider: {
    type: String,
    required: true,
  },
  nombre_lider: {
    type: String,
    required: true,
  },
  estado_inscripcion: {
    type: String,
    required: true,
  },
  estado_proyecto: {
    type: String,
    required: false,
  },
  fase: {
    type: String,
    required: false,
  },
  fase: {
    type: String,
    required: false,
  },
  fase: {
    type: String,
    required: false,
  },
  fase: {
    type: String,
    required: false,
  },

  inscripciones_estudiantes: [Insc_Estudiantes],
  avances: [Avances],
});
export default model("proyectos", proyectoschema);
