import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const PrivateRoute = () => {
  const auth = localStorage.getItem('token');
  return(
    auth
    ? <Outlet />
    : <Navigate to='/login'/>
    // <Route {...rest} render = {(props) => 
    //   auth ? (<Component {...props}/>
    //     ):(
    //       <Navigate to={{
    //         pathname: '/login',
    //         state: {from: props.location}
    //       }}
    //       />
    //     )
    //   }
    // />
  );
};

export default PrivateRoute;