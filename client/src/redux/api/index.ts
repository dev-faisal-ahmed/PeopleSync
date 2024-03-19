import { serverAddress } from '@/config/config';
import { getTokenFormLocal } from '@/utils/helper/token-helper';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${serverAddress}/api/v1`,
  prepareHeaders: (headers) => {
    const token = getTokenFormLocal();
    if (token) {
      headers.set('authorization', token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['jobs', 'applications'],
  endpoints: () => ({}),
});
