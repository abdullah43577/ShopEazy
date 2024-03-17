import Link from "next/link";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <section className="text-white">
      <div className="h-[200px] w-full bg-[#D1345B]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 pt-16 md:px-4">
          <div className="flex items-center gap-3">
            <div className="size-[80px] rounded-full bg-gray-400"></div>
            <div>
              <h2 className="text-bold text-4xl">Michael Campbell</h2>
              <p className="text-sm tracking-[5px]">New York, USA</p>
            </div>
          </div>

          <button className="h-[40px] w-auto rounded-[8px] border-2 border-white bg-white px-4 text-sm font-bold text-black">
            Sign Out
          </button>
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
            href="/profile/addresses"
            className="cursor-pointer border-b border-b-gray-400 px-4 py-4 hover:bg-gray-600 hover:text-white"
          >
            Addresses
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
