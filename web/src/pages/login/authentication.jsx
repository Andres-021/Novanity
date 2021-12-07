//import '../../styles/login/authentication.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FloatingLabel, 
  Form,
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'



const auth = () =>{

  return(
    <>
      <Container>
        <Row className='first-container'>
          <Col xs={6} md='auto' className='third-container'>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel 
              controlId="floatingPassword" 
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <Button variant='primary'>Iniciar sesion</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default auth;