import { persistReducer, persistCombineReducers, persistStore } from "redux-persist";
import { reducer as servicesReducer } from "redux/services/reducer";
import sessionStorage from "redux-persist/lib/storage/session";
import createFilter from "redux-persist-transform-filter";
import { reducer as dataReducer } from "redux/reducer";
import storage from "redux-persist/lib/storage/session";
import authReducer from "redux/services/auth/slice";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const localStorageFilter = createFilter("services", ["ui", "config"], ["ui", "config"]);
const persistStorageConfig = {
  key: "mui-cms",
  storage,
  timeout: 0,
  // blacklist: ["data", "auth"],
  // whitelist: ["services"],
  transforms: [localStorageFilter],
};

const persistSessionConfig = {
  key: "session",
  storage: sessionStorage,
  timeout: 0,
};
const sessionReducer = persistReducer(persistSessionConfig, authReducer);

const persistedReducer = persistCombineReducers(persistStorageConfig, {
  services: servicesReducer,
  auth: sessionReducer,
  data: dataReducer,
});

export const store = configureStore({ reducer: persistedReducer, middleware: [thunk], preloadedState: {} });
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
