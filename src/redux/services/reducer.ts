// Packages
import { combineReducers } from 'redux';

// Utilities
import configReducer from './config/slice';
import uiReducer from './ui/slice';

export const reducer = combineReducers({
  ui: uiReducer,
  config: configReducer
});
