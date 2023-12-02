import configReducer from './config/slice';
import { combineReducers } from 'redux';
import uiReducer from './ui/slice';

export const reducer = combineReducers({
  ui: uiReducer,
  config: configReducer
});
