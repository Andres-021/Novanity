import {Navigate, Outlet} from 'react-router-dom';

// function PrivateRoute () {
const PrivateRouteLider = () => {
  
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);


  return(
    user.rol === 'Lider' || user.rol === 'Admin'
    ? <Outlet />
    : <Navigate to='/'/>
  );
};

export default PrivateRouteLider;