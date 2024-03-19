import { Statistics } from './statistics/statistics';
import { Summary } from './summary/summary';

export default function HomePage() {
  return (
    <section className='px-6'>
      <section className='flex'>
        <div>
          <Summary />
          <div className='mt-3'>
            <Statistics />
          </div>
        </div>
        <section></section>
      </section>
    </section>
  );
}
