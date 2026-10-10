import { userApi } from '@api/userApi.ts';
import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { TUserData } from '@utils/types';

type TUserState = {
  user: TUserData | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<TUserData>) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthorized: (state) => state.user !== null,
  },
});

export const { setUserData, clearUserData, setAuthChecked } = userDataSlice.actions;
export const { selectUser, selectIsAuthChecked, selectIsAuthorized } =
  userDataSlice.selectors;
