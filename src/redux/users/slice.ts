// Packages
import _ from 'lodash';
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { RootState } from 'app/store';
import { UserInitialState } from './types';
import { getUsersList, updateUserAction } from './thunks';

export const initialState: UserInitialState = {
  data: [],
  loading: false,
  updating: false,
  error: null
};

export const usersSlice = createSlice({
  name: 'users',
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
    builder.addCase(getUsersList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserAction.pending, (state) => {
      state.updating = true;
    });

    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.error = null;
      state.updating = false;
    });

    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.updating = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const usersActions = usersSlice.actions;

export default usersSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _users = (state: RootState) => state.data.users;

export const getUsers = createSelector(_users, (data) => data?.data);

export const getUsersError = createSelector(_users, (data) => data?.error);

export const getUsersLoading = createSelector(_users, (data) => data?.loading);

export const getUserUpdating = createSelector(_users, (data) => data?.updating);
