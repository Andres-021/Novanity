import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  FloatingLabel, 
  Form,
  Container,
  Row,
  Col,
  Button,
  Modal
} from 'react-bootstrap';


import Notification from '../../shared/error'
import Notification2 from '../../shared/success';

// Define mutation
const REGISTER_USER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation createUsuario($cedula: String!, $nombre: String!, $correo: String!, $contrasena: String!, $rol: String!, $estado: String!){
    createUsuario(cedula: $cedula, nombre: $nombre, correo: $correo, contrasena: $contrasena, rol: $rol, estado: $estado){
      correo
    }
  }
`;

const Register = (props) => {
// const Register = ({show, showC}) => {

  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [names, setNames] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState(null);



  const handelRegister = (e) => {
    e.preventDefault();
    
    try{

      if(email === '' || id === '' || rol === '' || names === '' || password === ''){
        setErrorMessage('Todos los campos son obligatorios.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return 0;
      }

      if(error){
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        return 0;
      }

      register({ variables: {
          cedula: id,
          nombre: names,
          correo: email,
          contrasena: password,
          rol: rol,
          estado: 'Pendiente'
      }});

      
      if(data !== null){
        setSuccessMessage('Se ha registrado correctamente');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        
        setEmail('');
        setId('');
        setRol('');
        setNames('');
        setPassword('');

        return 0;
      }

    }catch(e){
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
    }
  }
  
  return(
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h1>Registro</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container className='first_container'>
          <Row className='justify-content-center'>
            <div>
              <Notification message={errorMessage}/>
              <Notification2 message={successMessage}/>
            </div>
            <Form onSubmit={handelRegister}>
            <Col xs={6} md='12' className='third_container'>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Correo"
                  className="mb-3"
                >
                  <Form.Control value={email} type="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
                </FloatingLabel>
                {}
                <Row>
                  <Col>
                    <FloatingLabel 
                      controlId="floatingId" 
                      label="Identificacion"
                      className="mb-3"
                    >
                      <Form.Control value={id} type="text" placeholder="Identificacion" onChange={(e) => {setId(e.target.value)}}/>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel 
                      controlId="floatingSelect" 
                      label="Selecciona un rol"
                      className="mb-3"
                    >
                      <Form.Select value={rol} aria-label="Floating label select example" onChange={(e) => {setRol(e.target.value)}}>
                        <option>...</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Lider">Lider</option>
                        <option value="Administrador">Administrador</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>            
                
                {}
                <FloatingLabel 
                  controlId="floatingNames" 
                  label="Nombre completo"
                  className="mb-3"
                >
                  <Form.Control value={names} type="text" placeholder="Nombre completo" onChange={(e) => {setNames(e.target.value)}}/>
                </FloatingLabel>
                {}
                <FloatingLabel 
                  controlId="floatingPassword" 
                  label="Contraseña"
                  className="mb-3"
                >
                  <Form.Control value={password} type="password" placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value)}}/>
                </FloatingLabel>
            </Col>
            <Col>
              {
                loading
                  ?  <Button variant='primary' type='submit'>Loading...</Button>
                  :  <Button variant='primary' type='submit'>Registrarse</Button>
              }
            </Col>
            </Form>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Register;