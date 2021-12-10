import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from './pages/gestionUsuario/authentication/login.js';
import Home from './pages/home/home.js'
import NotFound from './pages/notFound.js';
import PrivateRoute from './routes/private.js';

import './styles/global.css';



function App() {
  return (
    <Router>
      <Routes>
          {/* Primera pantalla al entrar en la web. */}
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>y
      </Routes>
    </Router>
  );
}

export default App;
