import { JobType } from '@/utils/types/job.types';
import { BriefcaseBusiness, ReceiptPoundSterling } from 'lucide-react';
import { ApplyJobForm } from './apply-job-component/apply-job-form';

export function JobCardForApply({
  title,
  salary,
  experienceRequired,
  skillsSet,
  _id,
}: JobType) {
  return (
    <div className='rounded-lg bg-primary-foreground/50 p-5'>
      <h1 className='text-base font-medium'>{title}</h1>
      <div className='mt-3 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <ReceiptPoundSterling size={25} /> {salary}
        </div>
        <div className='flex items-center gap-2'>
          <BriefcaseBusiness size={25} />{' '}
          {experienceRequired
            ? experienceRequired > 1
              ? `${experienceRequired} Years`
              : `${experienceRequired} Year`
            : 'N/A'}
        </div>
      </div>
      <ul className='my-3 ml-5'>
        {skillsSet.map((skill) => (
          <li key={skill} className='list-disc capitalize'>
            {skill}
          </li>
        ))}
      </ul>
      <ApplyJobForm key={_id} job={_id} />
    </div>
  );
}
