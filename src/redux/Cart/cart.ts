import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Products } from "@/components/utils/types";
import { SwalAlert } from "@/components/utils/SwalAlert";

interface InitialState {
  cartItems: Products[];
}

const initialState: InitialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    updateGlobalCart: (state, action: PayloadAction<Products[]>) => {
      const { payload } = action;
      state.cartItems = payload;
    },

    handleAddorDeleteCartItems: (state, action: PayloadAction<Products>) => {
      const { payload } = action;

      const itemExists = state.cartItems.find((item) => item.id === payload.id);
      if (itemExists) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== payload.id,
        );
        SwalAlert({
          icon: "info",
          title: "Product Deleted From Cart Successfully!",
        });
      } else {
        state.cartItems.push(payload);
        SwalAlert({
          icon: "success",
          title: "Product Added To Cart Successfully!",
        });
      }
      // save the cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGlobalCart, handleAddorDeleteCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
