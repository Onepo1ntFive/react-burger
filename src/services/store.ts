import { ingredientsApi } from '@api/ingredientsApi.ts';
import { orderApi } from '@api/orderApi.ts';
import {
  combineSlices,
  configureStore as createStore,
  type EnhancedStore,
} from '@reduxjs/toolkit';

import { burgerConstructorSlice } from '@services/burgerConstructor/slice.ts';
import { ingredientModalSlice } from '@services/ingredient/slice.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  ingredientModalSlice,
  burgerConstructorSlice,
  orderApi
);

export const configureStore = (): EnhancedStore => {
  return createStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(ingredientsApi.middleware)
        .concat(orderApi.middleware);
    },
  });
};
