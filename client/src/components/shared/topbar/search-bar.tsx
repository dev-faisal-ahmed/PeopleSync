import { Search as SearchIcon } from 'lucide-react';

export function SearchBar() {
  return (
    <form className='flex items-center rounded-md bg-primary-foreground'>
      <input
        className='bg-transparent pl-5 outline-none'
        type='text'
        name='searchBarKey'
        placeholder='Search ...'
      />
      <button className='flex size-9 items-center justify-center rounded-md bg-primary text-white'>
        <SearchIcon size={18} />
      </button>
    </form>
  );
}
