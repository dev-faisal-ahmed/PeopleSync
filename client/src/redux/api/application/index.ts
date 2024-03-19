import { baseApi } from '..';
import { ServerResponseType } from '../api.types';
import { CreateApplicationRequestType } from './application-api.type';

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
  }),
});

export const { useCarateApplicationMutation } = applicationApi;
