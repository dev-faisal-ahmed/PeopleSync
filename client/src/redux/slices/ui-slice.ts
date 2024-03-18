import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    updateIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
      return state;
    },
  },
});

export const { updateIsSidebarOpen } = uiSlice.actions;
