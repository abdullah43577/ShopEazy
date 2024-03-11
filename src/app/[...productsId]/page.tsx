"use client";

import type { Products } from "@/components/utils/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Rating from "@/components/utils/Rating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { handleAddorDeleteCartItems } from "@/redux/Cart/cart";

interface Props {
  params: { productsId: [string, string, string] };
}

export default function ProductDetails({ params }: Props) {
  const [product, setProduct] = useState<Products>({
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    rating: { rate: 0, count: 0 },
    title: "",
    isAddedToWishlist: false,
    isAddedToCart: false,
    quantity: 1,
  });
  const { products } = useAppSelector((state) => state.products);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const [wishlistBtn, setWishlistBtn] = useState("");
  const [cartBtn, setCartBtn] = useState("");
  const dispatch = useAppDispatch();

  const MotionImage = motion(Image);

  useEffect(() => {
    const id = Number(params.productsId[1]);
    const currentProduct = products.find((product) => product.id === id);

    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [params.productsId, products]);

  //? ================== UPDATE BTN FOR ADDING ITEMS TO WISHLISTS ==================

  // useEffect(() => {
  //   const id = Number(params.productsId[1]);
  //   const currentProduct = wishlists.find((product) => product.id === id);

  //   if (currentProduct) {
  //     setWishlistBtn("Remove from wishlists");
  //   } else {
  //     setWishlistBtn("Add to wishlists");
  //   }
  // }, [params.productsId]);

  //? ================== UPDATE BTN FOR ADDING ITEMS TO CART =========================

  useEffect(() => {
    const id = Number(params.productsId[1]);
    const currentProduct = cartItems.find((product) => product.id === id);

    if (currentProduct) {
      setCartBtn("Remove from cart");
    } else {
      setCartBtn("Add to cart");
    }
  }, [cartItems, params.productsId]);

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
            <button className="h-[40px] w-[200px] rounded-[8px] border-2 border-white bg-transparent px-4 font-bold text-white">
              {wishlistBtn}
            </button>

            <button
              className="h-[40px] w-[200px] rounded-[8px] border-2 border-white bg-white px-4 font-bold text-darkElBg"
              onClick={() => dispatch(handleAddorDeleteCartItems(product))}
            >
              {cartBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
