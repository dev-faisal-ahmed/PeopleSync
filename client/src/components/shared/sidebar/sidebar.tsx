import { cn } from '@/lib/utils';
import { Logo } from '../logo';
import { sidebarLinks } from '@/data/sidebar-links';
import { SidebarLink } from './sidebar-link';
import { useLocation } from 'react-router-dom';

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  return (
    <aside className={cn('h-screen bg-white p-3', className)}>
      <Logo />
      <div className='mt-6 flex flex-col gap-2'>
        {Object.keys(sidebarLinks).map((eachMenu) => (
          <div key={eachMenu}>
            <h3 className='mb-1 font-semibold'>{eachMenu}</h3>
            <div className='flex flex-col gap-1'>
              {sidebarLinks[eachMenu].map((link) => (
                <SidebarLink
                  key={link.url}
                  currentUrl={location.pathname}
                  icon={link.icon}
                  title={link.title}
                  url={link.url}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
