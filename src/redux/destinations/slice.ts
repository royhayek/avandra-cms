// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { createDestinationAction, getDestinationsAction } from './thunks';
import { DestinationInitialState } from './types';

export const initialState: DestinationInitialState = {
  data: [],
  loading: false,
  error: null
};

export const destinationSlice = createSlice({
  name: 'destionations',
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
    builder.addCase(getDestinationsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getDestinationsAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getDestinationsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createDestinationAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createDestinationAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createDestinationAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const destinationActions = destinationSlice.actions;

export default destinationSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _destinations = (state: RootState) => state.data.destinations;

export const getDestinations = createSelector(_destinations, (data) => data?.data);

export const getDestinationsError = createSelector(_destinations, (data) => data?.error);

export const getDestinationsLoading = createSelector(_destinations, (data) => data?.loading);
