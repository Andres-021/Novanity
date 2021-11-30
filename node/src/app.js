//importacion del modulo express y configuracion para hacer uso de ello
const express  = require('express');
const { graphqlHTTP } = require('express-graphql');

//------
const app = express();

//Importacion de modulos creados
//Login
const schemaLogin = require('./gestionUsuarios/models/authentication');
const rootLogin = require('./gestionUsuarios/resolvers/authentication');

//Register
const schemaRegister = require('./gestionUsuarios/models/registration');
const rootRegister = require('./gestionUsuarios/resolvers/registration')

//Aqui se pone el archivo que tenga las rutas del modulo o las peticiones
app.use(require('./routers/index'));

//Peticion http de graphql registro
app.use('/graphql/registration/', graphqlHTTP({
    schema: schemaRegister,
    rootValue: rootRegister,
    graphiql: true
}));

//Peticion http de graphql sesion
app.use('/graphql/authentication/login/', graphqlHTTP({
    schema: schemaLogin,
    rootValue: rootLogin,
    graphiql: true
}));

//exportamos el objeto app
module.exports = app;

