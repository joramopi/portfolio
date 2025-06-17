export default function Proyectos() {
  const proyectos = [
    { titulo: 'Proyecto 1', objetivo: 'Objetivo 1', resultado: 'Resultado 1' },
    { titulo: 'Proyecto 2', objetivo: 'Objetivo 2', resultado: 'Resultado 2' },
  ];

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Proyectos</h1>
      {proyectos.map((p) => (
        <div key={p.titulo} className="border p-4 rounded shadow-sm">
          <h2 className="font-semibold">{p.titulo}</h2>
          <p className="text-sm text-gray-600">{p.objetivo}</p>
          <p className="text-sm">{p.resultado}</p>
        </div>
      ))}
    </section>
  );
}
