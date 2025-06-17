import { useEffect, useState } from 'react';
import api from '../services/api';
import PublicacionCard from '../components/PublicacionCard';
import fakeData from '../data/publicaciones';

export default function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    api
      .get('/publicaciones')
      .then((res) => setPublicaciones(res.data))
      .catch(() => setPublicaciones(fakeData));
  }, []);

  if (publicaciones.length === 0) {
    return (
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
        <p>No hay publicaciones disponibles todavía.</p>
      </section>
    );
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
      <div className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="snap-start">
            <PublicacionCard pub={pub} />
          </div>
        ))}
      </div>
    </section>
  );
}
