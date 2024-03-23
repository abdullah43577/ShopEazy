"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { wishlists, cartItems } = useAppSelector((state) => state.products);

  //? =============== HANDLE PAGE SCROLL SETTING THE NAVBAR TO FIXED ==================

  useEffect(() => {
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

  return (
    <header>
      <div className="relative mx-auto max-w-[1440px] px-8 pt-6 md:px-4">
        <div
          className={`${isScrolled ? "navBar fixed left-0 top-0 z-[100] w-full px-8 py-6 md:px-4" : ""}`}
        >
          <nav
            className={`flex items-center justify-between ${isScrolled ? "mx-auto max-w-[1440px]" : ""}`}
          >
            <div className="text-lg font-bold italic text-black sm:text-2xl md:text-4xl dark:text-white">
              Shop<span className="text-bookmark">Eazy!</span>
            </div>

            <div className="flex h-[30px] items-center gap-3">
              <div className="flex items-center">
                {/* Wishlists */}
                <Link
                  href="/profile/wishlists"
                  className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-[4px] hover:bg-darkElBg"
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

                  <div className="absolute right-[1px] top-1 flex size-4 items-center justify-center rounded-full bg-bookmark text-[10px] text-white md:-right-[1px] md:size-5">
                    {wishlists.length}
                  </div>
                </Link>

                {/* Cart */}

                <Link
                  href="/profile/cart"
                  className="relative flex size-[40px] cursor-pointer items-center justify-center rounded-[4px] hover:bg-darkElBg"
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

                  <div className="absolute right-[1px] top-1 flex size-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white md:-right-[1px] md:size-5">
                    {cartItems.length}
                  </div>
                </Link>
              </div>

              {/* divider */}
              <div className="h-full w-[1px] bg-[#4b4b4b]"></div>

              {/* profile icon */}
              <Link href="/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-person-circle text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </Link>

              {/* signup, login section */}
              {/* flex */}
              <div className="hidden items-center gap-3 pl-3">
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
    </header>
  );
}
