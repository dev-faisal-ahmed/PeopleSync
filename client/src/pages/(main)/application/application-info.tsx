import { useGetApplicationByJobIdQuery } from '@/redux/api/application';
import { filterApplicationByStatus } from '@/utils/helper/application-helper';
import { useMemo } from 'react';
import { ApplicationInfoCard } from './application-info-card';

type ApplicationTableProps = {
  jobId: string;
};
export function ApplicationInfo({ jobId }: ApplicationTableProps) {
  const { data: applicationData } = useGetApplicationByJobIdQuery(jobId, {
    skip: !jobId,
  });

  const shortListedCount = useMemo(
    () =>
      filterApplicationByStatus(applicationData?.data || [], 'shortlisted')
        .length,
    [applicationData],
  );

  const inProcessCount = useMemo(
    () =>
      filterApplicationByStatus(applicationData?.data || [], 'in_process')
        .length,
    [applicationData],
  );

  const onHoldCount = useMemo(
    () =>
      filterApplicationByStatus(applicationData?.data || [], 'on_hold').length,
    [applicationData],
  );

  const rejectedCount = useMemo(
    () =>
      filterApplicationByStatus(applicationData?.data || [], 'rejected').length,
    [applicationData],
  );

  return (
    <>
      {applicationData && applicationData?.data?.length ? (
        <>
          <div className='my-5 flex flex-wrap items-center gap-5 rounded-md bg-white px-6 py-3 font-medium shadow'>
            <p>All ({applicationData?.data?.length})</p>
            <p>Shortlisted ({shortListedCount})</p>
            <p>In Process ({inProcessCount})</p>
            <p>On Hold ({onHoldCount})</p>
            <p>Rejected ({rejectedCount})</p>
          </div>
          <div className='space-y-3'>
            {applicationData.data.map((application) => (
              <ApplicationInfoCard key={application._id} {...application} />
            ))}
          </div>
        </>
      ) : (
        <>
          {jobId ? (
            <p className='mt-5 text-center font-semibold'>
              No Application Found For This Job
            </p>
          ) : (
            <p className='mt-5 text-center font-semibold'>
              Please Select Any Job
            </p>
          )}
        </>
      )}
    </>
  );
}
