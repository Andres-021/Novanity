import NavBar from "../../components/shared/navbar";
import { NetworkStatus, useQuery, useMutation, gql } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Spinner,
} from "reactstrap";

const PROYECTOS = gql`
  query ($id_lider: String!) {
    proyectosLider(id_lider: $id_lider) {
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
      avances {
        _id
        nombre_estudiante
        descripcion
        observaciones
      }
    }
  }
`;

const EDITAR_PROYECTO = gql`
  mutation (
    $_id: ID!
    $nombre_proyecto: String
    $objetivos_generales: String
    $objetivos_especificos: String
    $presupuesto: Int
  ) {
    editProyecto(
      _id: $_id
      nombre_proyecto: $nombre_proyecto
      objetivos_generales: $objetivos_generales
      objetivos_especificos: $objetivos_especificos
      presupuesto: $presupuesto
    ) {
      _id
    }
  }
`;

const EDITAR_ISCRIPCION = gql`
  mutation (
    $id_proyecto: ID!
    $id_inscripcion: String!
    $nuevoEstado: String!
  ) {
    editEstadoInscripcion(
      id_proyecto: $id_proyecto
      id_inscripcion: $id_inscripcion
      nuevoEstado: $nuevoEstado
    ) {
      _id
    }
  }
`;

const AGREGAR_OBSERVACION_AVANCE = gql`
  mutation (
    $id_proyecto: String!
    $id_avance: String!
    $nuevaObservacion: String!
  ) {
    agregarObservacionAvance(
      id_proyecto: $id_proyecto
      id_avance: $id_avance
      nuevaObservacion: $nuevaObservacion
    ) {
      _id
    }
  }
`;

