import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Auth from './pages/login/authentication';

function App() {
  return (
    <Router>
      <Routes>
          {/* Primera pantalla al entrar en la web. */}
          <Route exaxt path='' element={''}/>
          <Route exact path='/login' element={<Auth/>}/>
      </Routes>
    </Router>
  );
}

export default App;
