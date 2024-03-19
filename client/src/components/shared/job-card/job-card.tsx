import { JobType } from '@/utils/types/job.types';

type JobCardProps = JobType & {
  size?: string;
};

export function JobCard({
  title,
  applications,
  vacancy,
  size = '56px',
}: JobCardProps) {
  return (
    <div className='flex items-center gap-5 rounded-lg bg-primary-foreground/50 p-4 shadow-sm'>
      <div
        style={{ height: size, width: size }}
        className='flex size-14 items-center justify-center rounded-md bg-primary p-4 text-xl text-white'
      >
        {applications.length}
      </div>
      <div>
        <h3 className='mb-1 line-clamp-1 text-base font-medium'>{title}</h3>
        <p className='text-gray-700'>Vacancy : {vacancy}</p>
      </div>
    </div>
  );
}
