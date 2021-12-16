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
  Row,
  Col
} from "reactstrap";

const USUARIOS = gql`
  query {
    usuarios {
      _id
      nombre
      cedula
      correo
      rol
      estado
    }
  }
`;

const EDITAR_USUARIO = gql`
  mutation ($_id: ID!, $estado: String) {
    editUsuario(_id: $_id, estado: $estado) {
      nombre
    }
  }
`;

function Listausuarios() {
  const [datoEnEdicion, setDatoEnEdicion] = useState(null);

  const queryUsuarios = useQuery(USUARIOS, {
    notifyOnNetworkStatusChange: true,
  });

  const [editarUsuario, mutacionEditarUsuario] = useMutation(EDITAR_USUARIO);

  if (
    queryUsuarios.loading ||
    queryUsuarios.networkStatus === NetworkStatus.refetch ||
    mutacionEditarUsuario.loading
  )
    return <Spinner></Spinner>;
  if (queryUsuarios.error) return <p>Error </p>;

  return (
    <>
      <Container>
        <br />
        <br></br>
        <br></br>
        <h1 className="display-23">LISTA USUARIOS</h1>
        <Table>
          <thead>
            <tr>
              <th>_id</th>
              <th>nombre</th>
              <th>cedula</th>
              <th>correo</th>
              <th>rol</th>
              <th>estado</th>
              <th>accciones</th>
            </tr>
          </thead>
          <tbody>
            {queryUsuarios.data.usuarios.map((dato) => (
              <tr key={dato._id}>
                <td>{dato._id}</td>
                <td>{dato.nombre}</td>
                <td>{dato.cedula}</td>
                <td>{dato.correo}</td>
                <td>{dato.rol}</td>
                <td>{dato.estado}</td>
                <td>
                  <Button color="danger" onClick={() => setDatoEnEdicion(dato)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={datoEnEdicion != null}>
        <ModalHeader>
          <div>
            <h3>Editar estado</h3>
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
            <label>nombre:</label>
            <input
              className="form-control"
              name="nombre"
              readOnly
              type="text"
              value={datoEnEdicion?.nombre}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  nombre: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>cedula:</label>
            <input
              className="form-control"
              name="cedula"
              readOnly
              type="text"
              value={datoEnEdicion?.cedula}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  cedula: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>correo:</label>
            <input
              className="form-control"
              name="correo"
              readOnly
              type="text"
              value={datoEnEdicion?.correo}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  correo: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>rol:</label>
            <input
              className="form-control"
              readOnly
              name="rol"
              type="text"
              value={datoEnEdicion?.rol}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  rol: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label>estado:</label>

            <select
              className="form-control"
              name="estado"
              value={datoEnEdicion?.estado}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  estado: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
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
              await editarUsuario({
                variables: {
                  _id: datoEnEdicion?._id,
                  estado: datoEnEdicion?.estado,
                },
              });
              setDatoEnEdicion(null);
              queryUsuarios.refetch();
            }}
          >
            Insertar
          </Button>
          <Button color="danger" onClick={() => setDatoEnEdicion(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const Users = () => {
  return (
    <Container>
      {console.log("Prueba")}
      <NavBar />
      <a href="https://icons8.com/icon">Icons by Icons8</a>
      <Row>
          <Listausuarios />
      </Row>
    </Container>
  );
};

export default Users;
