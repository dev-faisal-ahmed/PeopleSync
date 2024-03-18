import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/redux/redux-hook';
import { updateIsSidebarOpen } from '@/redux/slices/ui-slice';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type SidebarLinkProps = {
  title: string;
  url: string;
  icon: ReactNode;
  currentUrl: string;
};

export function SidebarLink({
  title,
  url,
  icon,
  currentUrl,
}: SidebarLinkProps) {
  const dispatch = useAppDispatch();
  return (
    <Link
      onClick={() => dispatch(updateIsSidebarOpen(false))}
      className={cn(
        `flex items-center gap-3 rounded-md py-2 pl-3 pr-16 text-sm transition-colors duration-300 hover:bg-gray-400 hover:text-white`,
        currentUrl === url ? 'bg-primary text-white' : null,
      )}
      to={url}
    >
      {icon}
      {title}
    </Link>
  );
}
