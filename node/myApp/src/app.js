//importacion del modulo express y configuracion para hacer uso de ello
const express  = require('express');
const app = express();

//Aqui se pone el archivo que tenga las rutas del modulo o las peticiones
app.use(require('./routers/index'));

//exportamos el objeto app
module.exports = app;

