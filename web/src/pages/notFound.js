import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert,
  Container
} from 'react-bootstrap';

const NotFound = () => {
  return(
    <Container>
      <Alert variant="danger">
        <Alert.Heading>Hey, hola.</Alert.Heading>
        <p>
          Lo sentimos, pero la ruta a la que intentas acceder no se encuentra en el sistema.
        </p>
        <p className="mb-0">
          Verifica si la ruta que estas buscando es la correcta.
        </p>
        <hr/>
        <h1>Error: 404</h1>
      </Alert>
    </Container>
  );
}

export default NotFound;