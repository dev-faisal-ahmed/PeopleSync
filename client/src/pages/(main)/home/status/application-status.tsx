import { useGetApplicationByJobIdQuery } from '@/redux/api/application';
import { filterApplicationByStatus } from '@/utils/helper/application-helper';
import { useMemo } from 'react';
import { ProgressBar } from './progress-bar';
import { colors } from '@/data/colors';
import { blue, gray } from 'tailwindcss/colors';

export function ApplicationStatus() {
  const { data: allApplications } = useGetApplicationByJobIdQuery('');

  const shortlistedCount = useMemo(
    () =>
      filterApplicationByStatus(allApplications?.data || [], 'shortlisted')
        .length,
    [allApplications],
  );

  const rejectedCount = useMemo(
    () =>
      filterApplicationByStatus(allApplications?.data || [], 'rejected').length,
    [allApplications],
  );

  const onHoldCount = useMemo(
    () =>
      filterApplicationByStatus(allApplications?.data || [], 'on_hold').length,
    [allApplications],
  );

  const inProcessCount = useMemo(
    () =>
      filterApplicationByStatus(allApplications?.data || [], 'in_process')
        .length,
    [allApplications],
  );

  return (
    <div className='w-full'>
      <h1 className='mb-5 font-bold'>Statistics of Active Applications</h1>
      <div className='grid grid-cols-[auto_1fr] items-center gap-6'>
        <ProgressBar
          title='Shortlisted'
          color={colors.primary}
          percentage={
            (shortlistedCount * 100) / (allApplications?.data.length || 1)
          }
        />
        <ProgressBar
          title='Rejected'
          color={colors.rejected}
          percentage={
            (rejectedCount * 100) / (allApplications?.data.length || 1)
          }
        />

        <ProgressBar
          title='In Process'
          color={blue[500]}
          percentage={
            (inProcessCount * 100) / (allApplications?.data.length || 1)
          }
        />

        <ProgressBar
          title='On Hold'
          color={gray[500]}
          percentage={(onHoldCount * 100) / (allApplications?.data.length || 1)}
        />
      </div>
    </div>
  );
}
