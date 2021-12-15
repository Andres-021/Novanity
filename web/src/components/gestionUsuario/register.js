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
  Modal,
  Alert,
  ListGroup
} from 'react-bootstrap';
import _find from 'lodash/find';

// Utils
import queries from '../../utils/queryAuth';


const Register = (props) => {
  // const Register = ({show, showC}) => {

  const [register, { data, loading, reset }] = useMutation(queries.mutation.createUser);

  const [message, setMessage] = useState([]);
  const [success, setSuccess] = useState(null);
  // const [key, setKey] = useState(null);

  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [rol, setRol] = useState('');
  const [names, setNames] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState(null);



  if(!loading){
    if(data !== undefined){
      const {errors, success} = data.createUsuario;
      if(!success){
        setMessage(errors);

      }else{
        // Si el registro es correcto limpiamos los datos
        setSuccess('Registro exitoso.');
        setTimeout(() => {
          setSuccess(null);
        }, 5000);

        setEmail('');
        setId('');
        setRol('');
        setNames('');
        setPassword('');
      }
      reset();
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    
    try{
      register({ variables: {
          cedula: id,
          nombre: names,
          correo: email,
          contrasena: password,
          rol: rol,
          estado: 'Pendiente'
      }});

      setMessage([])
    }catch(e){
      console.log(e);
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
            <div className="mb-3">
              {
                success
                ? <ListGroup.Item variant="success">{success}</ListGroup.Item>
                : null
              }
            </div>
            <Form onSubmit={handleRegister}>
            <Col xs={6} md='12' className='third_container'>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Correo"
                  className="mb-3"
                >
                  <Form.Control value={email} type="email" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}} 
                    required  isInvalid={!message.length? null: _find(message, {path:'correo'})? true: false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                      message.map((error) => {
                        if(error.path === 'correo') return `${error.message}`;
                        return null;
                      }
                      )
                    }
                  </Form.Control.Feedback>
                </FloatingLabel>
                {}
                <Row className="g-2">
                  <Col>
                    <FloatingLabel 
                      controlId="floatingId" 
                      label="Identificacion"
                      className="mb-3"
                    >
                      <Form.Control value={id} type="text" placeholder="Identificacion" onChange={(e) => {setId(e.target.value)}}
                        required  isInvalid={!message.length? null: _find(message, {path:'cedula'})? true: false}
                      />
                      <Form.Control.Feedback type="invalid">
                        {
                          message.map((error) => {
                            if(error.path === 'cedula') return `${error.message}`;
                            return null;
                          }
                          )
                        }
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel 
                      controlId="floatingSelect" 
                      label="Selecciona un rol"
                      className="mb-3"
                    >
                      <Form.Select value={rol} aria-label="Floating label select example" onChange={(e) => {setRol(e.target.value)}}
                        required  isInvalid={!message.length? null: _find(message, {path:'rol'})? true: false}
                      >
                        <option>...</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Lider">Lider</option>
                        <option value="Administrador">Administrador</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {
                          message.map((error) => {
                            if(error.path === 'rol') return `${error.message}`;
                            return null;
                          }
                          )
                        }
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>            
                
                {}
                <FloatingLabel 
                  controlId="floatingNames" 
                  label="Nombre completo"
                  className="mb-3"
                >
                  <Form.Control value={names} type="text" placeholder="Nombre completo" onChange={(e) => {setNames(e.target.value)}}
                    required  isInvalid={!message.length? null: _find(message, {path:'nombre'})? true: false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                      message.map((error) => {
                        if(error.path === 'nombre') return `${error.message}`;
                        return null;
                      }
                      )
                    }
                  </Form.Control.Feedback>
                </FloatingLabel>
                {}
                <FloatingLabel 
                  controlId="floatingPassword" 
                  label="Contraseña"
                  className="mb-3"
                >
                  <Form.Control value={password} type="password" placeholder="Contraseña" onChange={(e) => {setPassword(e.target.value)}}
                    required  isInvalid={!message.length? null: _find(message, {path:'contrasena'})? true: false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {
                      message.map((error) => {
                        if(error.path === 'contrasena') return `${error.message}`;
                        return null;
                      }
                      )
                    }
                  </Form.Control.Feedback>
                </FloatingLabel>
            </Col>
            <Col>
              {
                loading
                  ?  <Button variant='primary' disabled>Loading...</Button>
                  :  <Button 
                        variant='primary' 
                        type='submit'
                        disabled={email === '' || id === '' || rol === '' || names === '' || password === ''}
                      >Registrarse</Button>
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