import { colors } from '@/data/colors';
import { SummaryCard } from '../summary-card';
import { useGetAllApplicationsQuery } from '@/redux/api/application';
import { useMemo } from 'react';
import { filterApplicationByStatus } from '@/utils/helper/application-helper';

export function Summary() {
  const { data: applicationsData } = useGetAllApplicationsQuery(null);

  const shortlistedCount = useMemo(
    () =>
      filterApplicationByStatus(applicationsData?.data || [], 'shortlisted')
        .length,
    [applicationsData],
  );

  const rejectedCount = useMemo(
    () =>
      filterApplicationByStatus(applicationsData?.data || [], 'rejected')
        .length,
    [applicationsData],
  );

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      <SummaryCard
        title='Total Candidates'
        color={colors.primary}
        count={applicationsData?.data?.length || 0}
        percentage='+74%'
      />
      <SummaryCard
        title='Shortlisted Candidates'
        color={colors.shortlisted}
        count={shortlistedCount}
        percentage='+83%'
      />
      <SummaryCard
        title='Rejected Candidates'
        color={colors.rejected}
        count={rejectedCount}
        percentage='+42%'
      />
    </div>
  );
}
