import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';
import { getUsersList, updateUserAction } from './thunks';
import { UserInitialState } from './types';
import { RootState } from 'app/store';

export const initialState: UserInitialState = {
  user: {},
  users: [],
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
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
      state.users = action.payload;
    });

    builder.addCase(getUsersList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload.user;
    });

    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export default userSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _user = (state: RootState) => state.data.user;

export const getUser = createSelector(_user, (data) => data.user);

export const getUsers = createSelector(_user, (data) => data.users);

export const getUserRole = createSelector(_user, (data) => data?.user.role);

export const getUsersError = createSelector(_user, (data) => data.error);

export const getUsersLoading = createSelector(_user, (data) => data.loading);
