import { useGetJobsQuery } from '@/redux/api/job';
import { JobCardForApply } from './job-card-for-apply';

export default function ApplyJobPage() {
  const { data: jobsData } = useGetJobsQuery('');
  return (
    <section className='grid gap-6 px-6 md:grid-cols-2 lg:grid-cols-3'>
      {jobsData?.data.map((job) => <JobCardForApply key={job._id} {...job} />)}
    </section>
  );
}
