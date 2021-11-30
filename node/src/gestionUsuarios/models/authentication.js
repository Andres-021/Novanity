const {buildSchema} = require('graphql');

//modelado de consultas, y sus argumentos de entrada
const schemaLogin = buildSchema(`
    input InputUsuario{
        correo: String!
        contrasena: String!
    }

    type Usuario{
        correo: String!
        contrasena: String!
    }

    type Query{
        usuario: Usuario
    }

    type Mutation{
        login(input: InputUsuario): Usuario
    }

`);

module.exports = schemaLogin;