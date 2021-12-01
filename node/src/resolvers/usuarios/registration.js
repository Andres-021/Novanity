const db = require('../../db/connection')

// Resolver de los schemas de modelos, tal cual
const rootRegister = {
    // Este es la consulta que obviamos en el schema y aui tambien
    usuario: () => {
        return usuario
    },
    // Aqui sucede la magia
    // Mutacion de registro.
    createUsuario: async ({ input }) => {
        // Se indica la coleccion y los datos que se van a introducir
        const _db = await db();
        res = await _db.collection('usuarios').insertOne(input);

        //  Retornamos una respuesta al crear la mutacion que seria el mismo input
        return input;
    }

}
// La mutacion que se uso anteriormente en la linea 11 el input recibe lo siguiente.

// Modelo de mutacion para insertar un dato
// Esto se pone en las rutas que se especifican en app.js
// claro esta que depende el schema que hayas realizado y la ruta que hayas puesto.

// mutation{
//     createUsuario(input:{
//       cedula:"123"
//       nombres:"andres"
//       correo:"andres@gmail"
//       contrasena:"holi"
//       rol: admin
//       estado: autorizado
//     })
//     {          "Esto serian los datos que queremos que retorne la mutacion al crear el dato"
//                  "Puedes poner los datos de retorno que quieras en mi caso puse _id, correo, nombres"
//                  "todo depende los atributos de tu objeto."
//       _id
//       correo
//       nombres
//     }
//   }

module.exports = rootRegister;