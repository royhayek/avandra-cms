import { createDraftSafeSelector as createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  streamer_host: "",
  streamer_port: "",
  interrupted: false,
  streamer_adabter: "",
  streamer_protocol: "",
};

export const configSlice = createSlice({
  name: "config",
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
export const configActions = configSlice.actions;

export default configSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _config = state => state.data.config;

export const getConfig = createSelector(_config, data => data);
