"use client";

import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { truncateTxt } from "../utils/TruncateTxt";
import { motion } from "framer-motion";
import type { Products } from "../utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect } from "react";
import { updateProducts, updateWishList } from "@/redux/Products/product";
import { updateWishlistsArray } from "@/redux/Wishlist/wishlist";

export default function Products() {
  const router = useRouter();
  const { data } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}/products`,
    key: "products",
  });

  const MotionImage = motion(Image);

  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  //? console.log("products", products);

  //? ================== UPDATE PRODUCTS ARRAY WITH ADDED ITEMS IN STATE ==================

  useEffect(() => {
    const products: Products[] = data?.length
      ? data.map((product: Products) => ({
          ...product,
          isAddedToWishlist: false,
          isAddedToCart: false,
          quantity: 1,
        }))
      : [];

    dispatch(updateProducts(products));
  }, [data]);

  //? ================================== BUTTON NAVIGATION==================================

  const handlePageNavigate = (url: string) => {
    router.push(url);
  };

  const handleAddToWishList = (e: MouseEvent, product: Products) => {
    e.stopPropagation(); //? prevent event from bubbling to parent

    dispatch(updateWishList(product));
    dispatch(updateWishlistsArray(product));
  };

  return (
    <section className="w-[70%] text-white">
      <p className="text-right">Sort By</p>

      <div className="grid_layout mt-6">
        {products.map((product) => {
          return (
            <div
              onClick={() =>
                handlePageNavigate(
                  `/product/${encodeURIComponent(product.id)}/${encodeURIComponent(product.title)}`,
                )
              }
              key={product.id}
              className="cursor-pointer space-y-1"
            >
              <div className="relative">
                <div className="flex max-h-[350px] min-h-[350px] items-center justify-center overflow-hidden rounded-[6px] bg-white">
                  {product.image && (
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
                  )}
                </div>

                <div
                  className="absolute right-5 top-5 flex size-[40px] items-center justify-center rounded-[6px] bg-gray-400"
                  onClick={(e) => handleAddToWishList(e, product)}
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
              <h2 className="font-semidbold text-xl">
                {truncateTxt({ txt: product.title, n: 30 })}
              </h2>
              <p>{truncateTxt({ txt: product.description, n: 50 })}</p>

              <p className="pt-3 text-xl">$ {product.price}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}