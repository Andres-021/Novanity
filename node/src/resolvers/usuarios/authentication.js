//Respuesta a las consultas
const usuarios = [
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
];

const rootLogin = {
    // correo: (root, args) => {
    //     //Aqui se hara e insert del correo en el login
    //     return usuario
    // },
    // contrasena: (root, args) => {
    //     return 'contraseña'
    // }

    login: ({input}) => {
        // Filtrado 100% funcional
        // Se hace un filtrado para pruebas
        usuario = usuarios.filter(item => item.correo == input.correo && item.contrasena == input.contrasena);
        console.log(usuario)
        // Retornamos el dato creado, pero solo se especificara el que asignemos
        return usuario[0]; 
    }
    
};

module.exports = rootLogin;