function ProyectosLider() {
  const [datoEnEdicion, setDatoEnEdicion] = useState(null);
  const [verProyecto, setverProyecto] = useState(null);
  const [verInscripcion, setverInscripcion] = useState(null);
  const [inscripcionEnEdicion, setInscripcionEnEdicion] = useState(null);
  const [agregarObservacion, setAgregarObservacion] = useState(null);

  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);

  const queryProyectos = useQuery(
    PROYECTOS,
    { variables: { id_lider: user._id } },
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const [editarProyecto, mutacionEditarProyecto] = useMutation(EDITAR_PROYECTO);
  const [editarInscripcion, mutacionEditarInscripcion] =
    useMutation(EDITAR_ISCRIPCION);

  const [agregarObservacionAvance, mutacionAgregarObservacionAvance] =
    useMutation(AGREGAR_OBSERVACION_AVANCE);

  if (
    queryProyectos.loading ||
    queryProyectos.networkStatus === NetworkStatus.refetch ||
    mutacionEditarProyecto.loading ||
    mutacionEditarInscripcion.loading
  )
    return <Spinner></Spinner>;
  if (queryProyectos.error) return <p>Error :(</p>;

  return (
    <>
      <Container>
        <br />
        <br></br>
        <h1 className="display-23">MIS PROYECTOS</h1>

        <Table>
          <thead>
            <tr>
              <th>Nombre del Proyecto</th>
              <th>Lider</th>
              <th>Estado </th>
              <th>Inscripcion</th>
              <th>Accciones</th>
            </tr>
          </thead>
          <tbody>
            {queryProyectos.data.proyectosLider.map((dato) => (
              <tr key={dato._id}>
                <td>{dato.nombre_proyecto}</td>
                <td>{dato.nombre_lider}</td>
                <td>{dato.estado_proyecto}</td>
                <td>{dato.estado_inscripcion}</td>
                <td>
                  <Button color="primary" onClick={() => setverProyecto(dato)}>
                    Detalles
                  </Button>
                </td>

                {dato.estado_proyecto === "Activo" && (
                  <td>
                    <Button
                      color="danger"
                      onClick={() => setDatoEnEdicion(dato)}
                    >
                      Editar
                    </Button>
                  </td>
                )}
                {dato.estado_proyecto !== "Activo" && (
                  <td>
                    <Button color="secondary">Editar</Button>
                  </td>
                )}
                <td>
                  <Button
                    color="primary"
                    onClick={() => setverInscripcion(dato)}
                  >
                    Inscripciones
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={verProyecto != null} fullscreen={true}>
        <ModalHeader>
          <div>
            <h3>Ver detalles proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Table>
              <thead>
                <tr>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nombre: </td>
                  <td>{verProyecto?.nombre_proyecto}</td>
                </tr>
                <tr>
                  <td>Objetivos generales: </td>
                  <td>{verProyecto?.objetivos_generales}</td>
                </tr>
                <tr>
                  <td>Objetivos especificos: </td>
                  <td>{verProyecto?.objetivos_especificos}</td>
                </tr>
                <tr>
                  <td>Lider: </td>
                  <td>{verProyecto?.nombre_lider}</td>
                </tr>
                <tr>
                  <td>Estado Inscripcion: </td>
                  <td>{verProyecto?.estado_inscripcion}</td>
                </tr>
                <tr>
                  <td>Estado del proyecto: </td>
                  <td>{verProyecto?.estado_proyecto}</td>
                </tr>

                {verProyecto?.fecha_ini !== null && (
                  <tr>
                    <td>Fecha Inicial: </td>
                    <td>{verProyecto?.fecha_ini}</td>
                  </tr>
                )}

                {verProyecto?.fecha_final !== null && (
                  <tr>
                    <td>Fecha Final: </td>
                    <td>{verProyecto?.fecha_final}</td>
                  </tr>
                )}

                <tr>
                  <td>Presupuesto: </td>
                  <td>${verProyecto?.presupuesto}</td>
                </tr>

                {verProyecto?.fase !== "" && (
                  <tr>
                    <td>Fase: </td>
                    <td>{verProyecto?.fase}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </FormGroup>
          <p>
            <strong>Avances:</strong>{" "}
          </p>

          <Table>
            <thead>
              <tr>
                <th>Nombre estudiante</th>
                <th>Descripcion</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {verProyecto?.avances.map((avance) => (
                <tr key={avance._id}>
                  <td>{avance.nombre_estudiante}</td>
                  <td>{avance.descripcion}</td>
                  <td>{avance.observaciones}</td>
                  {verProyecto.estado_proyecto === "Activo" && (
                    <td>
                      <Button
                        color="primary"
                        onClick={() => setAgregarObservacion(avance)}
                      >
                        Edit
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>

          <FormGroup></FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={() => setverProyecto(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={datoEnEdicion != null}>
        <ModalHeader>
          <div>
            <h3>Editar proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              value={datoEnEdicion?.nombre_proyecto}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  nombre_proyecto: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Objetivos generales:</label>
            <textarea
              className="form-control"
              name="objetivosGenerales"
              type="text"
              rows="5"
              value={datoEnEdicion?.objetivos_generales}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  objetivos_generales: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Objetivos especificos:</label>
            <textarea
              className="form-control"
              name="nombre"
              type="text"
              rows="5"
              value={datoEnEdicion?.objetivos_especificos}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  objetivos_especificos: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Presupuesto:</label>
            <input
              className="form-control"
              name="presupuesto"
              type="number"
              value={datoEnEdicion?.presupuesto}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  presupuesto: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              await editarProyecto({
                variables: {
                  _id: datoEnEdicion?._id,
                  nombre_proyecto: datoEnEdicion?.nombre_proyecto,
                  objetivos_generales: datoEnEdicion?.objetivos_generales,
                  objetivos_especificos: datoEnEdicion?.objetivos_especificos,
                  presupuesto: Number(datoEnEdicion?.presupuesto),
                },
              });

              setDatoEnEdicion(null);
              queryProyectos.refetch();
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setDatoEnEdicion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={verInscripcion != null}>
        <ModalHeader>
          <div>
            <h3>Lista Estudiantes Inscritos </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Table>
              <tbody>
                <tr>
                  <td>Nombre del proyecto: </td>
                  <td>{verInscripcion?.nombre_proyecto}</td>
                </tr>
              </tbody>
            </Table>
          </FormGroup>
          <p>
            <strong>Inscripciones:</strong>{" "}
          </p>

          <Table>
            <thead>
              <tr>
                <th>Nombre estudiante</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {verInscripcion?.inscripciones_estudiantes.map((inscripcion) => (
                <tr key={inscripcion._id}>
                  <td>{inscripcion.nombre_estudiante}</td>
                  <td>{inscripcion.estado}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => setInscripcionEnEdicion(inscripcion)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <FormGroup></FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="danger" onClick={() => setverInscripcion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={inscripcionEnEdicion != null}>
        <ModalHeader>
          <div>
            <h3>Editar Estado Inscripcion</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre estudiante:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              readOnly
              value={inscripcionEnEdicion?.nombre_estudiante}
            />
          </FormGroup>

          <FormGroup>
            <label>estado:</label>

            <select
              className="form-control"
              name="estado"
              value={inscripcionEnEdicion?.estado}
              onChange={(e) => {
                const nuevoValor = {
                  ...inscripcionEnEdicion,
                  estado: e.target.value,
                };
                setInscripcionEnEdicion(nuevoValor);
              }}
            >
              <option>Pendiente</option>
              <option>Autorizado</option>
              <option>No autorizado</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              await editarInscripcion({
                variables: {
                  id_proyecto: verInscripcion?._id,
                  id_inscripcion: inscripcionEnEdicion?._id,
                  nuevoEstado: inscripcionEnEdicion?.estado,
                },
              });

              setInscripcionEnEdicion(null);
              setverInscripcion(null);
              queryProyectos.refetch();
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setInscripcionEnEdicion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={agregarObservacion != null}>
        <ModalHeader>
          <div>
            <h3>Agregar Observacion</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre estudiante:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              readOnly
              value={agregarObservacion?.nombre_estudiante}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              readOnly
              value={agregarObservacion?.descripcion}
            />
          </FormGroup>

          <FormGroup>
            <label>Agregar Observacion:</label>
            <textarea
              className="form-control"
              name="observacion"
              type="text"
              rows="5"
              value={agregarObservacion?.observaciones}
              onChange={(e) => {
                const nuevoValor = {
                  ...agregarObservacion,
                  observaciones: e.target.value,
                };
                setAgregarObservacion(nuevoValor);
              }}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              console.log({ datoEnEdicion, agregarObservacion });
              await agregarObservacionAvance({
                variables: {
                  id_proyecto: verProyecto?._id,
                  id_avance: agregarObservacion?._id,
                  nuevaObservacion: agregarObservacion.observaciones,
                },
              });

              setverProyecto(null);
              setAgregarObservacion(null);
              queryProyectos.refetch();
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setAgregarObservacion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const LeaderProjects = () => {
  return (
    <>
      {console.log("Prueba")}
      <NavBar />
      <a href="https://icons8.com/icon">Icons by Icons8</a>

      <ProyectosLider />
    </>
  );
};

export default LeaderProjects;
