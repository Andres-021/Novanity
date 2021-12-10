import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert
} from 'react-bootstrap'

const Notification2 = ({message}) => {

  return(
    <>
      {
        message
          ?  <Alert key='success' variant='success'>{message}</Alert>
          : null
      }
    </>
  );
}

export default Notification2;