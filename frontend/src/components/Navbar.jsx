import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''}`;

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <nav className="max-w-4xl mx-auto flex gap-2 p-4 overflow-x-auto">
        <NavLink to="/" end className={linkClass}>
          Inicio
        </NavLink>
        <NavLink to="/sobre-mi" className={linkClass}>
          Sobre mí
        </NavLink>
        <NavLink to="/cv" className={linkClass}>
          CV
        </NavLink>
        <NavLink to="/publicaciones" className={linkClass}>
          Publicaciones
        </NavLink>
        <NavLink to="/proyectos" className={linkClass}>
          Proyectos
        </NavLink>
        {user && (user.role === 'admin' || user.role === 'editor') && (
          <NavLink to="/cms-publicaciones" className={linkClass}>
            CMS
          </NavLink>
        )}
        <NavLink to="/galeria" className={linkClass}>
          Galería
        </NavLink>
        <NavLink to="/contacto" className={linkClass}>
          Contacto
        </NavLink>
      </nav>
    </header>
  );
}
