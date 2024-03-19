import { useGetJobsQuery } from '@/redux/api/job';
import { Statistics } from './statistics/statistics';
import { ApplicationStatus } from './status/application-status';
import { Summary } from './summary/summary';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/shared/job-card/job-card';
import { useGetAllApplicationsQuery } from '@/redux/api/application';
import { useMemo } from 'react';
import { colors } from '@/data/colors';

export default function HomePage() {
  const { data: jobs } = useGetJobsQuery('');
  const { data: applications } = useGetAllApplicationsQuery(null);

  const genders = useMemo(
    () =>
      applications?.data?.reduce(
        (acc: { male: number; female: number }, data) => {
          console.log(data.gender);
          acc[data.gender] += 1;
          console.log(acc);
          return acc;
        },
        { male: 0, female: 0 },
      ),
    [applications],
  );

  return (
    <main className='px-6'>
      <section className='flex gap-6'>
        <div className='w-full'>
          <Summary />
          <div className='mt-10 flex flex-col gap-12 md:flex-row'>
            <Statistics />
            <ApplicationStatus />
          </div>
          <div className='mt-12 flex justify-center gap-6'>
            <div className='flex items-center gap-1'>
              <span
                style={{ backgroundColor: colors.primary }}
                className='size-3 rounded-full'
              />{' '}
              Male ({genders?.male})
            </div>
            <div className='flex items-center gap-1'>
              <span
                style={{ backgroundColor: colors.rejected }}
                className='size-3 rounded-full'
              />{' '}
              Female ({genders?.female})
            </div>
          </div>
        </div>
        <div className='relative hidden min-w-72 border-l text-center xl:block'>
          <div
            style={{ height: `calc(100vh - 85px)` }}
            className='absolute left-0 top-0 w-1 rounded-full bg-primary-foreground'
          />
          <div className='pl-6'>
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
