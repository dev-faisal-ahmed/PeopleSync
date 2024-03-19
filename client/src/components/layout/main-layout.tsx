import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Topbar } from '../shared/topbar/topbar';

export function MainLayout() {
  const location = useLocation();
  return (
    <section
      className={`grid min-h-screen grid-cols-1 md:grid-cols-[auto_1fr] ${location.pathname === '/' ? '' : 'bg-primary-foreground/30'}`}
    >
      <section className='no_scrollbar sticky left-0 top-0 hidden h-screen overflow-y-auto border-r md:block'>
        <Sidebar />
      </section>
      <section>
        <Topbar />
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
}
