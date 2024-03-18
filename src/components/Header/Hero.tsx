"use client";

import { updateFilter } from "@/redux/Filters/filters";
import { dispatchFilter } from "@/redux/Products/product";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Link from "next/link";

const animationVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
    },
  },
};

interface Filter {
  filter: "All" | "Men" | "Women" | "Electronics" | "Jewelery";

  categoryName:
    | "all"
    | "men's clothing"
    | "women's clothing"
    | "electronics"
    | "jewelery";
}

export default function Hero() {
  const { All, Men, Women, Electronics, Jewelery } = useAppSelector(
    (state) => state.filters,
  );
  const dispatch = useAppDispatch();

  const handleDispatchFilter = ({ filter, categoryName }: Filter) => {
    dispatch(updateFilter(filter));
    dispatch(dispatchFilter(categoryName));
  };

  return (
    <motion.section
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      className="hero mx-auto mt-16 flex max-w-[1000px] flex-col items-center justify-center space-y-6 bg-white md:mt-0 md:h-[80vh] dark:bg-black"
    >
      <h1 className="text-center text-3xl font-bold text-black md:text-6xl dark:text-white">
        Discover Your Perfect Purchase Experience
      </h1>
      <p className="text-center text-sm text-black sm:text-base md:text-xl dark:text-white">
        Welcome to{" "}
        <span className="font-bold italic text-bookmark">ShopEazy!</span>, where
        shopping meets satisfaction. Explore our curated collection of
        high-quality products, handpicked to elevate your lifestyle. With
        seamless navigation and secure transactions, find everything you need
        and more, right at your fingertips.
      </p>

      <Link href="#shop_section">
        <button className="h-[40px] rounded-[8px] border-2 border-white bg-whiteElBg px-4 font-bold text-darkElBg">
          Start Shopping
        </button>
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-2 text-white">
        <p
          className={`flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold ${All ? "border" : "hover:border"}`}
          onClick={() =>
            handleDispatchFilter({ filter: "All", categoryName: "all" })
          }
        >
          All
        </p>

        <p
          className={`flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold ${Men ? "border" : "hover:border"}`}
          onClick={() =>
            handleDispatchFilter({
              filter: "Men",
              categoryName: "men's clothing",
            })
          }
        >
          Men's
        </p>

        <p
          className={`flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold ${Women ? "border" : "hover:border"}`}
          onClick={() =>
            handleDispatchFilter({
              filter: "Women",
              categoryName: "women's clothing",
            })
          }
        >
          Women's
        </p>

        <p
          className={`flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold ${Electronics ? "border" : "hover:border"}`}
          onClick={() =>
            handleDispatchFilter({
              filter: "Electronics",
              categoryName: "electronics",
            })
          }
        >
          Electronics
        </p>

        <p
          className={`flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold ${Jewelery ? "border" : "hover:border"}`}
          onClick={() =>
            handleDispatchFilter({
              filter: "Jewelery",
              categoryName: "jewelery",
            })
          }
        >
          Jewelery
        </p>
      </div>
    </motion.section>
  );
}
