import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/redux-hook';
import { searchByName } from '@/redux/slices/application-slice';
import { useState } from 'react';

type SearchFromFiledType = {
  name: string;
};

export function SearchApplication() {
  const { register, handleSubmit } = useForm<SearchFromFiledType>();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSearch = (data: SearchFromFiledType) => {
    if (data.name) dispatch(searchByName(data.name));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex cursor-pointer items-center gap-2'>
          <SearchIcon className='text-primary' size={20} />
          Search
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Applicants</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSearch)} className='mt-3'>
          <Input
            placeholder='Input Applicants Name'
            type='text'
            {...register('name')}
          />
          <Button className='mt-5 block w-full'>Search</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
