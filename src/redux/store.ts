import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./Register/Register";
import productsSlice from "./Products/product";
import modalSlice from "./Modal/modalWindow";
import filterSlice from "./Filters/filters";
import LoginSlice from "./Login/Login";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    products: productsSlice,
    modalWindow: modalSlice,
    filters: filterSlice,
  },
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
