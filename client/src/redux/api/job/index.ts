import { JobType } from '@/utils/types/job.types';
import { baseApi } from '..';
import { ServerResponseType } from '../api-types';
import { CreateJobRequestType } from './job-api-types';

const JOBS_URL = 'job';
export const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<ServerResponseType<JobType[]>, string>({
      query: (params) => `${JOBS_URL}${params}`,
    }),

    createJob: builder.mutation<
      ServerResponseType<unknown>,
      CreateJobRequestType
    >({
      query: (payload) => ({
        url: `${JOBS_URL}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useGetJobsQuery, useCreateJobMutation } = jobApi;
