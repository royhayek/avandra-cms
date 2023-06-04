import { createDeepEqualSelector } from "helpers";

// Filters
// ---------------------------------- //
const _rehydrated = (state) => state._persist.rehydrated;
const _ui = (state) => state.services.ui;
const _initialAction = (state) => state.services.ui.initialAction;
const _lang = (state) => state.services.ui.lang;
const _theme = (state) => state.services.ui.theme;
const _layout = (state) => state.services.ui.layout;

// Selectors
// ---------------------------------- //
export const emptySelector = createDeepEqualSelector(
  _rehydrated,
  (data) => null
);

export const getRehydrated = createDeepEqualSelector(
  _rehydrated,
  (data) => data
);

export const getUI = createDeepEqualSelector(_ui, (data) => data);

export const getInitialAction = createDeepEqualSelector(
  _initialAction,
  (data) => data
);

export const getThemeType = createDeepEqualSelector(_theme, (data) => data);

export const getLayout = createDeepEqualSelector(_layout, (data) => data);
