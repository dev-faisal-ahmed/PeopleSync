import { Outlet } from 'react-router-dom';
import { Sidebar } from '../shared/sidebar/sidebar';
import { Topbar } from '../shared/topbar/topbar';

export function MainLayout() {
  return (
    <section className='grid grid-cols-1 md:grid-cols-[auto_1fr]'>
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
