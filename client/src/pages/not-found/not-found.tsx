import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className='flex h-screen flex-col items-center justify-center gap-3'>
      <h1 className='text-xl font-semibold text-primary'>
        Opp's! This Will Be Coming Soon.
      </h1>

      <Link to={'/'}>
        <Button>Go to Home</Button>
      </Link>
    </main>
  );
}
