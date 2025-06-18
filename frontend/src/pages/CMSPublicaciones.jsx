import { useState } from 'react';
import FormularioPublicacion from '../components/FormularioPublicacion';
import LoadingSpinner from '../components/LoadingSpinner';
import usePublicaciones from '../hooks/usePublicaciones';

export default function CMSPublicaciones() {
  const { publicaciones, loading, error, load, create, update, remove } = usePublicaciones();
  const [showForm, setShowForm] = useState(false);
  const [editPub, setEditPub] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleCreate = () => {
    setEditPub(null);
    setShowForm(true);
  };

  const handleEdit = (pub) => {
    setEditPub(pub);
    setShowForm(true);
  };


  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return;

    setDeleteLoading(id);
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar la publicación');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditPub(null);
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">CMS Publicaciones</h1>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">CMS Publicaciones</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error al cargar las publicaciones: {error.message}</p>
          <button 
            onClick={load}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CMS Publicaciones</h1>
        <button 
          onClick={handleCreate} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Nueva publicación
        </button>
      </div>

      {publicaciones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No hay publicaciones aún.</p>
          <p className="text-sm mt-2">Crea la primera publicación usando el botón de arriba.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {publicaciones.map((pub) => (
              <li key={pub.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{pub.titulo}</h3>
                    <p className="text-sm text-gray-600">
                      {pub.año} • {pub.revista}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(pub)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id)}
                      disabled={deleteLoading === pub.id}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {deleteLoading === pub.id ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-1" />
                          Eliminando...
                        </>
                      ) : (
                        'Eliminar'
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <FormularioPublicacion
          publicacion={editPub}
          isEditing={!!editPub}
          onClose={handleCloseForm}
          onRefresh={load}
        />
      )}
    </section>
  );
}
