import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-4 mt-20">
        <Outlet />
      </main>
    </>
  );
}
