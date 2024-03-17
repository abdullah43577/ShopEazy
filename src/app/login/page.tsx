"use client";

import {
  animationVariants,
  buttonVariants,
} from "@/components/Animations/pageVariants";
import { SwalAlert } from "@/components/utils/SwalAlert";
import { setFormData, toggleShowPassword } from "@/redux/Login/Login";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { MouseEvent } from "react";
import { handleAxiosErrors } from "@/components/utils/handleAxiosErrors";
import axios from "axios";

export default function Login() {
  const { usernameOrEmail, password, showPassword } = useAppSelector(
    (state) => state.login,
  );
  const dispatch = useAppDispatch();

  const handleFormSubmit = async function (e: MouseEvent) {
    e.preventDefault();

    const formData = {
      usernameOrEmail,
      password,
    };

    for (const key of Object.values(formData)) {
      if (key === "") {
        return SwalAlert({
          icon: "error",
          title: "Error, Please Fill all Required Fields!",
        });
      }
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;
      console.log(data);
      SwalAlert({ icon: "success", title: "User login successfully!" });
    } catch (err) {
      handleAxiosErrors(err);
    }
  };
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
            <label htmlFor="email or username" className="mb-2 block">
              Email Address or Username
            </label>
            <input
              type="text"
              className="h-[40px] w-full rounded-[8px] border border-[#4b4b4b] bg-transparent px-4 outline-[#4b4b4b]"
              placeholder="Email or Username"
              value={usernameOrEmail}
              onChange={(e) =>
                dispatch(
                  setFormData({
                    key: "usernameOrEmail",
                    value: e.target.value,
                  }),
                )
              }
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="h-[40px] w-full rounded-[8px] border border-[#4b4b4b] bg-transparent px-4 outline-[#4b4b4b]"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  dispatch(
                    setFormData({ key: "password", value: e.target.value }),
                  )
                }
              />

              <div
                className="absolute right-5 cursor-pointer"
                onClick={() => dispatch(toggleShowPassword())}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-unlock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z" />
                  </svg>
                )}
              </div>
            </div>
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
              onClick={(e) => handleFormSubmit(e)}
            >
              Login
            </motion.button>
          </div>
        </div>
      </motion.form>
    </section>
  );
}
