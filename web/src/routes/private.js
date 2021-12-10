import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = localStorage.getItem('token');
  return(
    auth
    ? <Outlet />
    : <Navigate to='/login'/>
  );
};

export default PrivateRoute;