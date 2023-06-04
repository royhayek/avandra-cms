import { combineReducers } from "redux";

const dataReducer = combineReducers({});

export const reducer = (state, action) => {
  // Case: Logout --> api response --> (UNAUTHORIZED) update redux
  // Setting state = undefined will faultback all reducers to use state = initialState
  if (action.type === "data/DESTROY") {
    state = undefined;
  }

  return dataReducer(state, action);
};
