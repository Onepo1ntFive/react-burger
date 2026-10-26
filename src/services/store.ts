import { combineSlices, configureStore as createStore } from '@reduxjs/toolkit';

import { feedApi } from '@services/api/feedApi.ts';
import { ingredientsApi } from '@services/api/ingredientsApi.ts';
import { orderApi } from '@services/api/orderApi.ts';
import { userApi } from '@services/api/userApi.ts';
import { burgerConstructorSlice } from '@services/burgerConstructor/slice.ts';
import { ingredientSlice } from '@services/ingredient/slice.ts';
import { userDataSlice } from '@services/user/slice.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  ingredientSlice,
  userDataSlice,
  burgerConstructorSlice,
  orderApi,
  userApi,
  feedApi
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
      .concat(userApi.middleware)
      .concat(feedApi.middleware);
  },
});
