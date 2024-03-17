"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Products } from "../utils/types";
import { dispatchAction, quantityChange } from "@/redux/Products/product";

export default function Cart() {
  const MotionImage = motion(Image);
  const [cartData, setCartData] = useState<Products[]>([]);
  const { products, cartItems } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let arr: Products[] = [];

    cartItems.forEach((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (product) {
        arr.push({
          ...product,
          quantity: item.quantity,
        });
      }
    });

    setCartData(arr);
  }, [cartItems, products]);

  return (
    <>
      <h2 className="mt-[32px] text-center text-4xl font-bold italic text-white underline">
        CartItems ({cartItems.length})
      </h2>

      <div className="mt-8 flex max-h-[60%] flex-col gap-3 overflow-y-scroll">
        {cartData.map((product) => (
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

              <div className="w-full">
                <div>
                  <p className="text-white">{product.title}</p>
                  <p className="mb-4 mt-1 text-bookmark">
                    ${product.price} * {product.quantity} = $
                    {(product.price * product.quantity).toFixed()}
                  </p>
                </div>

                <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
                  <div className="flex items-center gap-4">
                    {/* chevron left */}
                    <div
                      className="flex size-8 cursor-pointer items-center justify-center rounded-[8px] border-2 border-[#4b4b4b] hover:bg-[#4b4b4b]"
                      onClick={() =>
                        dispatch(
                          quantityChange({
                            productId: product.id,
                            stateType: "cartItems",
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
                            stateType: "cartItems",
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
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-t-white text-white">
        <h2 className="py-6 text-center text-2xl font-semibold">
          CART SUMMARY
        </h2>

        <p>Total Item(s): {cartItems.length}</p>
        <p>
          Total:{" "}
          {cartData
            .reduce(
              (acc, curValue) => acc + curValue.price * curValue.quantity,
              0,
            )
            .toFixed()}
        </p>
      </div>
    </>
  );
}
