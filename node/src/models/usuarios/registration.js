const {buildSchema} = require('graphql');
//const {makeExecutableSchema} = require('graphql-tools')

// Primero se crea una entrada de datos que seria inputUsuario

// Luego el tipo de datos, en este caso es un objeto Usuario con sus atributos, esto para cuando se cree la mutacion
// Podamos retornar lo que queremos mostrar

// Se ignora el Query, solo se pone para obviar un error
// Y luego se crea la mutacion, despues se exporta el eschema

// Ojo en la mutcion se define la entrada de tipo input y se especifica cual seran los datos
// En ese caso serian InputUsuario y luego se le especifica el dato de retorno que seria Usuario
const schemaRegister = buildSchema(`

    input InputUsuario{
        cedula: String!
        nombres: String!
        correo: String!
        contrasena: String!
        rol: String!
        estado: String!
    }

    type Usuario{
        _id: ID
        cedula: String!
        nombres: String!
        correo: String!
        contrasena: String!
        rol: String!
        estado: String!
    }

    type Query{
        usuario: [Usuario]
    }

    type Mutation{
        createUsuario(input: InputUsuario): Usuario
    }

`)

// Al poner "!" al final de String, asi (String!), significa que ese campo es obligatorio.

module.exports = schemaRegister