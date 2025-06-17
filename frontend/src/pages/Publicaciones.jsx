export default function Publicaciones() {
  const dummy = Array.from({ length: 8 });
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Publicaciones</h1>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {dummy.map((_, idx) => (
          <div
            key={idx}
            className="min-w-[150px] bg-gray-200 h-32 rounded shrink-0"
          ></div>
        ))}
      </div>
    </section>
  );
}
