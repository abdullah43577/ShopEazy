"use client";

import Image from "next/image";
import { truncateTxt } from "../utils/TruncateTxt";
import { motion } from "framer-motion";
import type { Products } from "../utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { dispatchAction } from "@/redux/Products/product";

export default function Products() {
  const router = useRouter();

  const MotionImage = motion(Image);

  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  //? ================================== BUTTON NAVIGATION==================================

  const handlePageNavigate = (url: string) => {
    router.push(url);
  };

  const handleAddToWishList = (e: MouseEvent, productId: number) => {
    e.stopPropagation(); //? prevent event from bubbling to parent

    dispatch(
      dispatchAction({
        productId: productId,
        stateType: "wishlists",
        productType: "isAddedToWishlist",
      }),
    );
  };

  return (
    <section
      id="shop_section"
      className="mx-auto mt-6 grid max-w-[1440px] grid-cols-1 gap-8 px-8 text-white md:grid-cols-2 md:gap-4 md:px-4 lg:grid-cols-3"
    >
      {products.map((product) => {
        return (
          <div
            onClick={() =>
              handlePageNavigate(
                `/product/${encodeURIComponent(product.id)}/${encodeURIComponent(product.title.split(" ").join("_"))}`,
              )
            }
            key={product.id}
            className="cursor-pointer space-y-1"
          >
            <div className="relative">
              <div className="flex h-[300px] items-center justify-center overflow-hidden rounded-[6px] bg-white">
                {product.image && (
                  <MotionImage
                    initial={{ scale: 0.5 }}
                    whileHover={{ scale: 0.7 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.title}
                    priority
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                )}
              </div>

              <div
                className="absolute right-5 top-5 flex size-[40px] items-center justify-center rounded-[6px] bg-gray-400"
                onClick={(e) => handleAddToWishList(e, product.id)}
              >
                <motion.svg
                  initial={{ scale: 1 }}
                  whileHover={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className={`bi bi-heart-fill ${product.isAddedToWishlist ? "text-bookmark" : ""}`}
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </motion.svg>
              </div>
            </div>

            <p className="font-bold text-bookmark">New Clothing</p>
            <h2 className="font-semidbold max-w-[400px] overflow-hidden text-ellipsis text-nowrap text-lg md:text-xl">
              {product.title}
            </h2>
            <p className="max-w-[400px] overflow-hidden text-ellipsis text-nowrap text-sm md:text-base">
              {product.description}
            </p>

            <p className="pt-3 text-base md:text-xl">$ {product.price}</p>
          </div>
        );
      })}
    </section>
  );
}
