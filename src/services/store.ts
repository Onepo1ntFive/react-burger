import { ingredientsApi } from '@api/ingredientsApi.ts';
import { orderApi } from '@api/orderApi.ts';
import { userApi } from '@api/userApi.ts';
import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burgerConstructor/slice.ts';
import { ingredientSlice } from '@services/ingredient/slice.ts';
import { userDataSlice } from '@services/user/slice.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  ingredientSlice,
  userDataSlice,
  burgerConstructorSlice,
  orderApi,
  userApi
);

export const configureStore = (): typeof store => {
  return store;
};

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = createStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(ingredientsApi.middleware)
      .concat(orderApi.middleware)
      .concat(userApi.middleware);
  },
});
