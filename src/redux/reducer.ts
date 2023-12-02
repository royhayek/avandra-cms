import categoryReducer from './category/slice';
import { combineReducers } from 'redux';
import userReducer from './user/slice';

export const reducer = combineReducers({
  user: userReducer,
  category: categoryReducer
});
