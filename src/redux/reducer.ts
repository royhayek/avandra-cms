// Packages
import { combineReducers } from 'redux';

// Reducers
import userReducer from './user/slice';
import usersReducer from './users/slice';
import travelersReducer from './travelers/slice';
import dashboardReducer from './dashboard/slice';
import destinationsReducer from './destinations/slice';

// Combined Reducers

export const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  travelers: travelersReducer,
  dashboard: dashboardReducer,
  destinations: destinationsReducer
});
