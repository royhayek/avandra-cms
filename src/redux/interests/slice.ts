// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { createInterestAction, getInterestsAction } from './thunks';

// Interfaces
import { InterestsInitialState } from './types';

export const initialState: InterestsInitialState = {
  data: [],
  pagination: null,
  loading: false,
  error: null
};

export const interestsSlice = createSlice({
  name: 'interests',
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
    builder.addCase(getInterestsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getInterestsAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload.result;
      state.pagination = action.payload.pagination;
    });

    builder.addCase(getInterestsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createInterestAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createInterestAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createInterestAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const interestActions = interestsSlice.actions;

export default interestsSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _interests = (state: RootState) => state.data.interests;

export const getInterests = createSelector(_interests, (data) => data?.data);

export const getInterestsError = createSelector(_interests, (data) => data?.error);

export const getInterestsLoading = createSelector(_interests, (data) => data?.loading);

export const getInterestsPagination = createSelector(_interests, (data) => data?.pagination);
