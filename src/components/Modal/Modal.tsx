"use client";

import { toggleModal } from "@/redux/Modal/modalWindow";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Image from "next/image";
import Wishlists from "./Wishlists";

interface ModalProps {
  type: string;
}

export default function ModalWindow() {
  const MotionImage = motion(Image);
  const { isModalOpen } = useAppSelector((state) => state.modalWindow);
  const dispatch = useAppDispatch();

  return (
    <>
      <section
        className={`fixed right-0 top-0 z-[200] h-full w-[40%] bg-darkElBg p-8 ${isModalOpen ? "block" : "hidden"}`}
      >
        <Wishlists />
      </section>

      <div
        className={`overlay fixed left-0 top-0 z-[190] h-full w-full bg-[#00000066] backdrop-blur-[3px] ${isModalOpen ? "block" : "hidden"}`}
        onClick={() => dispatch(toggleModal())}
      ></div>
    </>
  );
}
