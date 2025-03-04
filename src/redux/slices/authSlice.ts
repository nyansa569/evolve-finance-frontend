import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthStoreState } from "@/types";

import { RootState } from "../store";

const initialState: AuthStoreState = {
  user: null,
  token: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = initialState.user;
    },
    refreshToken: (state, action: PayloadAction<AuthStoreState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setCurrentUser, logoutUser, refreshToken } = userSlice.actions;

export const getCurrentUser = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user,
);

export const getAuthenticatedUser = createSelector(
  (state: RootState) => state.auth,
  ({ token, refreshToken, user }) => {
    return {
      isAuthenticated: Boolean(token && user),
      token,
      refreshToken,
      user,
    };
  },
);
