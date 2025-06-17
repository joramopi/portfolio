export default function PublicacionCard({ pub }) {
  return (
    <div className="bg-white shadow hover:shadow-md transition-shadow rounded w-48 shrink-0 overflow-hidden">
      {pub.portada ? (
        <img src={pub.portada} alt={pub.titulo} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full flex items-center justify-center bg-gray-100 text-gray-500">
          Sin imagen
        </div>
      )}
      <div className="p-2 space-y-1">
        <h3 className="font-semibold text-sm truncate">{pub.titulo}</h3>
        <p className="text-xs text-gray-600">
          {pub.año} - {pub.revista}
        </p>
        <a
          href={pub.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-500 text-sm hover:underline"
        >
          Ver DOI
        </a>
      </div>
    </div>
  );
}
