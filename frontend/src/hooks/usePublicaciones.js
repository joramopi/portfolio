import { useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      // Usar ruta pública sin autenticación para cargar datos
      const baseURL = import.meta.env.VITE_API_URL.replace('/api', '');
      const res = await axios.get(`${baseURL}/publicaciones`);
      setPublicaciones(res.data.publicaciones);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error cargando publicaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    try {
      const res = await api.post('/publicaciones', data);
      setPublicaciones((p) => [...p, res.data.publicacion]);
      return res.data.publicacion;
    } catch (err) {
      console.error('Error creando publicación:', err);
      throw err;
    }
  };

  const update = async (id, data) => {
    try {
      const res = await api.put(`/publicaciones/${id}`, data);
      setPublicaciones((p) =>
        p.map((it) => (it.id === id ? res.data.publicacion : it))
      );
      return res.data.publicacion;
    } catch (err) {
      console.error('Error actualizando publicación:', err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/publicaciones/${id}`);
      setPublicaciones((p) => p.filter((it) => it.id !== id));
    } catch (err) {
      console.error('Error eliminando publicación:', err);
      throw err;
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    publicaciones,
    loading,
    error,
    load,
    create,
    update,
    remove,
  };
}
