import { userApi } from '@api/userApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearUserData, setAuthChecked, setUserData } from './slice.ts';

export const checkUserAuth = createAsyncThunk(
  'userData/checkUserAuth',
  async (_, { dispatch }) => {
    if (localStorage.getItem('accessToken')) {
      try {
        const { user } = await dispatch(userApi.endpoints.getUser.initiate()).unwrap();
        dispatch(setUserData(user));
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(clearUserData());
      }
    }
    dispatch(setAuthChecked(true));
  }
);
