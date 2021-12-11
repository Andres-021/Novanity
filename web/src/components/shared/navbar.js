import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigat,
  useNavigate,
} from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const NavBar = () => {
  const navigate = useNavigate();

  // Obtenemos los datos del localStorage, luego los parseamos en un json
  // y guardamos en una const para reutilizar en el codigo.
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);

  // --- Si vas a obtener algunos datos de user, es asi: ---
  // user._id o user.nombre o user.estado o user.rol

  const logout = () => {
    // En caso de presionar el logout se limpiara el storage y redireccionara al login.
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar fixed="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Novanity</Navbar.Brand>
        <Nav
          className="justify-content-center"
          justify
          variant="pills"
          defaultActiveKey="/"
        >
          {}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={"bottom"}>Inicio</Tooltip>}
          >
            {/* Ruta home */}
            <Nav.Link href="/">
              <img src="https://img.icons8.com/material-outlined/34/ffffff/home--v2.png" />
            </Nav.Link>
          </OverlayTrigger>
          {}
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id={"bottom"}>Proyectos</Tooltip>}
          >
            {/* Ruta proyectos */}
            <Nav.Link href="/#projects">
              <img src="https://img.icons8.com/material-outlined/34/ffffff/group-of-projects.png" />
            </Nav.Link>
          </OverlayTrigger>
          {
            // Si el rol del usuario que se encuentra almacenado es Admin, podra observar
            // la gestion de usuarios, de lo contrario no sera vista
            user.rol === "Admin" ? (
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id={"bottom"}>Usuarios</Tooltip>}
              >
                {/* Ruta proyectos */}
                <Nav.Link href="/#users">
                  <img src="https://img.icons8.com/material-outlined/34/ffffff/commercial-development-management.png" />
                </Nav.Link>
              </OverlayTrigger>
            ) : null
          }
          <NavDropdown
            title={
              <img src="https://img.icons8.com/material-outlined/32/ffffff/sorting-options.png" />
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="/#profile">
              <img src="https://img.icons8.com/material-outlined/30/000000/user.png" />{" "}
              Perfil
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>
              <img src="https://img.icons8.com/material-outlined/30/000000/exit.png" />{" "}
              Salir
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
