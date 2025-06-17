import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SobreMi from './pages/SobreMi';
import CV from './pages/CV';
import Publicaciones from './pages/Publicaciones';
import Proyectos from './pages/Proyectos';
import Galeria from './pages/Galeria';
import Contacto from './pages/Contacto';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<SobreMi />} />
          <Route path="cv" element={<CV />} />
          <Route path="publicaciones" element={<Publicaciones />} />
          <Route element={<PrivateRoute />}> 
            <Route path="proyectos" element={<Proyectos />} />
          </Route>
          <Route path="galeria" element={<Galeria />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </Router>
  );
}
