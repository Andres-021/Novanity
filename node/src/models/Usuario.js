import pkg from "mongoose";
import validate from 'mongoose-validator';

const { Schema, model } = pkg;

//import {Schema, model} from "mongoose";

const usuarioSchema = new Schema({
  cedula: {
    type: String,
    required: true,
    validate: [
      validate({
        validator: 'isLength',
        arguments: [7, 10],
        message: 'La cedula debe tener entre {ARGS[0]} y {ARGS[1]} numeros.'
      }),
      validate({
        validator: 'isNumeric',
        message: 'La cedula debe contener solo numeros.'
      })
    ]
  },

  nombre: {
    type: String,
    required: true,
  },

  correo: {
    type: String,
    required: [true, "El correo ya se encuentra en uso."],
    unique: true,
    validate: validate({
      validator: 'isEmail',
      message: 'Introduce un email valido.'
    })
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
  }
});
export default model("usuarios", usuarioSchema);
