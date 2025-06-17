import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
}
