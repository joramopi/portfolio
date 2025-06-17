import { useState } from 'react';

export default function FormularioPublicacion({ initialData = {}, onSave, onClose }) {
  const [titulo, setTitulo] = useState(initialData.titulo || '');
  const [año, setAño] = useState(initialData.año || '');
  const [revista, setRevista] = useState(initialData.revista || '');
  const [doi, setDoi] = useState(initialData.doi || '');
  const [portada, setPortada] = useState(initialData.portada || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !año || !revista || !doi || !portada) {
      alert('Todos los campos son obligatorios');
      return;
    }
    onSave({ titulo, año, revista, doi, portada });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded w-80 space-y-2">
        <h2 className="text-lg font-bold mb-2">
          {initialData.id ? 'Editar publicación' : 'Nueva publicación'}
        </h2>
        <div>
          <label className="block text-sm">Título</label>
          <input
            className="border w-full px-2 py-1"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Año</label>
          <input
            type="number"
            className="border w-full px-2 py-1"
            value={año}
            onChange={(e) => setAño(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Revista</label>
          <input
            className="border w-full px-2 py-1"
            value={revista}
            onChange={(e) => setRevista(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">DOI</label>
          <input
            className="border w-full px-2 py-1"
            value={doi}
            onChange={(e) => setDoi(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Portada (URL)</label>
          <input
            className="border w-full px-2 py-1"
            value={portada}
            onChange={(e) => setPortada(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancelar
          </button>
          <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
