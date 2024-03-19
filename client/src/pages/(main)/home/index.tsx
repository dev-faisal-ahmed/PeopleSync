import { useGetJobsQuery } from '@/redux/api/job';
import { Statistics } from './statistics/statistics';
import { ApplicationStatus } from './status/application-status';
import { Summary } from './summary/summary';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/shared/job-card/job-card';

export default function HomePage() {
  const { data: jobs } = useGetJobsQuery('');

  return (
    <main className='px-6'>
      <section className='flex gap-6'>
        <div className='w-full'>
          <Summary />
          <div className='mt-10 flex flex-col gap-12 md:flex-row'>
            <Statistics />
            <ApplicationStatus />
          </div>
        </div>
        <div className='relative hidden min-w-72 border-l text-center xl:block'>
          <div
            style={{ height: `calc(100vh - 85px)` }}
            className='absolute left-0 top-0 w-1 rounded-full bg-primary-foreground'
          />
          <div className='pl-5'>
            <Link to={'/add-job'}>
              <Button>Create New Job</Button>
            </Link>
            <h1 className='mt-12 text-left font-semibold'>
              Recently Added Jobs
            </h1>
            <div className='mt-8 space-y-4'>
              {jobs?.data.map((job) => (
                <JobCard key={job._id} {...job} size='40px' />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
