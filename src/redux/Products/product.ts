import { SwalAlert } from "@/components/utils/SwalAlert";
import type { Products } from "@/components/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialType = { productId: number; quantity: number }[];

interface InitialState {
  products: Products[];
  wishlists: InitialType;
  cartItems: InitialType;
}

const initialState: InitialState = {
  products: [],
  wishlists: [],
  cartItems: [],
};

interface QuantityChange {
  productId: number;
  stateType: "wishlists" | "cartItems";
  type: "increment" | "decrement";
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action: PayloadAction<Products[]>) => {
      const { payload } = action;
      state.products = payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // ? WISHLIST CODE IMPLEMENTATION

    updateWishlist: (state, action: PayloadAction<InitialType>) => {
      const { payload } = action;
      state.wishlists = payload;
    },

    wishlistAction: (state, action: PayloadAction<number>) => {
      // ? PAYLOAD = PRODUCT ID
      const { payload } = action;

      const itemIndex = state.wishlists.findIndex(
        (obj) => obj.productId === payload,
      );
      const productIndex = state.products.findIndex(
        (obj) => obj.id === payload,
      );

      if (itemIndex !== -1) {
        state.wishlists.splice(itemIndex, 1);
        state.products[productIndex].isAddedToWishlist = false;
        SwalAlert({
          icon: "info",
          title: "Item Removed from Wishlist",
        });
      } else {
        state.wishlists.push({ productId: payload, quantity: 1 });
        state.products[productIndex].isAddedToWishlist = true;
        SwalAlert({
          icon: "success",
          title: "Item Added to Wishlist",
        });
      }

      // ? UPDATE LOCAL STORAGE
      localStorage.setItem("wishlists", JSON.stringify(state.wishlists));
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    quantityChange: (state, action: PayloadAction<QuantityChange>) => {
      // ? PRODUCTID = PRODUCT ID, STATEtYPE = WISHLISTS OR CARTITEMS, TYPE = 'INCREMENT' | 'DECREMENT'
      const { productId, stateType, type } = action.payload;

      state[stateType].forEach((product) => {
        if (product.productId === productId) {
          if (type === "increment") {
            product.quantity += 1;
          } else if (product.quantity > 1) {
            product.quantity -= 1;
          }

          return;
        }
      });
    },

    // ? CART ITEMS CODE IMPLEMENTATION

    updateCart: (state, action: PayloadAction<InitialType>) => {
      const { payload } = action;
      state.cartItems = payload;
    },

    cartAction: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      const itemIndex = state.cartItems.findIndex(
        (obj) => obj.productId === payload,
      );
      const productIndex = state.products.findIndex(
        (obj) => obj.id === payload,
      );

      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
        state.products[productIndex].isAddedToCart = false;
        SwalAlert({
          icon: "info",
          title: "Item Removed from Cart",
        });
      } else {
        state.cartItems.push({ productId: payload, quantity: 1 });
        state.products[productIndex].isAddedToCart = true;
        SwalAlert({
          icon: "success",
          title: "Item Added to Cart",
        });
      }

      // ? UPDATE LOCAL STORAGE
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateProducts,
  updateWishlist,
  wishlistAction,
  quantityChange,
  updateCart,
  cartAction,
} = productsSlice.actions;

export default productsSlice.reducer;
