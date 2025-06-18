import { useEffect, useState } from 'react';
import api from '../services/api';
import FormularioPublicacion from '../components/FormularioPublicacion';

export default function CMSPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editPub, setEditPub] = useState(null);

  const [error, setError] = useState('');

  const load = () => {
    api
      .get('/publicaciones')
      .then((res) => {
        setPublicaciones(res.data);
        setError('');
      })
      .catch(() => {
        setError('No se pudieron cargar las publicaciones');
      });
  };

  useEffect(() => {
    load();
  }, []);

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
        const res = await api.put(`/publicaciones/${editPub.id}`, data);
        setPublicaciones((p) => p.map((it) => (it.id === editPub.id ? res.data : it)));
      } else {
        const res = await api.post('/publicaciones', data);
        setPublicaciones((p) => [...p, res.data]);
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Error al guardar publicación');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar publicación?')) return;
    try {
      await api.delete(`/publicaciones/${id}`);
      setPublicaciones((p) => p.filter((it) => it.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar publicación');
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
      {error && <p className="text-red-600">{error}</p>}
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
