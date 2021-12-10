import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert
} from 'react-bootstrap'

const Notification = ({message}) => {

  return(
    <>
      {
        message
          ?  <Alert key='danger' variant='danger'>{message}</Alert>
          : null
      }
    </>
  );
}

export default Notification;