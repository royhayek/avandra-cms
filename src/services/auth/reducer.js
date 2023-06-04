import * as actionTypes from "./actionTypes";

export const initialState = {
  username: "qa1", // isDev ? 'qa1' : ''
  authenticated: false, // isDev ? true : false
  loggedOut: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.RESET:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};
