"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import {
  updateCart,
  updateProducts,
  updateWishlist,
} from "../Products/product";
import { useAppDispatch } from "../hooks";
import useFetch from "@/hooks/useFetch";
import type { Products } from "@/components/utils/types";
import { useEffect } from "react";

const paths = ["/register", "/login", "/profile", "/checkout"];

interface Children {
  children: React.ReactNode;
}

export default function WebLayout({ children }: Children) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const isRegisterOrLogin = paths.some((path) => pathname.startsWith(path));

  const userId = JSON.parse(
    localStorage.getItem("currentUser") || "{}",
  )?.replaceAll(/["]+/g, "");

  const { data: allProducts } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`,
    key: "products",
  });

  const { data: wishlistItems } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/get_actions/wishlists/${userId}`,
    key: "wishlistItems",
  });

  const { data: cartProducts } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/get_actions/cartItems/${userId}`,
    key: "wishlistItems",
  });

  //? ================== UPDATE PRODUCTS ARRAY WITH ADDED ITEMS IN STATE ==================

  useEffect(() => {
    if (allProducts) dispatch(updateProducts(allProducts.products));
  }, [allProducts]);

  //? ============ UPDATE WISHLISTS ITEMS FROM DATABASE ==============
  useEffect(() => {
    if (wishlistItems) {
      console.log(wishlistItems, "wishlists");
      dispatch(updateWishlist(wishlistItems.wishlists));
    }
  }, [wishlistItems]);

  // //? ============ UPDATE CART ITEMS FROM DATABASE ==============
  // useEffect(() => {
  //   if (cartProducts) dispatch(updateCart(cartProducts.wishlists));
  // }, [cartProducts]);

  return (
    <>
      {!isRegisterOrLogin && <Header />}
      {children}
      <ReactQueryDevtools />
      {!isRegisterOrLogin && <Footer />}
    </>
  );
}
