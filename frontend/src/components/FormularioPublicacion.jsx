// frontend/src/components/FormularioPublicacion.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FormularioPublicacion = ({ publicacion, onClose, onRefresh }) => {
  const [form, setForm] = useState({
    titulo: '',
    año: '',
    revista: '',
    doi: '',
    portada: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (publicacion) {
      setForm({
        titulo: publicacion.titulo || '',
        año: publicacion.año || '',
        revista: publicacion.revista || '',
        doi: publicacion.doi || '',
        portada: publicacion.portada || ''
      });
      setFile(null);
    }
  }, [publicacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = { ...form };
      if (file) {
        const fd = new FormData();
        fd.append('image', file);
        const res = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        data.portada = res.data.url;
      }

      if (publicacion?.id) {
        await api.put(`/publicaciones/${publicacion.id}`, data);
      } else {
        await api.post('/publicaciones', data);
      }
      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error al guardar publicación:', error);
      alert('Error al guardar publicación');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <input
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="año"
        placeholder="Año"
        type="number"
        value={form.año}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="revista"
        placeholder="Revista"
        value={form.revista}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        name="doi"
        placeholder="DOI"
        value={form.doi}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="portada"
        placeholder="URL de portada"
        value={form.portada}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormularioPublicacion;
