import { Outlet } from 'react-router-dom';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Topbar } from '../shared/topbar/topbar';

export function MainLayout() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-[auto_1fr]'>
      <Sidebar className='hidden md:block' />
      <section>
        <Topbar />
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
}
