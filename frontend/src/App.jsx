import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import CV from './pages/CV';
import Publications from './pages/Publications';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
