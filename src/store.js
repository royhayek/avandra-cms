import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import {
  persistReducer,
  persistCombineReducers,
  persistStore,
} from "redux-persist";
import { reducer as dataReducer } from "data/reducer";
import { reducer as servicesReducer } from "services/reducer";
import { reducer as authReducer } from "services/auth/reducer";
import createFilter from "redux-persist-transform-filter";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage/session";
import sessionStorage from "redux-persist/lib/storage/session";

const enhancer = composeWithDevTools(applyMiddleware(thunk));

const localStorageFilter = createFilter(
  "services",
  ["ui", "config"],
  ["ui", "config"]
);
const persistStorageConfig = {
  key: "tcom-portal",
  storage,
  timeout: 0,
  blacklist: ["data", "auth"],
  whitelist: ["services"],
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
  data: dataReducer,
  auth: sessionReducer,
});

export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);

// !TEMP
window.store = store;
