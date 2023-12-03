import { combineReducers } from 'redux';
import userReducer from './user/slice';
import usersReducer from './users/slice';
import categoryReducer from './category/slice';
import dashboardReducer from './dashboard/slice';

export const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  category: categoryReducer,
  dashboard: dashboardReducer
});