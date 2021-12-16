import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  FloatingLabel, 
  Form,
  Container,
  Row,
  Col,
  Button,
  ListGroup
} from 'react-bootstrap'
import _find from 'lodash/find';

// Utils
import queries from '../../utils/queryAuth';

// Components
import '../../styles/gestionUsuario/login.css';
import Register from '../../components/gestionUsuario/register';

const Login = () =>{
  const [login, { data, loading, reset }] = useMutation(queries.mutation.loginUser);
  
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState(null);

  // Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState([]);
  
  const navigate = useNavigate();

  if(!loading){
    if(data !== undefined){

      const {errors, success, token, user} = data.login;
      if(!success){
        setMessage(errors)
      }else{
        if(user.rol === 'Admin' || user.estado === 'Autorizado'){
          setUsername('');
          setPassword('');
          localStorage.setItem('token', token);
          const userJson = JSON.stringify(user);
          localStorage.setItem('user', userJson);
          navigate('/');
        }

        if(user.estado === 'Pendiente'){
          setState('Tu estado es -Pendiente- por favor espere a ser -Autorizado- he intente de nuevo mas tarde..');
          setTimeout(() => {
            setState(null);
          }, 5000);
        }

        if(user.estado === 'No autorizado'){
          setState('Lo sentimos pero le han negado la entrada al sitio.');
          setTimeout(() => {
            setState(null);
          }, 5000);
        }
      }
      
      reset();
    }
  }

  const handelLogin = async(evet) => {
    evet.preventDefault();
    
    try{
      if(username === '' || password === ''){

      }

      login({ variables: { 
        correo: username,
        contrasena: password
      }});

      setMessage([]);
      
    }catch(e){
      return 0;
    }
  }

  return(
      <Container className='first-container'>
        <Row className='justify-content-center'>
          <Col className='second-container'>
            <h4 className='titulo'>Novanity</h4>
            <p className='parrafo'>
            Se propone plantear un modelo de sistemas de informacion que soporte la gestion de 
            proyectos de investigacion y mejore los procesos.
            </p>
            <p className='parrafo'>
            El desarrollo del proyecto sera abordado mediante metodologias agiles, usando el marco 
            de trabajo consistente en un proceso que se aplica de manera regular y frecuente a las 
            buenas practicas de trabajar colaborativamente en equipo y obtener el mejor resultado 
            posible de un proyecto.
            </p>
          </Col>
          <Col xs={6} md='5' className='third-container'>
            <Col className="mb-3">
              {
                message.length
                ? <ListGroup.Item variant="danger">Usuario o contraseña invalidos.</ListGroup.Item>
                : null
              }
              {
                state 
                ?  <ListGroup.Item variant='danger'>{state}</ListGroup.Item>    
                : null
              }
            </Col>
            <Form onSubmit={handelLogin}>
              <FloatingLabel
                controlId="floatingInput"
                label="Correo"
                className="mb-3"
              >
                <Form.Control 
                  type="email" 
                  value={username}
                  placeholder="name@example.com" 
                  onChange={(evet) => setUsername(evet.target.value)}
                  />
              </FloatingLabel>
              <FloatingLabel 
                controlId="floatingPassword" 
                label="Contraseña"
                className="mb-4"
              >
                <Form.Control 
                  type="password" 
                  value={password}
                  placeholder="Contraseña" 
                  onChange={(evet) => setPassword(evet.target.value)}
                />
              </FloatingLabel>
              <div className="d-grid gap-2">
                {
                  loading
                    ? <Button variant='primary' size='lg' disabled >Cargando...</Button>
                    : <Button variant='primary' type='submit' size='lg'>Iniciar sesión</Button>
                }
                <hr/>
                <Button variant='secondary' size='lg' disabled={modalShow} onClick={() => setModalShow(true)}>Registrate</Button>              
              </div>
            </Form>
          </Col>
          <Register show={modalShow} onHide={() => setModalShow(false)}/>
        </Row>
      </Container>
  );
}

export default Login;