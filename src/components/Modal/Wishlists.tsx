"use client";

import {
  handleDecrementQuantity,
  handleIncrementQuantity,
  updateWishlistsArray,
} from "@/redux/Wishlist/wishlist";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { Products } from "../utils/types";
import { updateWishList } from "@/redux/Products/product";

export default function Wishlists() {
  const MotionImage = motion(Image);
  const { wishlists } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const removeWishlistItem = (product: Products) => {
    //? dispatch the action to remove the item from the wishlist
    dispatch(updateWishlistsArray(product));
    //? dispatch the action to update the products array in the state
    dispatch(updateWishList(product));
  };

  return (
    <>
      <h2 className="mt-[32px] text-center text-4xl font-bold italic text-white underline">
        Wish Lists ({wishlists.length})
      </h2>

      <div className="mt-8 flex max-h-[80%] flex-col gap-3 overflow-y-scroll">
        {wishlists?.map((product) => (
          <div key={product.id} className="rounded-[12px] bg-black p-4">
            <div className="flex items-start gap-8">
              <div className="flex size-[150px] items-center justify-center overflow-hidden rounded-[6px] bg-white">
                <MotionImage
                  initial={{ scale: 0.7 }}
                  whileHover={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  src={product.image}
                  alt={product.title}
                  priority
                  width={300}
                  height={200}
                  className="object-contain"
                />
              </div>

              <div>
                <div>
                  <p className="text-white">{product.title}</p>
                  <p className="mb-4 mt-1 text-bookmark">${product.price}</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* chevron left */}
                  <div
                    className="flex size-8 cursor-pointer items-center justify-center rounded-[8px] border-2 border-[#4b4b4b] hover:bg-[#4b4b4b]"
                    onClick={() => dispatch(handleDecrementQuantity(product))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#f3f3f3"
                      className="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                      />
                    </svg>
                  </div>

                  <p className="text-white">{product.quantity}</p>

                  {/* chevron right */}
                  <div
                    className="flex size-8 cursor-pointer items-center justify-center rounded-[8px] border-2 border-[#4b4b4b] hover:bg-[#4b4b4b]"
                    onClick={() => dispatch(handleIncrementQuantity(product))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#f3f3f3"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    className="h-[40px] w-[150px] rounded-[8px] border-2 border-white bg-transparent px-4 text-sm font-bold text-white"
                    onClick={() => removeWishlistItem(product)}
                  >
                    Remove item
                  </button>

                  <button className="h-[40px] w-[150px] rounded-[8px] border-2 border-white bg-white px-4 text-sm font-bold text-black">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
