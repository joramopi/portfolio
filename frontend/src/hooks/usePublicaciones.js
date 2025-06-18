import { useState, useEffect } from 'react';
import api from '../services/api';

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get('/publicaciones');
      setPublicaciones(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data) => {
    const res = await api.post('/api/publicaciones', data);
    setPublicaciones((p) => [...p, res.data]);
  };

  const update = async (id, data) => {
    const res = await api.put(`/api/publicaciones/${id}`, data);
    setPublicaciones((p) => p.map((it) => (it.id === id ? res.data : it)));
  };

  const remove = async (id) => {
    await api.delete(`/api/publicaciones/${id}`);
    setPublicaciones((p) => p.filter((it) => it.id !== id));
  };

  useEffect(() => {
    load();
  }, []);

  return { publicaciones, loading, error, load, create, update, remove };
}
