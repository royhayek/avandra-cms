import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';
import { DashboardInitialState } from './types';
import { getDashboardList } from './thunks';
import { RootState } from 'app/store';

export const initialState: DashboardInitialState = {
  data: [],
  loading: false,
  error: null
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDashboardList.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getDashboardList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _dashboard = (state: RootState) => state.data.dashboard;

export const getDashboard = createSelector(_dashboard, (data) => data?.data);

export const getDashboardError = createSelector(_dashboard, (data) => data?.error);

export const getDashboardLoading = createSelector(_dashboard, (data) => data?.loading);
