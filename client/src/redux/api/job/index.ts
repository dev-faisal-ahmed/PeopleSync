import { JobType } from '@/utils/types/job.types';
import { baseApi } from '..';
import { ServerResponseType } from '../api-types';

const JOBS_URL = 'job';
export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<ServerResponseType<JobType[]>, string>({
      query: (params) => {
        return {
          url: `${JOBS_URL}${params}`,
        };
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobApi;
