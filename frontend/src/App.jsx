import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SobreMi from './pages/SobreMi';
import CV from './pages/CV';
import Publicaciones from './pages/Publicaciones';
import Proyectos from './pages/Proyectos';
import Galeria from './pages/Galeria';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="sobre-mi" element={<SobreMi />} />
          <Route path="cv" element={<CV />} />
          <Route path="publicaciones" element={<Publicaciones />} />
          <Route path="proyectos" element={<Proyectos />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </Router>
  );
}
