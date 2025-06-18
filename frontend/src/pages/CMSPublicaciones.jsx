import { useState } from 'react';
import FormularioPublicacion from '../components/FormularioPublicacion';
import usePublicaciones from '../hooks/usePublicaciones';

export default function CMSPublicaciones() {
  const { publicaciones, create, update, remove } = usePublicaciones();
  const [showForm, setShowForm] = useState(false);
  const [editPub, setEditPub] = useState(null);

  const handleCreate = () => {
    setEditPub(null);
    setShowForm(true);
  };

  const handleEdit = (pub) => {
    setEditPub(pub);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    try {
      if (editPub) {
        await update(editPub.id, data);
      } else {
        await create(data);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar publicación?')) return;
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">CMS Publicaciones</h1>
      <button onClick={handleCreate} className="px-3 py-1 bg-blue-500 text-white rounded">
        Nueva publicación
      </button>
      <ul className="space-y-2">
        {publicaciones.map((pub) => (
          <li key={pub.id} className="border p-2 flex justify-between items-center">
            <span>{pub.titulo}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(pub)}
                className="px-2 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(pub.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showForm && (
        <FormularioPublicacion
          initialData={editPub || {}}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
