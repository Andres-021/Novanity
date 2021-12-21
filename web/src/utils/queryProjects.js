import { gql} from '@apollo/client';

export default {
  query:{
    viewProjectsStudents:  gql`
    query ($id_estudiante: String!) {
      proyectosEstudiante(id_estudiante: $id_estudiante) {
        _id
        nombre_proyecto
        objetivos_generales
        objetivos_especificos
        presupuesto
        estado_inscripcion
        estado_proyecto
        fecha_ini
        fecha_final
        nombre_lider
        fase
        inscripciones_estudiantes {
          _id
          nombre_estudiante
          estado
        }
      }
    }
  `,viewProjectsLeader:  gql`
    query ($id_estudiante: String!) {
      proyectosEstudiante(id_estudiante: $id_estudiante) {
        _id
        nombre_proyecto
        objetivos_generales
        objetivos_especificos
        presupuesto
        estado_inscripcion
        estado_proyecto
        fecha_ini
        fecha_final
        nombre_lider
        fase
        inscripciones_estudiantes {
          _id
          nombre_estudiante
          estado
        }
      }
    }
  `
  },
  mutation:{
    
  }
}