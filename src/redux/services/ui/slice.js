import { createDraftSafeSelector as createSelector, createSlice } from "@reduxjs/toolkit";
import deepMerge from "lodash-deepmerge";
import _, { cloneDeep } from "lodash";
import { customizer } from "helpers";

export const initialState = {
  layout: {},
  lang: "ar",
  dir: "ltr", // isDev ? true : false
  api: "local", // !TESTING
  theme: "light", // [light || dark]
  showTour: true,
  tourFirstTime: true,
  initialAction: "Login",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    init: state => {
      return deepMerge.merge(initialState, state);
    },
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    merge: (state, action) => {
      return _.mergeWith({}, state, action.payload, customizer);
    },
    omit: (state, action) => {
      return { ..._.omit(state, action.payload) };
    },
    updateLayout: (state, action) => {
      state.layout = _.reduce(
        action.payload,
        (r, v, k) => {
          _.set(r, k, v);
          return r;
        },
        { ...cloneDeep(state.layout) },
      );
    },
    resetLayout: state => {
      state.layout = initialState.layout;
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _ui = state => state.services.ui;
const _rehydrated = state => state._persist.rehydrated;

export const getUI = createSelector(_ui, data => data);
export const getLayout = createSelector(_ui, data => data.layout);
export const getLanguage = createSelector(_ui, data => data.lang);
export const getThemeType = createSelector(_ui, data => data.theme);
export const getRehydrated = createSelector(_rehydrated, data => data);
export const emptySelector = createSelector(_rehydrated, data => null);
export const getInitialAction = createSelector(_ui, data => data.initialAction);
