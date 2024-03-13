"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ModalWindow from "../Modal/Modal";
import { toggleModal } from "@/redux/Modal/modalWindow";
import useFetch from "@/hooks/useFetch";
import type { Products } from "../utils/types";
import {
  updateCart,
  updateProducts,
  updateWishlist,
} from "@/redux/Products/product";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { products, wishlists, cartItems } = useAppSelector(
    (state) => state.products,
  );

  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState<
    "wishlist" | "cart" | "notification" | null
  >(null);

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

    //? =============== HANDLE PAGE SCROLL SETTING THE NAVBAR TO FIXED ==================

    const handleScroll = function () {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWishClick = function () {
    dispatch(toggleModal());
    setModalType("wishlist");
  };

  const handleCartClick = function () {
    dispatch(toggleModal());
    setModalType("cart");
  };

  return (
    <header>
      <div className="relative mx-auto max-w-[1440px] px-8 pt-6 md:px-4">
        <div
          className={`${isScrolled ? "navBar fixed left-0 top-0 z-[100] w-full py-6" : ""}`}
        >
          <nav
            className={`flex items-center justify-between ${isScrolled ? "mx-auto max-w-[1440px]" : ""}`}
          >
            <div className="text-4xl font-bold italic text-black dark:text-white">
              ShopEazy!
            </div>

            {/* <div className="flex items-center gap-10 divide-x divide-whiteElBg rounded-[6px] bg-darkElBg px-3 py-2 dark:divide-[#4b4b4b]">
              <div className="flex cursor-pointer items-center gap-2 text-nowrap dark:text-white">
                Men's{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </div>

              <div className="relative flex w-[450px] items-center">
                <input
                  type="text"
                  className="h-[40px] w-full bg-darkElBg px-6 outline-none dark:text-white"
                  placeholder="Search..."
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search absolute right-0 text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </div> */}

            <div className="flex items-center gap-16">
              <Link href="#" className="font-semibold text-white">
                Home
              </Link>
              <Link href="#" className="font-semibold text-white">
                Profile
              </Link>
              <Link href="#" className="font-semibold text-white">
                About
              </Link>
            </div>

            <div className="flex items-center gap-3 divide-x divide-[#4b4b4b]">
              <div className="flex items-center">
                <div className="relative flex size-10 cursor-pointer items-center justify-center rounded-[4px] hover:bg-darkElBg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-bell text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>

                  <div className="absolute -right-[1px] top-1 flex size-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    1
                  </div>
                </div>

                {/* Wishlists */}
                <div
                  className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-[4px] hover:bg-darkElBg"
                  onClick={handleWishClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-heart text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>

                  <div className="absolute -right-[1px] top-1 flex size-5 items-center justify-center rounded-full bg-bookmark text-[10px] text-white">
                    {wishlists.length}
                  </div>
                </div>

                {/* Cart */}

                <div
                  className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-[4px] hover:bg-darkElBg"
                  onClick={handleCartClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-cart text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>

                  <div className="absolute -right-[1px] top-1 flex size-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    {cartItems.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-3">
                <Link
                  href="/login"
                  className="flex h-[38px] items-center justify-center rounded-[8px] border-4 border-white bg-transparent px-4 font-bold text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="flex h-[38px] items-center justify-center rounded-[8px] border-2 border-white bg-whiteElBg px-4 font-bold text-darkElBg"
                >
                  Register
                </Link>
              </div>
            </div>
          </nav>
        </div>

        <Hero />
      </div>

      {/* modal window */}
      <ModalWindow type={modalType} />
    </header>
  );
}
