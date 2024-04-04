import { configureStore } from '@reduxjs/toolkit';
import globalSlice from "./slice/global.slice";
import authSlice from './slice/auth.slice'
import productsSlice from './slice/products.slice';
import activeSlice from './slice/active.slice'
import favoriteProductsSlice from './slice/products.slice'



const store = configureStore({
  reducer: {
    global: globalSlice,
    auth: authSlice,
    products: productsSlice,
    active: activeSlice,
    favorite: favoriteProductsSlice,
  }
});

export default store;