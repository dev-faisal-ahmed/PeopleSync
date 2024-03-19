import { useGetJobsQuery } from '@/redux/api/job';

import { useState } from 'react';
import { ApplicationSelect } from './application-select';

export default function ApplicationPage() {
  const { data: jobsData } = useGetJobsQuery('');
  const [jobId, setJobId] = useState('');

  const onJobIdChange = (id: string) => setJobId(id);

  return (
    <section className='px-6'>
      {jobsData && jobsData?.data?.length ? (
        <>
          <div>
            <p className='mb-2 font-medium'>On Going Recruitment</p>
            <ApplicationSelect
              className='max-w-60'
              jobs={jobsData?.data}
              onSelectedIdChange={onJobIdChange}
              selectedId={jobId}
            />
          </div>
          {/* <div className='mt-6'>{JSON.stringify(selectedJob)}</div> */}
        </>
      ) : (
        <p className='mt-5 text-center text-base font-medium'>
          No On going Jobs are found
        </p>
      )}
    </section>
  );
}
