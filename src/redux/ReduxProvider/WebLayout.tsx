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

  const { data } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    key: "products",
  });

  //? ================== UPDATE PRODUCTS ARRAY WITH ADDED ITEMS IN STATE ==================

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("products") || "[]",
    );

    const products: Products[] = localStorageData.length
      ? localStorageData
      : data?.length
        ? data.map((product: Products) => ({
            ...product,
            isAddedToWishlist: false,
            isAddedToCart: false,
            quantity: 1,
          }))
        : [];

    dispatch(updateProducts(products));
  }, [data]);

  useEffect(() => {
    //? ============ INITIALIZE WISHLISTS ITEMS FROM LOCALSTORAGE ==============
    const wishlistsItems = JSON.parse(
      localStorage.getItem("wishlists") || "[]",
    );

    if (wishlistsItems.length) dispatch(updateWishlist(wishlistsItems));

    //? ============ INITIALIZE CART ITEMS FROM LOCALSTORAGE ==============

    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (cartItems.length) dispatch(updateCart(cartItems));
  }, []);

  return (
    <>
      {!isRegisterOrLogin && <Header />}
      {children}
      <ReactQueryDevtools />
      {!isRegisterOrLogin && <Footer />}
    </>
  );
}
