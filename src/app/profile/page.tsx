"use client";

import { handleAxiosErrors } from "@/components/utils/handleAxiosErrors";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useState } from "react";
import axios from "axios";
import { SwalAlert } from "@/components/utils/SwalAlert";

export default function Profile() {
  const { firstName, lastName, username, phone, address, email } =
    useAppSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleUpdateInput = function (e: ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevValue) => ({ ...prevValue, [name]: value.trim() }));
  };

  const handleSave = async function (e: MouseEvent) {
    e.preventDefault();

    const token = localStorage.getItem("shopEazyJWT")?.replaceAll(/["]+/g, "");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/update_profile`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      SwalAlert({ icon: "success", title: "Profile Updated Successfully!" });
    } catch (err) {
      handleAxiosErrors(err);
    }
  };

  return (
    <div className="pb-10 text-white">
      <h3 className="mb-2 text-xl font-semibold">Hello {firstName},</h3>
      <p className="max-w-[650px] text-sm">
        From your account profile, you can easily check & view your{" "}
        <Link href="/profile/orders" className="text-bookmark underline">
          Recend Orders
        </Link>
        , manage your{" "}
        <span className="text-bookmark underline">
          shipping and billing addresses
        </span>
        , and edit your password and account details
      </p>

      <form className="relative mt-10 rounded-[12px] border border-gray-400 p-5">
        <h2 className="absolute -top-4 left-4 mb-2 bg-black px-4 text-xl font-semibold">
          Profile Details
        </h2>

        <div className="flex gap-16">
          <div>
            <label htmlFor="firstName" className="block">
              First Name
            </label>
            <input
              type="text"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 capitalize outline-none"
              name="firstName"
              value={formData.firstName}
              onChange={handleUpdateInput}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block">
              Last Name
            </label>
            <input
              type="text"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 capitalize outline-none"
              name="lastName"
              value={formData.lastName}
              onChange={handleUpdateInput}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-16">
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 outline-none"
              pattern="[a-zA-Z0-9]{5,}"
              name="username"
              value={formData.username}
              onChange={handleUpdateInput}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block">
              Phone Number
            </label>
            <input
              type="number"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 capitalize outline-none"
              name="phone"
              value={formData.phone}
              onChange={handleUpdateInput}
            />
          </div>
        </div>

        <div className="mt-5 flex gap-16">
          <div>
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="email"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 outline-none"
              name="email"
              value={formData.email}
              onChange={handleUpdateInput}
            />
          </div>

          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <input
              type="number"
              className="mt-2 h-[40px] w-[350px] rounded-[6px] border border-gray-400 bg-transparent px-4 capitalize outline-none"
              name="address"
              value={formData.address}
              onChange={handleUpdateInput}
            />
          </div>
        </div>

        <div className="flex gap-8" onClick={(e) => handleSave(e)}>
          <button className="mt-5 h-[40px] rounded-[8px] border-2 border-white bg-white px-8 text-sm font-bold text-black">
            Save
          </button>

          <button className="mt-5 h-[40px] rounded-[8px] border-2 border-bookmark bg-bookmark px-8 text-sm font-bold text-white">
            Change Password
          </button>
        </div>
      </form>

      <div className="relative mt-20 rounded-[12px] border border-gray-400 p-5">
        <h2 className="absolute -top-4 left-4 mb-2 bg-black px-4 text-xl font-semibold">
          Profile Information
        </h2>

        <div className="flex gap-16">
          <div>
            <label htmlFor="firstName" className="block">
              First Name
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 capitalize opacity-50 outline-none"
            >
              {firstName}
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block">
              Last Name
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 capitalize opacity-50 outline-none"
            >
              {lastName}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-16">
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 capitalize opacity-50 outline-none"
            >
              {username}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block">
              Phone Number
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 capitalize opacity-50 outline-none"
            >
              {phone}
            </div>
          </div>
        </div>

        <div className="mt-5 flex gap-16">
          <div>
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 opacity-50 outline-none"
            >
              {email}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <div
              className="mt-2 flex h-[40px] w-[350px] items-center
              rounded-[6px] border border-gray-400 px-4 opacity-50 outline-none"
            >
              {address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
