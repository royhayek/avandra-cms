import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';
import { customizer } from '../../../shared/utils';
import { RootState } from 'app/store';
import _ from 'lodash';

interface DrawerProps {
  selectedItem: string;
}
interface UIInitialState {
  layout: object;
  lang: string;
  dir: string;
  api: string;
  theme: string;
  showTour: boolean;
  tourFirstTime: boolean;
  initialAction: string;
  drawer: DrawerProps;
}

export const initialState: UIInitialState = {
  layout: {},
  lang: 'ar',
  dir: 'ltr', // isDev ? true : false
  api: 'local', // !TESTING
  theme: 'dark', // [light || dark]
  showTour: true,
  tourFirstTime: true,
  initialAction: 'Login',
  drawer: {
    selectedItem: 'dashboard'
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    update: (state, action) => {
      return { ...state, ...action.payload };
    },
    merge: (state, action) => {
      return _.mergeWith({}, state, action.payload, customizer);
    },
    updateLayout: (state, action) => {
      state.layout = _.reduce(
        action.payload,
        (r, v, k) => {
          _.set(r, k, v);

          return r;
        },
        { ..._.cloneDeep(state.layout) }
      );
    },
    resetLayout: (state) => {
      state.layout = initialState.layout;
    },
    reset: () => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _ui = (state: RootState) => state.services.ui;
const _drawer = (state: RootState) => state.services.ui.drawer;
const _rehydrated = (state: RootState) => state._persist.rehydrated;

export const getUI = createSelector(_ui, (data) => data);

export const getLayout = createSelector(_ui, (data) => data.layout);

export const getLanguage = createSelector(_ui, (data) => data.lang);

export const getThemeType = createSelector(_ui, (data) => data.theme);

export const emptySelector = createSelector(_rehydrated, () => null);

export const getRehydrated = createSelector(_rehydrated, (data) => data);

export const getInitialAction = createSelector(_ui, (data) => data.initialAction);

export const getDrawerSelectedItem = createSelector(_drawer, (data) => data?.selectedItem);
