export default function Contacto() {
  return (
    <section className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Contacto</h1>
      <p>Correo: <a href="mailto:docente@example.com" className="text-blue-600">docente@example.com</a></p>
      <ul className="space-y-1">
        <li><a href="#" className="text-blue-600">ResearchGate</a></li>
        <li><a href="#" className="text-blue-600">Google Scholar</a></li>
        <li><a href="#" className="text-blue-600">ORCID</a></li>
      </ul>
    </section>
  );
}
