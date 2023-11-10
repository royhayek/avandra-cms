import configReducer from "./config/slice";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import uiReducer from "./ui/slice";

export const reducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  config: configReducer,
});
