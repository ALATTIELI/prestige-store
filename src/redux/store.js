import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import cartReducer from "./cartRedux";
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
