import { motion } from "framer-motion";

const animationVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1,
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto flex h-[80vh] max-w-[1000px] flex-col items-center justify-center space-y-6 bg-white dark:bg-black"
    >
      <h1 className="text-center text-6xl font-bold text-black dark:text-white">
        Discover Your Perfect Purchase Experience
      </h1>
      <p className="text-center text-xl text-black dark:text-white">
        Welcome to{" "}
        <span className="font-bold italic text-bookmark">ShopEazy!</span>, where
        shopping meets satisfaction. Explore our curated collection of
        high-quality products, handpicked to elevate your lifestyle. With
        seamless navigation and secure transactions, find everything you need
        and more, right at your fingertips.
      </p>

      <button className="h-[40px] rounded-[8px] border-2 border-white bg-whiteElBg px-4 font-bold text-darkElBg">
        Start Shopping
      </button>

      <div className="flex items-center gap-2 text-white">
        <p className="flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border border-[#4b4b4b] font-bold">
          All
        </p>

        <p className="flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold hover:border">
          Men's
        </p>

        <p className="flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold hover:border">
          Women's
        </p>

        <p className="flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold hover:border">
          Electronics
        </p>

        <p className="flex h-[30px] w-[100px] cursor-pointer items-center justify-center rounded-[20px] border-[#4b4b4b] font-bold hover:border">
          Jewelery
        </p>
      </div>
    </motion.section>
  );
}
