import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex flex-wrap gap-4 justify-center">
        <Link to="/">Inicio</Link>
        <Link to="/about">Sobre mí</Link>
        <Link to="/cv">CV</Link>
        <Link to="/publications">Publicaciones</Link>
        <Link to="/projects">Proyectos</Link>
        <Link to="/gallery">Galería</Link>
        <Link to="/contact">Contacto</Link>
      </nav>
    </header>
  );
}
