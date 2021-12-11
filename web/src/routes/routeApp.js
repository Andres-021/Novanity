import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/gestionUsuario/login.js";
import Home from "../pages/home/home.js";
import NotFound from "../pages/notFound.js";
import PrivateRoute from "./private.js";

import "../styles/global.css";
import Users from "../pages/gestionUsuario/users.jsx";
import Perfil from "../pages/gestionUsuario/profile.jsx";
import StudentUser from "../pages/gestionUsuario/studentUser.jsx";

function RouteApp() {
  return (
    <Router>
      <Routes>
        {/* Primera pantalla al entrar en la web. */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/profile" element={<Perfil />} />
        <Route exact path="/studentUser" element={<StudentUser />} />
        <Route path="*" element={<NotFound />} />y
      </Routes>
    </Router>
  );
}

export default RouteApp;
