import _, { cloneDeep } from "lodash";
import deepMerge from "lodash-deepmerge";
import { customizer } from "helpers";
import * as actionTypes from "./actionTypes";

export const initialState = {
  lang: "ar",
  dir: "ltr", // isDev ? true : false
  showTour: true,
  tourFirstTime: true,
  theme: "light", // [light || dark]
  api: "local", // !TESTING
  initialAction: "Login",
  layout: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT:
      return deepMerge.merge(initialState, state);

    case actionTypes.UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.MERGE:
      return _.mergeWith({}, state, action.payload, customizer);

    case actionTypes.OMIT:
      return {
        ..._.omit(state, action.payload),
      };

    case actionTypes.UPDATELAYOUT:
      return {
        ...state,
        layout: _.reduce(
          action.payload,
          (r, v, k) => {
            _.set(r, k, v);
            return r;
          },
          { ...cloneDeep(state.layout) }
        ),
      };

    case actionTypes.RESETLAYOUT:
      return { ...state, layout: initialState.layout };

    case actionTypes.RESET:
      return initialState;

    default:
      return state;
  }
};
