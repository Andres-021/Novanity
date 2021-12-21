import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'


const Cards = ({list}) => {


  return(
    <>
      {
        list.map((item) => (
          <Card border="primary" className='mb-5'>
            <Card.Header>
              <strong>Titulo:</strong> {item.nombre_proyecto} <br/>
              <strong>ID:</strong> {item._id}
              </Card.Header>
            <Card.Body>
              <Card.Text>
              <strong>Objetivos generales:</strong> {item.objetivos_generales}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"><strong>Estado:</strong> {item.estado_proyecto}</Card.Footer>
          </Card>
        ))
      }
    </>
  );
}

export default Cards;