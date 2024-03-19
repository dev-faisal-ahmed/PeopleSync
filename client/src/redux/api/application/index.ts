import { baseApi } from '..';
import { ServerResponseType } from '../api.types';
import {
  CreateApplicationRequestType,
  UpdateApplicationStatusRequestType,
} from './application-api.type';
import { ApplicationType } from '@/utils/types/application.type';

const APPLICATION_URL = 'application';
const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    carateApplication: builder.mutation<
      ServerResponseType<unknown>,
      CreateApplicationRequestType
    >({
      query: (payload) => ({
        url: `${APPLICATION_URL}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['applications', 'jobs'],
    }),

    updateApplicationStatus: builder.mutation<
      ServerResponseType<unknown>,
      UpdateApplicationStatusRequestType
    >({
      query: (payload) => ({
        url: `${APPLICATION_URL}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['applications-for-job'],
    }),

    getApplicationByJobId: builder.query<
      ServerResponseType<ApplicationType[]>,
      string
    >({
      query: (jobId) => `${APPLICATION_URL}/${jobId}`,
      providesTags: ['applications-for-job'],
    }),
  }),
});

export const {
  useCarateApplicationMutation,
  useGetApplicationByJobIdQuery,
  useUpdateApplicationStatusMutation,
} = applicationApi;
