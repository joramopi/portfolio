import photo1 from '../assets/photo1.svg';
import photo2 from '../assets/photo2.svg';
import photo3 from '../assets/photo3.svg';

export default function Galeria() {
  const images = [photo1, photo2, photo3];
  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Galería</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <img key={idx} src={src} alt={`Evento ${idx + 1}`} className="rounded shadow" />
        ))}
      </div>
    </section>
  );
}
