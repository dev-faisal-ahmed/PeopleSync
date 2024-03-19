import { useGetApplicationByJobIdQuery } from '@/redux/api/application';
import { useEffect } from 'react';
import { ApplicationInfoCard } from './application-info-card';
import { SearchApplication } from './search-application';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hook';
import {
  clearFilter,
  filterByStatus,
  updateApplications,
} from '@/redux/slices/application-slice';
import { RouteOff as RouteOffIcon } from 'lucide-react';
import { ApplicationStatusType } from '@/utils/types/application.type';
import { ApplicationStatusToggler } from './application-status-toggler';

type ApplicationTableProps = {
  jobId: string;
};

export function ApplicationInfo({ jobId }: ApplicationTableProps) {
  const { data: applicationData } = useGetApplicationByJobIdQuery(jobId, {
    skip: !jobId,
  });

  const dispatch = useAppDispatch();

  const {
    applications,
    inProcessCount,
    onHoldCount,
    rejectedCount,
    shortListedCount,
    isFilterEnabled,
  } = useAppSelector((state) => state.application);

  useEffect(() => {
    dispatch(updateApplications(applicationData?.data || []));
  }, [applicationData, dispatch]);

  const onFilterDisable = () => {
    dispatch(clearFilter(applicationData?.data || []));
  };

  const onFilerBasedOnStatus = (status: ApplicationStatusType) => {
    dispatch(
      filterByStatus({ status, allApplications: applicationData?.data || [] }),
    );
  };

  return (
    <>
      {applicationData?.data.length ? (
        <>
          <div className='my-5 flex flex-wrap items-center gap-2 rounded-md bg-white px-6 font-medium shadow'>
            <ApplicationStatusToggler status='all' onClick={onFilterDisable}>
              All ({applicationData?.data?.length})
            </ApplicationStatusToggler>

            <ApplicationStatusToggler
              status='shortlisted'
              onClick={() => onFilerBasedOnStatus('shortlisted')}
            >
              Shortlisted ({shortListedCount})
            </ApplicationStatusToggler>

            <ApplicationStatusToggler
              status='in_process'
              onClick={() => onFilerBasedOnStatus('in_process')}
            >
              In Process ({inProcessCount})
            </ApplicationStatusToggler>

            <ApplicationStatusToggler
              status='on_hold'
              onClick={() => onFilerBasedOnStatus('on_hold')}
            >
              On Hold ({onHoldCount})
            </ApplicationStatusToggler>

            <ApplicationStatusToggler
              status='rejected'
              onClick={() => onFilerBasedOnStatus('rejected')}
            >
              Rejected ({rejectedCount})
            </ApplicationStatusToggler>

            <div className='flex items-center gap-5 lg:ml-auto'>
              {isFilterEnabled && (
                <div
                  onClick={onFilterDisable}
                  className='flex items-center gap-2'
                >
                  <RouteOffIcon className='text-destructive' size={20} /> Reset
                </div>
              )}

              <SearchApplication />
            </div>
          </div>
          <div className='space-y-3'>
            {applications.length ? (
              <>
                {applications.map((application) => (
                  <ApplicationInfoCard key={application._id} {...application} />
                ))}
              </>
            ) : (
              <p className='mt-5 text-center font-semibold'>
                No Applicants Found
              </p>
            )}
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
