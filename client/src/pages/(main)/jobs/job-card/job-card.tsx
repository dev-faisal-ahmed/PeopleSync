import { JobType } from '@/utils/types/job.types';

export function JobCard({ title, applications, vacancy }: JobType) {
  return (
    <div className='flex gap-5 rounded-lg bg-primary-foreground/50 p-4 shadow-sm'>
      <div className='flex size-14 items-center justify-center rounded-md bg-primary p-4 text-xl text-white'>
        {applications.length}
      </div>
      <div>
        <h3 className='mb-1 text-base font-medium'>{title}</h3>
        <p className='text-gray-700'>Vacancy : {vacancy}</p>
      </div>
    </div>
  );
}
