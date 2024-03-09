"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Filters() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const svgVariants = {
    startPoint: {
      rotate: "90deg",
    },

    rotate: {
      rotate: isCategoryOpen ? "270deg" : "90deg",

      transition: {
        duration: 0.5,
      },
    },
  };

  const categoryVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },

    visible: {
      opacity: isCategoryOpen ? 1 : 0,
      height: isCategoryOpen ? "auto" : 0,

      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-[20%] text-white">
      <div className="flex items-center justify-between border-b border-[#4b4b4b] pb-4">
        <p className="text-xl font-bold">Filters</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
          />
        </svg>
      </div>

      <div>
        <div
          className="flex cursor-pointer items-center justify-between border-b border-[#4b4b4b] py-4"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <p>Category(2)</p>

          <motion.svg
            variants={svgVariants}
            initial="startPoint"
            animate="rotate"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </motion.svg>
        </div>

        <motion.div
          variants={categoryVariants}
          initial="hidden"
          animate="visible"
          className="py-2"
        >
          <div className="flex h-[40px] cursor-pointer items-center gap-4 rounded-[6px] px-4 hover:bg-[#4b4b4b]">
            <input type="checkbox" />
            <p>Men's</p>
          </div>

          <div className="flex h-[40px] cursor-pointer items-center gap-4 rounded-[6px] px-4 hover:bg-[#4b4b4b]">
            <input type="checkbox" />
            <p>Women's</p>
          </div>

          <div className="flex h-[40px] cursor-pointer items-center gap-4 rounded-[6px] px-4 hover:bg-[#4b4b4b]">
            <input type="checkbox" />
            <p>Electronics</p>
          </div>

          <div className="flex h-[40px] cursor-pointer items-center gap-4 rounded-[6px] px-4 hover:bg-[#4b4b4b]">
            <input type="checkbox" />
            <p>Jewelery</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
