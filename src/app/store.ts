// Packages
import storage from 'redux-persist/lib/storage/session';
import createFilter from 'redux-persist-transform-filter';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistCombineReducers, persistStore } from 'redux-persist';

// Reducers
import authReducer from '../redux/services/auth/slice';
import { reducer as dataReducers } from 'redux/reducer';
import { reducer as servicesReducer } from '../redux/services/reducer';

const localStorageFilter = createFilter('services', ['ui', 'config'], ['ui', 'config']);

const persistStorageConfig = {
  key: 'mui-cms',
  storage,
  timeout: 0,
  transforms: [localStorageFilter]
};

const persistSessionConfig = {
  key: 'session',
  storage,
  timeout: 0
};

const sessionReducer = persistReducer(persistSessionConfig, authReducer);

const persistDataConfig = {
  key: 'data',
  whitelist: ['user'],
  blacklist: ['users', 'category', 'dashboard'],
  storage,
  timeout: 0
};

const dataReducer = persistReducer(persistDataConfig, dataReducers);

const persistedReducer = persistCombineReducers(persistStorageConfig, {
  services: servicesReducer,
  auth: sessionReducer,
  data: dataReducer
});

export const store = configureStore({ reducer: persistedReducer, middleware: [thunk], preloadedState: {} });

export const persistor = persistStore(store);

export type Store = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
