// frontend/src/pages/CMSPublicaciones.jsx

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FormularioPublicacion from '../components/FormularioPublicacion';

const CMSPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  const cargarPublicaciones = async () => {
    try {
      const res = await api.get('/publicaciones');
      setPublicaciones(res.data);
    } catch (err) {
      console.error('Error al cargar publicaciones:', err);
    }
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const handleEditar = (pub) => {
    setPublicacionSeleccionada(pub); // ← se envía al formulario
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta publicación?')) return;
    try {
      await api.delete(`/publicaciones/${id}`);
      cargarPublicaciones();
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestión de Publicaciones</h1>

      <button
        onClick={() => {
          setPublicacionSeleccionada(null);
          setMostrarFormulario(true);
        }}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Nueva publicación
      </button>

      {mostrarFormulario && (
        <FormularioPublicacion
          publicacion={publicacionSeleccionada}
          onClose={() => setMostrarFormulario(false)}
          onRefresh={cargarPublicaciones}
        />
      )}

      <ul className="space-y-2 mt-6">
        {publicaciones.map((pub) => (
          <li key={pub.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-lg font-semibold">{pub.titulo}</h2>
            <p>{pub.revista} — {pub.año}</p>
            <p><a href={pub.doi} target="_blank" rel="noreferrer" className="text-blue-500 underline">{pub.doi}</a></p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleEditar(pub)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(pub.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CMSPublicaciones;
