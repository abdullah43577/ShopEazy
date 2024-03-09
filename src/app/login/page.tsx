"use client";

import {
  animationVariants,
  buttonVariants,
} from "@/components/Animations/pageVariants";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Login() {
  return (
    <section className="flex h-screen w-full items-center justify-center overflow-hidden">
      <motion.form
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto mt-[24px] w-[500px] overflow-hidden rounded-[8px] border border-[#4b4b4b] bg-[#1A1A1A] p-5 text-white"
      >
        <h2 className="mb-2 text-2xl font-bold">Welcome Back!</h2>
        <p className="mb-4">
          Please log into your account by entering your credentials below!
        </p>
        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              className="h-[40px] w-full rounded-[8px] border border-[#4b4b4b] bg-transparent px-4 outline-[#4b4b4b]"
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Password
            </label>
            <input
              type="password"
              className="h-[40px] w-full rounded-[8px] border border-[#4b4b4b] bg-transparent px-4 outline-[#4b4b4b]"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between">
            <p>
              Don't have an account?{" "}
              <Link href="/register" className="text-bookmark underline">
                Register
              </Link>
            </p>
            <motion.button
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="h-[40px] max-w-[200px] rounded-[8px] border-2 border-white bg-white px-4 font-bold text-darkElBg"
            >
              Login
            </motion.button>
          </div>
        </div>
      </motion.form>
    </section>
  );
}
