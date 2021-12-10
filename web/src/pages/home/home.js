import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../components/shared/navbar'
import {Container} from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client';

// Define mutation
const USERS = gql`
  # Increments a back-end counter and gets its resulting value
  query {
    usuarios{
      _id
      nombre
      correo
    }
  }
`;

const Home = () => {

  const { error, data } = useQuery(USERS); 

  
  console.log(error);
  console.log(data);

  return( 
    <>
      <NavBar/>
      <a href="https://icons8.com/icon">Icons by Icons8</a>
    </>
  );
}

export default Home;