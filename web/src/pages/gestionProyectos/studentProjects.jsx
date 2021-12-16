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
      avances {
        _id
        nombre_estudiante
        descripcion
        observaciones
      }
    }
  }
`;

const AGREGAR_AVANCE = gql`
  mutation (
    $_id: ID!
    $id_estudiante: String!
    $nombre_estudiante: String!
    $descripcion: String!
  ) {
    agregarAvance(
      _id: $_id
      id_estudiante: $id_estudiante
      nombre_estudiante: $nombre_estudiante
      descripcion: $descripcion
    ) {
      _id
    }
  }
`;

function ProyectosEstudiante() {
  const [verProyecto, setverProyecto] = useState(null);
  const [avanceEnEdicion, setAvanceEnEdicion] = useState(null);
  const [descripcion, setdescripcion] = useState(null);

  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);

  const queryProyectos = useQuery(
    PROYECTOS,
    { variables: { id_estudiante: user._id } },
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const [agregarAvance, mutacionAgregarAvance] = useMutation(AGREGAR_AVANCE);

  if (
    queryProyectos.loading ||
    queryProyectos.networkStatus === NetworkStatus.refetch ||
    mutacionAgregarAvance.loading
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

              <th>Accciones</th>
            </tr>
          </thead>
          <tbody>
            {queryProyectos.data.proyectosEstudiante.map((dato) => (
              <tr key={dato._id}>
                <td>{dato.nombre_proyecto}</td>
                <td>{dato.nombre_lider}</td>
                <td>{dato.estado_proyecto}</td>

                <td>
                  <Button color="primary" onClick={() => setverProyecto(dato)}>
                    Detalles
                  </Button>
                </td>

                {dato.estado_proyecto !== "Activo" && (
                  <td>
                    <Button color="secondary">Agregar avance</Button>
                  </td>
                )}

                {dato.estado_proyecto === "Activo" && (
                  <td>
                    <Button
                      color="danger"
                      onClick={() => setAvanceEnEdicion(dato)}
                    >
                      Agregar Avance
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={verProyecto != null} fullscreen={true}a>
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
      <Modal isOpen={avanceEnEdicion != null}>
        <ModalHeader>
          <div>
            <h3>Agregar Avance</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Nombre del proyecto:</label>
            <input
              className="form-control"
              name="nombre"
              readOnly
              type="text"
              value={avanceEnEdicion?.nombre_proyecto}
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
          <FormGroup>
            <label>Descripcion:</label>
            <textarea
              className="form-control"
              name="descripcion"
              type="textarea"
              rows="6"
              required
              onChange={(e) => {
                setdescripcion(e.target.value);
              }}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => {
              await agregarAvance({
                variables: {
                  _id: avanceEnEdicion?._id,
                  id_estudiante: user._id,
                  nombre_estudiante: user.nombre,
                  descripcion: descripcion,
                  observaciones: "",
                },
              });
              setAvanceEnEdicion(null);
              queryProyectos.refetch();
            }}
          >
            Agregar
          </Button>
          <Button color="danger" onClick={() => setAvanceEnEdicion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const StudentProjects = () => {
  return (
    <>
      {console.log("Prueba")}
      <NavBar />
      <a href="https://icons8.com/icon">Icons by Icons8</a>

      <ProyectosEstudiante />
    </>
  );
};

export default StudentProjects;
