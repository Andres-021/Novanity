const {buildSchema} = require('graphql');
//const {makeExecutableSchema} = require('graphql-tools')

const schemaRegister = buildSchema(`

    input InputUsuario{
        correo: String!
        identificacion: String!
        nombres: String!
        contrasena: String!
    }

    type Usuario{
        _id: ID
        correo: String!
        identificacion: String!
        nombres: String!
        contrasena: String!
    }

    type Query{
        usuario: [Usuario]
    }

    type Mutation{
        createUsuario(input: InputUsuario): Usuario
    }

`)

//Modelo de mutacion en graphql
// mutation{
//     createUsuario(input:{
//       correo:"andres@gmail"
//       identificacion:"123"
//       nombres:"andres"
//       contrasena:"holi"
//     })
//     {
//       _id
//       correo
//       nombres
//     }
//   }

module.exports = schemaRegister