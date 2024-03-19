import { filterApplicationByStatus } from '@/utils/helper/application-helper';
import {
  ApplicationStatusType,
  ApplicationType,
} from '@/utils/types/application.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ApplicationSateType = {
  applications: ApplicationType[];
  shortListedCount: number;
  inProcessCount: number;
  onHoldCount: number;
  rejectedCount: number;
  isFilterEnabled: boolean;
  enabledStatus: ApplicationSateType | 'all';
};

const initialState: ApplicationSateType = {
  applications: [],
  onHoldCount: 0,
  inProcessCount: 0,
  rejectedCount: 0,
  shortListedCount: 0,
  isFilterEnabled: false,
  enabledStatus: 'all',
};

export const applicationSlice = createSlice({
  name: 'Application',
  initialState,
  reducers: {
    updateApplications: (state, action: PayloadAction<ApplicationType[]>) => {
      state.applications = action.payload;

      state.onHoldCount = filterApplicationByStatus(
        action.payload,
        'on_hold',
      ).length;

      state.inProcessCount = filterApplicationByStatus(
        action.payload,
        'in_process',
      ).length;

      state.shortListedCount = filterApplicationByStatus(
        action.payload,
        'shortlisted',
      ).length;

      state.rejectedCount = filterApplicationByStatus(
        action.payload,
        'rejected',
      ).length;
    },

    searchByName: (state, action: PayloadAction<string>) => {
      state.applications = state.applications.filter((application) =>
        application.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
      state.isFilterEnabled = true;
    },

    filterByStatus: (
      state,
      action: PayloadAction<{
        status: ApplicationStatusType;
        allApplications: ApplicationType[];
      }>,
    ) => {
      state.applications = filterApplicationByStatus(
        action.payload.allApplications,
        action.payload.status,
      );
      state.isFilterEnabled = true;
      state.enabledStatus = action.payload.status as
        | ApplicationSateType
        | 'all';
    },

    clearFilter: (state, action: PayloadAction<ApplicationType[]>) => {
      state.isFilterEnabled = false;
      state.applications = action.payload;
      state.enabledStatus = 'all';
    },
  },
});

export const { updateApplications, searchByName, filterByStatus, clearFilter } =
  applicationSlice.actions;
