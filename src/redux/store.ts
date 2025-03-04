import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { api } from "@/services";
import { STORE_KEY } from "@/constants";
import { authApi } from "@/services/auth";

import rootReducer from "./reducer";

const persistConfig = {
  key: STORE_KEY,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["global", api.reducerPath],
};

const pReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    })
      .concat(api.middleware)
      .concat(authApi.middleware),
  // @ts-ignore
  devTools: import.meta.env.DEV,
});

const persistor = persistStore(store);

export default function mergeStore() {
  return { store, persistor };
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
