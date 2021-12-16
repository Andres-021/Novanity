import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const PrivateRouteStudents = () => {
  
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);


  return(
    user.rol === 'Estudiante' || user.rol === 'Admin'
    ? <Outlet />
    : <Navigate to='/'/>
  );
};

export default PrivateRouteStudents;