import photo1 from '../assets/photo1.svg';
import photo2 from '../assets/photo2.svg';
import photo3 from '../assets/photo3.svg';

export default function Home() {
  return (
    <section className="p-4 text-center space-y-6">
      <h1 className="text-3xl font-bold">Inicio</h1>
      <p className="text-lg text-gray-600">Bienvenida al portafolio académico</p>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <img src={photo1} alt="Foto 1" className="rounded shadow" />
        <img src={photo2} alt="Foto 2" className="rounded shadow" />
        <img src={photo3} alt="Foto 3" className="rounded shadow" />
      </div>
    </section>
  );
}
