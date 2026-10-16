import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  API_LOGIN,
  API_LOGOUT,
  API_PSWD_RESET,
  API_PSWD_RESET_RESET,
  API_REGISTER,
  API_URL,
  API_USER,
} from '@utils/consts.ts';

import type { TUserData } from '@utils/types.ts';

type TAuthResponse = {
  success: boolean;
  user: TUserData;
  accessToken: string;
  refreshToken: string;
};

type TUserResponse = {
  success: boolean;
  user: TUserData;
};

type TMessageResponse = {
  success: boolean;
  message?: string;
};

type TUserRegister = {
  email: string;
  password: string;
  name: string;
};

type TUserLogin = {
  email: string;
  password: string;
};

export type TUserLogout = {
  token: string;
};

export type TResetPassword = {
  email: string;
};

export type TResetResetPassword = {
  password: string;
  token: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');

      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<TUserResponse, void>({
      query: () => ({
        url: `${API_URL}${API_USER}`,
        method: 'GET',
      }),
    }),
    registerUser: builder.mutation<TAuthResponse, TUserRegister>({
      query: (body) => ({
        url: `${API_URL}${API_REGISTER}`,
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation<TAuthResponse, TUserLogin>({
      query: (body) => ({
        url: `${API_URL}${API_LOGIN}`,
        method: 'POST',
        body,
      }),
    }),
    logoutUser: builder.mutation<TMessageResponse, TUserLogout>({
      query: (body) => ({
        url: `${API_URL}${API_LOGOUT}`,
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation<TMessageResponse, TResetPassword>({
      query: (body) => ({
        url: `${API_URL}${API_PSWD_RESET}`,
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation<TMessageResponse, TResetResetPassword>({
      query: (body) => ({
        url: `${API_URL}${API_PSWD_RESET_RESET}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserQuery,
} = userApi;
