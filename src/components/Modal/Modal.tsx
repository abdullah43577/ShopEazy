"use client";

import { toggleModal } from "@/redux/Modal/modalWindow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Wishlists from "./Wishlists";
import Cart from "./Cart";
import { motion } from "framer-motion";

interface ModalWindowProps {
  type: "wishlist" | "cart" | "notification" | null;
}

export default function ModalWindow({ type }: ModalWindowProps) {
  const { isModalOpen } = useAppSelector((state) => state.modalWindow);
  const dispatch = useAppDispatch();

  return (
    <>
      <motion.section
        initial={{ x: "100%" }}
        animate={{ x: isModalOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 z-[200] h-full w-full bg-darkElBg p-8 md:w-[40%]"
      >
        <div
          className="ml-auto flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#4b4b4b]"
          onClick={() => dispatch(toggleModal())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#f3f3f3"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>

        {type === "wishlist" ? <Wishlists /> : <Cart />}
      </motion.section>

      <motion.div
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={{
          opacity: isModalOpen ? 1 : 0,
          visibility: isModalOpen ? "visible" : "hidden",
        }}
        transition={{ duration: 0.3 }}
        className="overlay fixed left-0 top-0 z-[190] h-full w-full bg-[#00000066] backdrop-blur-[3px]"
        onClick={() => dispatch(toggleModal())}
      ></motion.div>
    </>
  );
}
