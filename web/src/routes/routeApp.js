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
import Projects from "../pages/gestionProyectos/projects.jsx";
import LeaderProjects from "../pages/gestionProyectos/ leaderProjects.jsx";
import StudentProjects from "../pages/gestionProyectos/studentProjects.jsx";

function RouteApp() {
  return (
    <Router>
      <Routes>
        {/* Primera pantalla al entrar en la web. */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        {/* visible solo para rol administrador*/}
        <Route exact path="/users" element={<Users />} />
        {/* visible para todos los roles */}
        <Route exact path="/profile" element={<Perfil />} />
        {/* visible solo para rol lider */}
        <Route exact path="/studentUser" element={<StudentUser />} />
        {/* visible para todos los roles */}
        <Route exact path="/projects" element={<Projects />} />
        {/* visible solo para rol lider */}
        <Route exact path="/leaderProjects" element={<LeaderProjects />} />
        {/* visible solo para rol estudiantes */}
        <Route exact path="/studentProjects" element={<StudentProjects />} />
        <Route path="*" element={<NotFound />} />y
      </Routes>
    </Router>
  );
}

export default RouteApp;
