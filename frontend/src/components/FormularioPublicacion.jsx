import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FormularioPublicacion = ({ publicacion, onClose, onRefresh, isEditing = false }) => {
  const [form, setForm] = useState({
    titulo: '',
    año: '',
    revista: '',
    doi: '',
    portada: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (publicacion && isEditing) {
      setForm({
        titulo: publicacion.titulo || '',
        año: publicacion.año || '',
        revista: publicacion.revista || '',
        doi: publicacion.doi || '',
        portada: publicacion.portada || ''
      });
    } else {
      // Reset form para nueva publicación
      setForm({
        titulo: '',
        año: '',
        revista: '',
        doi: '',
        portada: ''
      });
    }
    setFile(null);
    setErrors({});
  }, [publicacion, isEditing]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.titulo.trim()) newErrors.titulo = 'Título es requerido';
    if (!form.año || form.año < 1900 || form.año > new Date().getFullYear() + 1) {
      newErrors.año = 'Año debe ser válido';
    }
    if (!form.revista.trim()) newErrors.revista = 'Revista es requerida';
    if (!form.doi.trim()) newErrors.doi = 'DOI es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo al editarlo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrors(prev => ({ ...prev, file: 'Solo se permiten imágenes (JPG, PNG, WebP)' }));
        return;
      }

      // Validar tamaño (5MB máximo)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'La imagen debe ser menor a 5MB' }));
        return;
      }

      setFile(selectedFile);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let data = { ...form };

      // Subir archivo si existe
      if (file) {
        const fd = new FormData();
        fd.append('image', file);
        const uploadRes = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        data.portada = uploadRes.data.url;
      }

      // Crear o actualizar publicación
      if (isEditing && publicacion?.id) {
        await api.put(`/publicaciones/${publicacion.id}`, data);
      } else {
        await api.post('/publicaciones', data);
      }

      onRefresh();
      onClose();
    } catch (error) {
      console.error('Error al guardar publicación:', error);
      setErrors({
        submit: error.response?.data?.message || 'Error al guardar publicación'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Editar Publicación' : 'Nueva Publicación'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <div>
            <input
              name="titulo"
              placeholder="Título"
              value={form.titulo}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.titulo ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
          </div>

          <div>
            <input
              name="año"
              placeholder="Año"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 1}
              value={form.año}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.año ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.año && <p className="text-red-500 text-sm mt-1">{errors.año}</p>}
          </div>

          <div>
            <input
              name="revista"
              placeholder="Revista"
              value={form.revista}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.revista ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.revista && <p className="text-red-500 text-sm mt-1">{errors.revista}</p>}
          </div>

          <div>
            <input
              name="doi"
              placeholder="DOI (ej: https://doi.org/10.1000/xyz)"
              value={form.doi}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${errors.doi ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.doi && <p className="text-red-500 text-sm mt-1">{errors.doi}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen de portada
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
          </div>

          <div>
            <input
              name="portada"
              placeholder="O URL de portada"
              value={form.portada}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioPublicacion;
