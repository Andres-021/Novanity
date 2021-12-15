import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert
} from 'react-bootstrap'

const Notification2 = ({message, key}) => {

  return(
    <>
      {
        message
          ?  <Alert key={key} variant={key}>{message}</Alert>
          : null
      }
    </>
  );
}

export default Notification2;