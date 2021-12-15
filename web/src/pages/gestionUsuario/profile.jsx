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

const USUARIO = gql`
  query ($_id: ID!) {
    usuarioId(_id: $_id) {
      _id
      nombre
      cedula
      correo
      rol
      estado
      contrasena
    }
  }
`;

const EDITAR_USUARIO = gql`
  mutation (
    $_id: ID!
    $nombre: String
    $cedula: String
    $correo: String
    $contrasena: String
  ) {
    editUsuario(
      _id: $_id
      nombre: $nombre
      cedula: $cedula
      correo: $correo
      contrasena: $contrasena
    ) {
      nombre
    }
  }
`;

function Profile() {
  const [datoEnEdicion, setDatoEnEdicion] = useState(null);
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);

  const queryUsuarios = useQuery(USUARIO, {
    variables: { _id: user._id },
    notifyOnNetworkStatusChange: true,
  });

  const [editarUsuario, mutacionEditarUsuario] = useMutation(EDITAR_USUARIO);

  if (
    queryUsuarios.loading ||
    queryUsuarios.networkStatus === NetworkStatus.refetch ||
    mutacionEditarUsuario.loading
  )
    return <Spinner></Spinner>;
  if (queryUsuarios.error) return <p>Error :(</p>;

  return (
    <>
      <Container>
        <br />
        <br></br>
        <br></br>
        <h1 className="display-23">MI PERFIL</h1>
        <Table>
          <thead>
            <tr>
              <th>nombre</th>
              <th>cedula</th>
              <th>correo</th>
              <th>rol</th>
              <th>estado</th>
              <th>accciones</th>
            </tr>
          </thead>
          <tbody>
            {queryUsuarios.data.usuarioId.map((dato) => (
              <tr key={dato._id}>
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
            <h3>Editar mi perfil</h3>
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
            <label>contraseña:</label>
            <input
              className="form-control"
              name="correo"
              type="password"
              value={datoEnEdicion?.contrasena}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  contrasena: e.target.value,
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
              name="estado"
              type="text"
              value={datoEnEdicion?.rol}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  estado: e.target.value,
                };
                setDatoEnEdicion(nuevoValor);
              }}
            />
          </FormGroup>

          <FormGroup>
            <label>estado:</label>
            <input
              className="form-control"
              readOnly
              name="rol"
              type="text"
              value={datoEnEdicion?.estado}
              onChange={(e) => {
                const nuevoValor = {
                  ...datoEnEdicion,
                  rol: e.target.value,
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
              console.log({ datoEnEdicion });
              await editarUsuario({
                variables: {
                  _id: datoEnEdicion?._id,
                  nombre: datoEnEdicion?.nombre,
                  cedula: datoEnEdicion?.cedula,
                  correo: datoEnEdicion?.correo,
                  contrasena: datoEnEdicion?.contrasena,
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

const Perfil = () => {
  return (
    <>
      {console.log("Prueba")}
      <NavBar />
      <a href="https://icons8.com/icon">Icons by Icons8</a>

      <Profile />
    </>
  );
};

export default Perfil;
