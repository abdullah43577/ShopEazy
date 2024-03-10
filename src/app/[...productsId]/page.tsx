"use client";

import useFetch from "@/hooks/useFetch";
import type { Products } from "@/components/utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Rating from "@/components/utils/Rating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { updateWishlistsArray } from "@/redux/Wishlist/wishlist";
import { handleAddorDeleteCartItems } from "@/redux/Cart/cart";

interface Props {
  params: { productsId: { 0: string; 1: string; 2: string }[] };
}

export default function ProductDetails({ params }: Props) {
  const { data } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productsId[1]}`,
    key: `product_${params.productsId[1]}`,
  });
  const [btnTxt, setBtnTxt] = useState("");
  const { wishlists } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const product: Products = data || {};
  const MotionImage = motion(Image);

  useEffect(() => {
    const isInWishlist = wishlists.find((obj) => obj.id === product.id);

    if (isInWishlist) {
      setBtnTxt("Remove from Wishlist");
    } else {
      setBtnTxt("Add to Wishlist");
    }
  }, [wishlists, product.id, btnTxt]);

  const handleUpdateWishlist = function (product: Products) {
    const newProduct = {
      ...product,
      isAddedToWishlist: false,
      isAddedToCart: false,
      quantity: 1,
    };

    dispatch(updateWishlistsArray(newProduct));
  };

  return (
    <section>
      <div className="mx-auto flex max-w-[1200px] items-stretch justify-between gap-5 rounded-[8px] border border-[#4b4b4b] p-4 px-8 text-white md:px-4">
        <div className="flex max-h-[350px] min-h-[350px] min-w-[500px] cursor-pointer items-center justify-center overflow-hidden rounded-[6px] bg-white">
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

        <div className="space-y-3">
          <p className="text-2xl font-bold">{product.title}</p>
          <p className="text-lg font-semibold text-bookmark">
            ${product.price}
          </p>
          <p className="">{product.description}</p>
          <div className="flex items-center gap-3 pb-4 pt-6">
            <Rating rate={product.rating?.rate} />
            <p>{product.rating?.count} reviews</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="h-[40px] w-[200px] rounded-[8px] border-2 border-white bg-transparent px-4 font-bold text-white"
              onClick={() => handleUpdateWishlist(product)}
            >
              {btnTxt}
            </button>

            <button
              className="h-[40px] w-[200px] rounded-[8px] border-2 border-white bg-white px-4 font-bold text-darkElBg"
              onClick={() => dispatch(handleAddorDeleteCartItems(product))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
