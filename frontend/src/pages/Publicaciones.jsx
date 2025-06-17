export default function Publicaciones() {
  const dummy = Array.from({ length: 6 });
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {dummy.map((_, idx) => (
          <div key={idx} className="bg-gray-200 h-32 rounded"></div>
        ))}
      </div>
    </section>
  );
}
