import { SwalAlert } from "@/components/utils/SwalAlert";
import type { Products } from "@/components/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  products: Products[];
}

const initialState: InitialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<Products[]>) => {
      const { payload } = action;
      //? loop through payload and check if there's any update in the products array in relation to localStorage and update the specific property in the state

      const wishListItems = JSON.parse(
        localStorage.getItem("wishlists") || "[]",
      );

      payload.forEach((product) => {
        if (wishListItems.length) {
          wishListItems.forEach((item: any) => {
            if (product.id === item.id) {
              product.isAddedToWishlist = true;
            }
          });
        }
      });

      state.products = payload;
    },

    updateWishList: (state, action: PayloadAction<Record<string, any>>) => {
      const { payload } = action;

      state.products.forEach((product) => {
        if (product.id === payload.id) {
          // toggle the state of the wishlist for the current item
          product.isAddedToWishlist = !product.isAddedToWishlist;

          SwalAlert({
            icon: `${product.isAddedToWishlist ? "success" : "info"}`,
            title: `${
              product.isAddedToWishlist
                ? "Item Added to Wishlist"
                : "Item Removed from Wishlist"
            }`,
          });
        }
      });
    },

    updateCartItems: (state, action: PayloadAction<Record<string, any>>) => {
      const { payload } = action;
      // get the current object that was clicked in the array
      state.products.forEach((product) => {
        if (product.id === payload.id) {
          // toggle the state of the cart for the current item
          product.isAddedToCart = !product.isAddedToCart;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProducts, updateWishList, updateCartItems } =
  productsSlice.actions;

export default productsSlice.reducer;
