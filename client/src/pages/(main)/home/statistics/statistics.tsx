import { colors } from '@/data/colors';
import { useGetAllApplicationsQuery } from '@/redux/api/application';
import { useMemo } from 'react';

type AccumulatorType = {
  max: number;
  data: Record<
    string,
    {
      date: string;
      shortlisted: number;
      rejected: number;
    }
  >;
};

export function Statistics() {
  const { data: applicationData } = useGetAllApplicationsQuery(null);

  // getting data for each day of applications status
  const applicationDataByDate = useMemo(() => {
    const data = (applicationData?.data || []).reduce(
      (acc: AccumulatorType, application) => {
        const dateStr = new Date(application.createdAt).toString().slice(4, 10);
        if (!acc.data[dateStr]) {
          acc.data[dateStr] = { date: dateStr, rejected: 0, shortlisted: 0 };
        }

        if (application.status === 'shortlisted')
          acc.data[dateStr].shortlisted += 1;
        else if (application.status === 'rejected')
          acc.data[dateStr].rejected += 1;

        const { rejected, shortlisted } = acc.data[dateStr];
        const total = rejected + shortlisted;

        acc.max = total > acc.max ? total : acc.max;

        return acc;
      },
      { max: 0, data: {} },
    );
    return data;
  }, [applicationData]);

  return (
    <div className='w-full'>
      <h1 className='mb-5 font-bold'>Statistics of Active Applications</h1>
      <p>Max : {applicationDataByDate.max}</p>
      <hr />
      <div style={{ height: '200px' }} className='mt-5 grid grid-cols-7 gap-5'>
        {Object.values(applicationDataByDate.data).map((data) => (
          <div
            key={data.date}
            className='flex h-full flex-col items-center justify-end'
          >
            <div
              key={data.date + 'short'}
              style={{
                backgroundColor: colors.shortlisted,
                height: `${(data.shortlisted * 100) / applicationDataByDate.max}%`,
              }}
              className='w-4 rounded-t-full'
            />
            <div
              key={data.date + 'reject'}
              style={{
                backgroundColor: colors.rejected,
                height: `${(data.rejected * 100) / applicationDataByDate.max}%`,
              }}
              className={`w-4 ${data.shortlisted === 0 ? 'rounded-t-full' : ''} `}
            />
            <hr />
            <p>{data.date}</p>
          </div>
        ))}
      </div>
      {/* <ResponsiveContainer width={'100%'} height={500}>
        <BarChart
          data={Object.values(applicationDataByDate).slice(0, 7)}
          height={400}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            width={5}
            dataKey='shortlisted'
            stackId='a'
            fill={colors.primary}
          />
          <Bar
            radius={[15, 15, 0, 0]}
            width={5}
            dataKey='rejected'
            stackId='a'
            fill={red[500]}
          />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
}
