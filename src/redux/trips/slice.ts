// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { getTripsAction } from './thunks';

// Interfaces
import { RootState } from 'app/store';
import { TripInitialState } from './types';

export const initialState: TripInitialState = {
  data: [],
  loading: false,
  error: null
};

export const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTripsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTripsAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getTripsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const tripActions = tripSlice.actions;

export default tripSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _trips = (state: RootState) => state.data.trips;

export const getTrips = createSelector(_trips, (data) => data?.data);

export const getTripsError = createSelector(_trips, (data) => data?.error);

export const getTripsLoading = createSelector(_trips, (data) => data?.loading);
