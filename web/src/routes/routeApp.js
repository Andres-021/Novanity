import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Login from '../pages/gestionUsuario/login.js';
import Home from '../pages/home/home.js'
import NotFound from '../pages/notFound.js';
import PrivateRoute from './private.js';

import '../styles/global.css';



function RouteApp() {
  return (
    <Router>
      <Routes>
          {/* Primera pantalla al entrar en la web. */}
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route exact path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default RouteApp;
