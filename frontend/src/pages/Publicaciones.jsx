import { useState } from 'react';
import FormularioPublicacion from '../components/FormularioPublicacion';
import usePublicaciones from '../hooks/usePublicaciones';
import { useAuth } from '../context/AuthContext';

export default function Publicaciones() {
  const { user } = useAuth();
  const { publicaciones, load, remove } = usePublicaciones();
  const [showForm, setShowForm] = useState(false);
  const [editPub, setEditPub] = useState(null);

  const canEdit = user && (user.role === 'admin' || user.role === 'editor');


  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Publicaciones</h1>
      {canEdit && (
        <button
          onClick={() => {
            setEditPub(null);
            setShowForm(true);
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Nueva publicación
        </button>
      )}
      <ul className="space-y-2">
        {publicaciones.map((pub) => (
          <li key={pub.id} className="border p-2 flex justify-between items-center">
            <span>{pub.titulo}</span>
            {canEdit && (
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditPub(pub);
                    setShowForm(true);
                  }}
                  className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => remove(pub.id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showForm && canEdit && (
        <FormularioPublicacion
          publicacion={editPub}
          isEditing={!!editPub}
          onClose={() => {
            setShowForm(false);
            setEditPub(null);
          }}
          onRefresh={load}
        />
      )}
    </section>
  );
}
