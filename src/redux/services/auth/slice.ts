// Packages
import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';

// Utilities
import { AuthInitialState } from './types';
import { loginAction } from './thunks';
import { RootState } from 'app/store';

export const initialState: AuthInitialState = {
  token: null,
  error: null,
  loading: false,
  loggedOut: false,
  refreshToken: null,
  authenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
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
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.authenticated = true;
      state.token = action.payload.token;
    });

    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _auth = (state: RootState) => state.auth;

export const getAuth = createSelector(_auth, (data) => data);

export const getAuthLoading = createSelector(_auth, (data) => data.loading);

export const getUserAuthenticated = createSelector(_auth, (data) => data?.authenticated);
