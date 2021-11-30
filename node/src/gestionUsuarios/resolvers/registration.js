const usuario = [
    {
        _id: 0,
        correo: "andres@gmail",
        identificacion: "12345",
        nombres: "andresito",
        contrasena: "hola1234"
    },
    {
        _id: 2,
        correo: "andresito@gmail",
        identificacion: "12213",
        nombres: "andresito",
        contrasena: "hello"
    },
    {
        _id: "3",
        correo: "andre@gmail",
        identificacion: "12223",
        nombres: "andre",
        contrasena: "hi"
    }
]

const rootRegister = {
    
    // Mutacion de registro.
    createUsuario: ({ input }) => {
        // Pruebas exitosas
        input._id = usuario.length;
        usuario.push(input)
        return input;
    }

}

module.exports = rootRegister;