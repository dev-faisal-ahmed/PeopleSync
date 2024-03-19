import { Button } from '@/components/ui/button';
import { useGetJobsQuery } from '@/redux/api/job';
import { Plus as PlusIcons } from 'lucide-react';
import { JobCard } from '../../../components/shared/job-card/job-card';
import { Link } from 'react-router-dom';

export default function JobPage() {
  const { data: jobData } = useGetJobsQuery('');
  return (
    <section className='px-6'>
      <Link to={'/add-job'}>
        <Button className='ml-auto flex items-center gap-2'>
          <PlusIcons size={20} /> Create A Job
        </Button>
      </Link>
      <section className='mt-5 grid grid-cols-3 gap-6'>
        {jobData?.data.map((job) => <JobCard key={job._id} {...job} />)}
      </section>
    </section>
  );
}
