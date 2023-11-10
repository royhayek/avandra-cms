import categoryReducer from "./category/slice";
import { combineReducers, Reducer, AnyAction } from "redux";
import userReducer from "./user/slice";

export const reducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
});
