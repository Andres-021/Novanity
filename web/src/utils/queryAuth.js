import { gql} from '@apollo/client';

export default {
  query:{

  },
  mutation:{
    createUser: gql`
      # Increments a back-end counter and gets its resulting value
      mutation createUsuario($cedula: String!, $nombre: String!, $correo: String!, $contrasena: String!, $rol: String!, $estado: String!){
      createUsuario(cedula: $cedula, nombre: $nombre, correo: $correo, contrasena: $contrasena, rol: $rol, estado: $estado){
        success
        errors{
          path
          message
        }
      }
    }
  `,
    loginUser: gql`
      # Increments a back-end counter and gets its resulting value
      mutation login($correo: String!, $contrasena: String!){
        login(correo: $correo, contrasena: $contrasena){
          success
          token
          user{
            _id
            nombre
            rol
            estado
          }
          errors{
            path
            message
          }
        }
      }
    `
  }
}