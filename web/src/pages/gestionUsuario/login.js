import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery, useLazyQuery } from '@apollo/client';
import {
  FloatingLabel, 
  Form,
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'

import '../../styles/gestionUsuario/login.css';
import Register from '../../components/gestionUsuario/register';
import Notification from '../../components/shared/error';



// Define mutation
const CREDENTIALS_USER = gql`
  # Increments a back-end counter and gets its resulting value
  query login($correo: String!, $contrasena: String!){
    login(correo: $correo, contrasena: $contrasena){
      success
      user{
        _id
        nombre
        rol
        estado
      }
      token
    }
  }
`;

const Login = () =>{

  const [login, { loading, error, data }] = useLazyQuery(CREDENTIALS_USER);
  
  const [modalShow, setModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  //const [user, setUser] = useState(null);

  const RenderMessage = (message, estado) => {
    setErrorMessage(message);
    if(estado !== "Pendiente"){
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  const handelLogin = (evet) => {
    evet.preventDefault();
    
    try{
      

      if(username === '' || password === ''){
        RenderMessage('Ambos campos son obligatorios.', '');
        return 0;
      }

      if(error){
        RenderMessage(error.message, '');
        return 0;
      }
      console.log('antes de login');
      login({ variables: { 
        correo: username,
        contrasena: password
      }});
      console.log('despues del login');

      
      setUsername('');
      setPassword('');

      
      // Modificar el retorno de datos en el backend
      if(loading){

      }
      const {token, success, user} = data.login;

      if(!data){
        // Se ponen los errores
        console.log('error')
      }
      
      if(!success){
        RenderMessage('Usuario desconocido.', '');
        return 0;
      }else{
        if(user.estado === 'Pendiente' ){
          RenderMessage('Tu estado es "Pendiente" debes esperar a ser "Autorizado". Vuelve mas tarde.', '');
          return 0;
        }
        if(user.estado === 'Autorizado' || user.rol === 'Admin'){
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          navigate("/")
        }
      }
      
    }catch(e){
      console.log(e);
      RenderMessage('Error inesperado', '');
    }
  }


  return(
      <Container className='first-container'>
        <Row className='justify-content-center'>
          <Col>
            <h4 className='titulo'>Descripcion</h4>
            <p className='parrafo'>
              Ninguna.
            </p>
          </Col>
          <Col xs={6} md='5' className='third-container'>
          <Notification message={errorMessage}/>
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
                  onChange={(evet) => {setUsername(evet.target.value)}
                }/>
              </FloatingLabel>
              <FloatingLabel 
                controlId="floatingPassword" 
                label="Contraseña"
                className="mb-3"
              >
                <Form.Control 
                  type="password" 
                  value={password}
                  placeholder="Contraseña" 
                  onChange={(evet) => {setPassword(evet.target.value)}}
                />
              </FloatingLabel>
              <div className="d-grid gap-2">
                {/*
                  loading
                    ? <Button variant='primary' size='lg' disabled>Cargando...</Button>
                    : <Button variant='primary' type='submit' size='lg'>Iniciar sesión</Button>
                */}
                <Button variant='primary' type='submit' size='lg'>Iniciar sesion</Button>
                <hr/>
                <Button variant='secondary' size='lg' onClick={() => {setModalShow(true)}}>Registrate</Button>              
              </div>
            </Form>
          </Col>
          <Register show={modalShow} onHide={() => {setModalShow(false)}}/>
        </Row>
      </Container>
  );
}

export default Login;