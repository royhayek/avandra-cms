// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { createTravelerAction, getBudgetsAction, getTravelersAction } from './thunks';

// Interfaces
import { TravelersInitialState } from './types';

export const initialState: TravelersInitialState = {
  travelers: [],
  budgets: [],
  loading: false,
  error: null
};

export const travelersSlice = createSlice({
  name: 'travelers',
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
    builder.addCase(getTravelersAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTravelersAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.travelers = action.payload;
    });

    builder.addCase(getTravelersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createTravelerAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createTravelerAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createTravelerAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getBudgetsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getBudgetsAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.budgets = action.payload;
    });

    builder.addCase(getBudgetsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const travelerActions = travelersSlice.actions;

export default travelersSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _travelers = (state: RootState) => state.data.travelers;

export const getBudgets = createSelector(_travelers, (data) => data?.budgets);

export const getTravelers = createSelector(_travelers, (data) => data?.travelers);

export const getTravelersError = createSelector(_travelers, (data) => data?.error);

export const getTravelersLoading = createSelector(_travelers, (data) => data?.loading);
