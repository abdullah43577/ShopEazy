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
        const modifiedPayload = { ...payload, isAddedToCart: true };
        state.cartItems.push(modifiedPayload);
        SwalAlert({
          icon: "success",
          title: "Product Added To Cart Successfully!",
        });
      }
      // save the cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    handleIncrementQuantity: (state, action: PayloadAction<Products>) => {
      const { payload } = action;
      state.cartItems.forEach((product) => {
        if (product.id === payload.id) {
          product.quantity += 1;
        }
      });
    },

    handleDecrementQuantity: (state, action: PayloadAction<Products>) => {
      const { payload } = action;
      state.cartItems.forEach((product) => {
        if (product.id === payload.id) {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateGlobalCart,
  handleAddorDeleteCartItems,
  handleIncrementQuantity,
  handleDecrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
