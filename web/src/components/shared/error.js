import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert
} from 'react-bootstrap'

const Notification = ({message}) => {

  return(
    <>
      <Alert key='danger' variant='danger'>{
      message.map(()=>{
        
      })
      }</Alert>
    </>
  );
}

export default Notification;