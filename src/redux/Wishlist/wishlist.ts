import { SwalAlert } from "@/components/utils/SwalAlert";
import type { Products } from "@/components/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  wishlists: Products[];
}

const initialState: InitialState = {
  wishlists: [],
};

export const wishlistSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {
    updateWishlistGlobal: (state, action: PayloadAction<Products[]>) => {
      const { payload } = action;
      state.wishlists = payload;
    },

    updateWishlistsArray: (state, action: PayloadAction<Products>) => {
      const { payload } = action;
      // check if the item is already in the wishlist
      const itemExists = state.wishlists.find((item) => item.id === payload.id);
      if (itemExists) {
        // remove the item from the wishlist
        state.wishlists = state.wishlists.filter(
          (item) => item.id !== payload.id,
          SwalAlert({
            icon: "info",
            title: "Item Succesfully Removed From Wishlist!",
          }),
        );
      } else {
        state.wishlists.push(payload);
        SwalAlert({
          icon: "success",
          title: "Item Succesfully Added To Wishlist!",
        });
      }
      // save the wishlist to local storage
      localStorage.setItem("wishlists", JSON.stringify(state.wishlists));
    },

    handleIncrementQuantity: (state, action: PayloadAction<Products>) => {
      const { payload } = action;
      state.wishlists.forEach((product) => {
        if (product.id === payload.id) {
          product.quantity += 1;
        }
      });
    },

    handleDecrementQuantity: (state, action: PayloadAction<Products>) => {
      const { payload } = action;
      state.wishlists.forEach((product) => {
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
  updateWishlistGlobal,
  updateWishlistsArray,
  handleIncrementQuantity,
  handleDecrementQuantity,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
