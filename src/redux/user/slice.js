import { createDraftSafeSelector as createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const initialState = {
  users: [],
  userId: null,
  sessionId: null,
  loggedOut: false,
  role: "anonymous",
  emailVerfied: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    logout: state => {
      state.loggedOut = true;
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions;

export default userSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _user = state => state.data.user.user;
const _authenticated = state => state.data.user.authenticated;

export const getUser = createSelector(_user, data => data);
export const getUsers = createSelector(_user, data => data.users);
export const getUserRole = createSelector(_user, data => data.role);
export const getUserAuthenticated = createSelector(_authenticated, data => data.user.authenticated);
