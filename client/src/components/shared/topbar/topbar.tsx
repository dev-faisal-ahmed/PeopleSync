import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SearchBar } from './search-bar';
import { Menu as MenuIcon } from 'lucide-react';
import { Sidebar } from '../sidebar/sidebar';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hook';
import { updateIsSidebarOpen } from '@/redux/slices/ui-slice';

export function Topbar() {
  const { isSidebarOpen } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  return (
    <nav className='flex items-center justify-between p-6'>
      {/*  */}
      <div className='block md:hidden'>
        <Sheet
          open={isSidebarOpen}
          onOpenChange={(val) => dispatch(updateIsSidebarOpen(val))}
        >
          <SheetTrigger asChild>
            <MenuIcon className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent side={'left'}>
            <Sidebar className='border-none' />
          </SheetContent>
        </Sheet>
      </div>
      <h1 className='hidden text-lg font-semibold sm:block'>Good Morning</h1>
      <SearchBar />
    </nav>
  );
}
