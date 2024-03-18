import { Outlet } from 'react-router-dom';
import { Sidebar } from '../shared/sidebar/sidebar';

export function MainLayout() {
  return (
    <section className='grid grid-cols-[auto_1fr]'>
      <Sidebar />
      <section>
        <main>
          <Outlet />
        </main>
      </section>
    </section>
  );
}
