"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dispatchAction, quantityChange } from "@/redux/Products/product";
import { Products } from "@/components/utils/types";

export default function Wishlists() {
  const MotionImage = motion(Image);
  const [wishlistsData, setWishlistsData] = useState<Products[]>([]);
  const { products, wishlists, cartItems } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let arr: Products[] = [];

    wishlists.forEach((wishlist) => {
      const product = products.find(
        (product) => product.id === wishlist.productId,
      );

      if (product) {
        arr.push({
          ...product,
          quantity: wishlist.quantity,
        });
      }
    });

    setWishlistsData(arr);
  }, [wishlists, products]);

  return (
    <div className="relative flex w-full max-w-[700px] flex-col gap-3 rounded-[12px] border border-gray-400 p-5">
      <h2 className="absolute -top-4 left-4 mb-2 bg-black px-4 text-2xl font-semibold text-white">
        Wishlists
      </h2>

      {wishlistsData?.map((product) => (
        <div key={product.id} className="rounded-[12px] bg-black p-4">
          <div className="flex items-start gap-8">
            <div className="flex size-[200px] items-center justify-center overflow-hidden rounded-[6px] bg-white">
              <MotionImage
                initial={{ scale: 0.7 }}
                whileHover={{ scale: 0.8 }}
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
                  onClick={() =>
                    dispatch(
                      quantityChange({
                        productId: product.id,
                        stateType: "wishlists",
                        type: "decrement",
                      }),
                    )
                  }
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
                  onClick={() =>
                    dispatch(
                      quantityChange({
                        productId: product.id,
                        stateType: "wishlists",
                        type: "increment",
                      }),
                    )
                  }
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
                  className="h-[40px] w-auto rounded-[8px] border-2 border-white bg-transparent px-4 text-sm font-bold text-white"
                  onClick={() =>
                    dispatch(
                      dispatchAction({
                        productId: product.id,
                        stateType: "wishlists",
                        productType: "isAddedToWishlist",
                      }),
                    )
                  }
                >
                  Remove item
                </button>

                <button
                  className="h-[40px] w-auto rounded-[8px] border-2 border-white bg-white px-4 text-sm font-bold text-black"
                  onClick={() =>
                    dispatch(
                      dispatchAction({
                        productId: product.id,
                        stateType: "cartItems",
                        productType: "isAddedToCart",
                      }),
                    )
                  }
                >
                  {cartItems.some((item) => item.productId === product.id)
                    ? "Remove from cart"
                    : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
