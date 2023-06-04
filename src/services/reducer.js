import { combineReducers } from "redux";
import { reducer as uiReducer } from "./ui/reducer";
import configReducer from "./config/reducer";

export const reducer = combineReducers({
  ui: uiReducer,
  config: configReducer,
});
