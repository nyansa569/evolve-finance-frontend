import { combineReducers } from "redux";

import { api } from "@/services";
import { authApi } from "@/services/auth";

import userSlice from "../slices/authSlice";
import globalSlice from "../slices/globalSlice";

const rootReducer = combineReducers({
  auth: userSlice,
  global: globalSlice,
  [api.reducerPath]: api.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
