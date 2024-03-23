import { SwalAlert } from "@/components/utils/SwalAlert";
import type { Products } from "@/components/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { updateDispatchDB } from "./updateDispatch";

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

interface DispatchAction {
  productId: number;
  stateType: "wishlists" | "cartItems";
  productType: "isAddedToWishlist" | "isAddedToCart";
}

type Filter =
  | "all"
  | "men's clothing"
  | "women's clothing"
  | "electronics"
  | "jewelery";

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //  ? UPDATE PRODUCTS ARRAY
    updateProducts: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },

    // ? WISHLIST CODE IMPLEMENTATION

    updateWishlist: (state, action: PayloadAction<InitialType>) => {
      const { payload } = action;
      state.wishlists = payload;
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

    // ? UPDATING THE WISHLIST AND CART ITEMS

    dispatchAction: (state, action: PayloadAction<DispatchAction>) => {
      const { productId, stateType, productType } = action.payload;

      const itemIndex = state[stateType].findIndex(
        (obj) => obj.productId === productId,
      );
      const productIndex = state.products.findIndex(
        (obj) => obj._id === productId,
      );

      const swalName = stateType === "wishlists" ? "Wishlist" : "Cart";

      if (itemIndex !== -1) {
        state[stateType].splice(itemIndex, 1);
        state.products[productIndex][productType] = false;

        SwalAlert({
          icon: "info",
          title: `Item Removed from ${swalName}`,
        });
      } else {
        state[stateType].push({ productId: productId, quantity: 1 });
        state.products[productIndex][productType] = true;

        // update user db
        updateDispatchDB({ productId, stateType, productType });

        SwalAlert({
          icon: "success",
          title: `Item Added to ${swalName}`,
        });
      }

      // ? UPDATE LOCAL STORAGE
      localStorage.setItem(stateType, JSON.stringify(state[stateType]));
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    dispatchFilter: (state, action: PayloadAction<Filter>) => {
      const { payload } = action;

      const localStorageData: Products[] = JSON.parse(
        localStorage.getItem("products") || "[]",
      );

      if (payload === "all") {
        state.products = localStorageData.length ? localStorageData : [];
      } else {
        state.products = localStorageData.filter(
          (product) => product.category === payload,
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateProducts,
  updateWishlist,
  quantityChange,
  updateCart,
  dispatchAction,
  dispatchFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
