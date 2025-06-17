import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex flex-wrap gap-4 justify-center">
        <Link to="/">Inicio</Link>
        <Link to="/sobre-mi">Sobre mí</Link>
        <Link to="/cv">CV</Link>
        <Link to="/publicaciones">Publicaciones</Link>
        <Link to="/proyectos">Proyectos</Link>
        <Link to="/galeria">Galería</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>
    </header>
  );
}
