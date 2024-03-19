import { baseApi } from '..';
import { ServerResponseType } from '../api.types';
import { LoginRequestType } from './auth.types';

const AUTH_URL = 'auth';
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      ServerResponseType<{ token: string }>,
      LoginRequestType
    >({
      query: (payload) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
