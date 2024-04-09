// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { createWalkthroughAction, getWalkthroughAction } from './thunks';

// Interfaces
import { WalkthroughInitialState } from './types';

export const initialState: WalkthroughInitialState = {
  data: [],
  loading: false,
  error: null
};

export const walkthroughSlice = createSlice({
  name: 'walkthrough',
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
    builder.addCase(getWalkthroughAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getWalkthroughAction.fulfilled, (state, action) => {
      console.debug('action', action);
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getWalkthroughAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createWalkthroughAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createWalkthroughAction.fulfilled, (state) => {
      state.error = null;
      state.loading = false;
    });

    builder.addCase(createWalkthroughAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const walkthroughActions = walkthroughSlice.actions;

export default walkthroughSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _walkthrough = (state: RootState) => state.data.walkthrough;

export const getWalkthrough = createSelector(_walkthrough, (data) => data?.data);

export const getWalkthroughError = createSelector(_walkthrough, (data) => data?.error);

export const getWalkthroughLoading = createSelector(_walkthrough, (data) => data?.loading);
