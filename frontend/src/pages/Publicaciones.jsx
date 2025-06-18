import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PublicacionCard from '../components/PublicacionCard';
import usePublicaciones from '../hooks/usePublicaciones';
import { useAuth } from '../context/AuthContext';

export default function Publicaciones() {
  const { user } = useAuth();
  const { publicaciones, loading, error, load } = usePublicaciones();
  const [searchTerm, setSearchTerm] = useState('');

  const canEdit = user && (user.role === 'admin' || user.role === 'editor');

  const filteredPublicaciones = publicaciones.filter(pub =>
    pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.revista.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
        <LoadingSpinner size="lg" className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
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
    <section className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Publicaciones</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar publicaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
          />
          {canEdit && (
            <a
              href="/cms-publicaciones"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            >
              Gestionar CMS
            </a>
          )}
        </div>
      </div>

      {publicaciones.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay publicaciones</h3>
          <p className="mt-1 text-sm text-gray-500">
            {canEdit ? 'Comienza agregando tu primera publicación.' : 'Aún no se han publicado artículos.'}
          </p>
        </div>
      ) : filteredPublicaciones.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No se encontraron publicaciones que coincidan con "{searchTerm}"</p>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Mostrando {filteredPublicaciones.length} de {publicaciones.length} publicaciones
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPublicaciones.map((pub) => (
              <PublicacionCard key={pub.id} pub={pub} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
