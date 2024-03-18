import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/ui-slice';
import { baseApi } from './api';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
