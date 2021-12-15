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
  query {
    proyectos {
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

const INSERTAR_PROYECTO = gql`
  mutation (
    $nombre_proyecto: String!
    $objetivos_generales: String!
    $objetivos_especificos: String!
    $presupuesto: Int!
    $id_lider: String!
    $nombre_lider: String!
    $estado_inscripcion: String!
    $estado_proyecto: String
    $fase: String
  ) {
    createProyecto(
      nombre_proyecto: $nombre_proyecto
      objetivos_generales: $objetivos_generales
      objetivos_especificos: $objetivos_especificos
      presupuesto: $presupuesto

      id_lider: $id_lider
      nombre_lider: $nombre_lider
      estado_inscripcion: $estado_inscripcion
      estado_proyecto: $estado_proyecto
      fase: $fase
    ) {
      _id
    }
  }
`;

const EDITAR_PROYECTO = gql`
  mutation (
    $_id: ID!
    $estado_inscripcion: String
    $estado_proyecto: String
    $fase: String
    $fecha_ini: Date
    $fecha_final: Date
  ) {
    editProyecto(
      _id: $_id
      estado_inscripcion: $estado_inscripcion
      estado_proyecto: $estado_proyecto
      fase: $fase
      fecha_ini: $fecha_ini
      fecha_final: $fecha_final
    ) {
      _id
    }
  }
`;

const AGREGAR_INSCRIPCION = gql`
  mutation (
    $_id: ID!
    $id_estudiante: String!
    $nombre_estudiante: String!
    $estado: String!
  ) {
    agregarInscripcion(
      _id: $_id
      id_estudiante: $id_estudiante
      nombre_estudiante: $nombre_estudiante
      estado: $estado
    ) {
      _id
    }
  }
`;

function ListaProyectos() {
  const [modalInsertar, setmodalInsertar] = useState(false);
  const [datoEnEdicion, setDatoEnEdicion] = useState(null);
  const [datoInscripcion, setDatoInscripcion] = useState(null);
  const [verProyecto, setverProyecto] = useState(null);
  const [nombreProyecto, setnombreProyecto] = useState(null);
  const [objetivosGenerales, setobjetivosGenerales] = useState(null);
  const [objetivosEspecificos, setobjetivosEspecificos] = useState(null);
  const [presupuesto, setpresupuesto] = useState(null);

  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);

  const queryProyectos = useQuery(PROYECTOS, {
    notifyOnNetworkStatusChange: true,
  });

  const [fechaActual, setfechaActual] = useState(
    new Date().toLocaleDateString()
  );

  const [insertarProyecto, mutacionInsertarProyecto] =
    useMutation(INSERTAR_PROYECTO);

  const [editarProyecto, mutacionEditarProyecto] = useMutation(EDITAR_PROYECTO);
  const [agregarInscripcion, mutacionAgregarInscripcion] =
    useMutation(AGREGAR_INSCRIPCION);

  if (
    queryProyectos.loading ||
    queryProyectos.networkStatus === NetworkStatus.refetch ||
    mutacionEditarProyecto.loading
  )
    return <Spinner></Spinner>;
  if (queryProyectos.error) return <p>Error :(</p>;

  return (
    <>
      <Container>
        <br />
        <br></br>
        <h1 className="display-23">LISTA PROYECTOS</h1>

        {(user.rol === "Lider" || user.rol === "Admin") && (
          <Button color="success" onClick={() => setmodalInsertar(true)}>
            Insertar nuevo proyecto
          </Button>
        )}

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
            {queryProyectos.data.proyectos.map((dato) => (
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

                {dato.fase !== "Terminado" &&
                  (user.rol === "Administrador" || user.rol === "Admin") && (
                    <td>
                      <Button
                        color="danger"
                        onClick={() => setDatoEnEdicion(dato)}
                      >
                        Editar
                      </Button>
                    </td>
                  )}

                {dato.fase === "Terminado" &&
                  (user.rol === "Administrador" || user.rol === "Admin") && (
                    <td>
                      <Button color="secondary">Editar</Button>
                    </td>
                  )}
                {dato.fase !== "Terminado" &&
                  (user.rol === "Estudiante" || user.rol === "Admin") &&
                  dato.estado_inscripcion === "Aprobado" && (
                    <td>
                      <Button
                        color="danger"
                        onClick={() => setDatoInscripcion(dato)}
                      >
                        Inscribirme
                      </Button>
                    </td>
                  )}

                {(dato.fase === "Terminado" ||
                  dato.estado_inscripcion !== "Aprobado") &&
                  (user.rol === "Estudiante" || user.rol === "Admin") && (
                    <td>
                      <Button color="secondary">Inscribirme</Button>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={verProyecto != null}>
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

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Crear nuevo proyecto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre del proyecto:</label>
            <input
              className="form-control"
              name="nombre_proyecto"
              type="text"
              onChange={(e) => {
                setnombreProyecto(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Objetivos generales:</label>
            <textarea
              className="form-control"
              name="objetivos_generales"
              type="textarea"
              rows="5"
              required
              onChange={(e) => {
                setobjetivosGenerales(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Objetivos especificos:</label>
            <textarea
              className="form-control"
              name="objetivos_especificos"
              type="text"
              rows="5"
              onChange={(e) => {
                setobjetivosEspecificos(e.target.value);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>Presupuesto:</label>
            <input
              className="form-control"
              name="presupuesto"
              type="number"
              onChange={(e) => {
                setpresupuesto(e.target.value);
              }}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              insertarProyecto({
                variables: {
                  nombre_proyecto: nombreProyecto,
                  objetivos_generales: objetivosGenerales,
                  objetivos_especificos: objetivosEspecificos,
                  presupuesto: Number(presupuesto),
                  id_lider: user._id,
                  nombre_lider: user.nombre,
                  estado_inscripcion: "Pendiente",
                  estado_proyecto: "Inactivo",
                  fase: "",
                },
              });
              setmodalInsertar(false);
              queryProyectos.refetch();
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setmodalInsertar(false)}>
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
            <label>_id:</label>
            <input
              className="form-control"
              name="id"
              readOnly
              type="text"
              value={datoEnEdicion?._id}
            />
          </FormGroup>

          <FormGroup>
            <label>nombre del proyecto:</label>
            <input
              className="form-control"
              name="nombre"
              readOnly
              type="text"
              value={datoEnEdicion?.nombre_proyecto}
            />
          </FormGroup>

          {datoEnEdicion?.fase === "" && (
            <FormGroup>
              <label>Estado incripcion proyecto:</label>

              <select
                className="form-control"
                name="estado"
                value={datoEnEdicion?.estado_inscripcion}
                onChange={(e) => {
                  const nuevoValor = {
                    ...datoEnEdicion,
                    estado_inscripcion: e.target.value,
                  };
                  setDatoEnEdicion(nuevoValor);
                }}
              >
                <option>Pendiente</option>
                <option>Aprobado</option>
                <option>No Aprobado</option>
              </select>
            </FormGroup>
          )}

          {datoEnEdicion?.estado_inscripcion === "Aprobado" &&
            datoEnEdicion?.fase === "" && (
              <FormGroup>
                <label>Estado del proyecto:</label>

                <select
                  className="form-control"
                  name="estado"
                  value={datoEnEdicion?.estado_proyecto}
                  onChange={(e) => {
                    const nuevoValor = {
                      ...datoEnEdicion,
                      estado_proyecto: e.target.value,
                    };
                    setDatoEnEdicion(nuevoValor);
                  }}
                >
                  <option>Activo</option>
                </select>
              </FormGroup>
            )}

          {datoEnEdicion?.fase !== "" && (
            <FormGroup>
              <label>Estado del proyecto:</label>

              <select
                className="form-control"
                name="fase"
                value={datoEnEdicion?.fase}
                onChange={(e) => {
                  const nuevoValor = {
                    ...datoEnEdicion,
                    fase: e.target.value,
                  };
                  setDatoEnEdicion(nuevoValor);
                }}
              >
                <option>En proceso</option>
                <option>Terminado</option>
              </select>
            </FormGroup>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              let objetoInterno = null;
              if (
                datoEnEdicion?.estado_proyecto === "Inactivo" ||
                datoEnEdicion?.fase === ""
              ) {
                objetoInterno = {
                  variables: {
                    _id: datoEnEdicion?._id,
                    estado_proyecto: "Activo",
                    estado_inscripcion: datoEnEdicion?.estado_inscripcion,
                    fase: "Iniciado",
                    fecha_ini: fechaActual,
                  },
                };
              }
              if (datoEnEdicion?.fase == "En proceso") {
                objetoInterno = {
                  variables: {
                    _id: datoEnEdicion?._id,
                    fase: datoEnEdicion?.fase,
                  },
                };
              }

              if (datoEnEdicion?.estado_inscripcion == "No Aprobado") {
                objetoInterno = {
                  variables: {
                    _id: datoEnEdicion?._id,
                    estado_inscripcion: datoEnEdicion?.estado_inscripcion,
                  },
                };
              }

              if (datoEnEdicion?.fase === "Terminado") {
                objetoInterno = {
                  variables: {
                    _id: datoEnEdicion?._id,
                    fecha_final: fechaActual,
                    fase: datoEnEdicion?.fase,
                    estado_proyecto: "Inactivo",
                  },
                };
              }

              await editarProyecto(objetoInterno);
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

      <Modal isOpen={datoInscripcion != null}>
        <ModalHeader>
          <div>
            <h3>Realizar inscripcion</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>_id:</label>
            <input
              className="form-control"
              name="id"
              readOnly
              type="text"
              value={datoInscripcion?._id}
            />
          </FormGroup>

          <FormGroup>
            <label>Mi nombre:</label>
            <input
              className="form-control"
              name="nombre"
              readOnly
              type="text"
              value={user.nombre}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              await agregarInscripcion({
                variables: {
                  _id: datoInscripcion?._id,
                  id_estudiante: user._id,
                  nombre_estudiante: user.nombre,
                  estado: "Pendiente",
                },
              });
              setDatoInscripcion(null);
              queryProyectos.refetch();
            }}
          >
            Inscribirme
          </Button>
          <Button color="danger" onClick={() => setDatoInscripcion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const Projects = () => {
  return (
    <>
      {console.log("Prueba")}
      <NavBar />
      <a href="https://icons8.com/icon">Icons by Icons8</a>

      <ListaProyectos />
    </>
  );
};

export default Projects;
