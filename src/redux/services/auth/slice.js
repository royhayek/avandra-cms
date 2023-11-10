import { createDraftSafeSelector as createSelector, createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  token: null,
  username: "qa1", // isDev ? 'qa1' : ''
  loggedOut: false,
  authenticated: false, // isDev ? true : false
};

export const authSlice = createSlice({
  name: "auth",
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
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _auth = state => state.data.auth;

export const getAuth = createSelector(_auth, data => data);
