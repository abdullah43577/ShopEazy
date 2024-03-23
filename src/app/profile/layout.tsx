"use client";

import useFetch from "@/hooks/useFetch";
import { updateForm } from "@/redux/Profile/profileForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { firstName, lastName } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const id =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "")
      : null;

  const { data } = useFetch({
    endpoint: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/getuser/${id}`,
    key: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/getuser/${id}`,
  });

  useEffect(() => {
    if (data) dispatch(updateForm(data?.user));
  }, [data]);

  return (
    <section className="text-white">
      <div className="h-[200px] w-full bg-[#D1345B]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 pt-16 md:px-4">
          <div className="flex items-center gap-3">
            <div className="size-[80px] rounded-full bg-gray-400"></div>
            <div>
              <h2 className="text-bold text-4xl">
                {firstName} {lastName}
              </h2>
              <p className="text-sm tracking-[5px]">New York, USA</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex h-[40px] w-auto items-center justify-center rounded-[8px] border-2 border-white bg-white px-4 text-sm font-bold text-black"
            >
              Home
            </Link>

            <button className="h-[40px] w-auto rounded-[8px] border-2 border-white bg-white px-4 text-sm font-bold text-black">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] items-start gap-16 px-8 text-black md:px-4">
        <div className="flex w-[250px] flex-col rounded-[6px] bg-[#EFEFEF]">
          <Link
            href="/profile"
            className="cursor-pointer border-b border-b-gray-400 bg-gray-600 px-4 py-4 text-white hover:bg-gray-600 hover:text-white"
          >
            Profile
          </Link>
          <Link
            href="/profile/orders"
            className="cursor-pointer border-b border-b-gray-400 px-4 py-4 hover:bg-gray-600 hover:text-white"
          >
            Orders
          </Link>
          <Link
            href="/profile/wishlists"
            className="cursor-pointer border-b border-b-gray-400 px-4 py-4 hover:bg-gray-600 hover:text-white"
          >
            Wishlists
          </Link>
          <Link
            href="/profile/cart"
            className="cursor-pointer px-4 py-4 hover:bg-gray-600 hover:text-white"
          >
            Cart Items
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
}
