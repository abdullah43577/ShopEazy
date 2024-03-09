import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./Register/Register";
import productsSlice from "./Products/product";
import wishlistSlice from "./Wishlist/wishlist";
import modalSlice from "./Modal/modalWindow";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    products: productsSlice,
    wishlist: wishlistSlice,
    modalWindow: modalSlice,
  },
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
