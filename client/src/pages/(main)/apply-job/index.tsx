import { useGetJobsQuery } from '@/redux/api/job';
import { JobCardForApply } from './job-card-for-apply';

export default function ApplyJob() {
  const { data: jobsData } = useGetJobsQuery('');
  return (
    <section className='grid grid-cols-3 gap-6 px-6'>
      {jobsData?.data.map((job) => <JobCardForApply key={job._id} {...job} />)}
    </section>
  );
}
