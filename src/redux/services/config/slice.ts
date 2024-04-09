// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { getConfigAction } from './thunks';
import { ConfigInitialState } from './types';

const initialState: ConfigInitialState = {
  data: null,
  error: null,
  loading: false
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getConfigAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getConfigAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getConfigAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const configActions = configSlice.actions;

export default configSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _config = (state: RootState) => state.services.config.data;

export const getConfig = createSelector(_config, (data) => data);

export const getLanguages = createSelector(_config, (data) => data?.languages);
