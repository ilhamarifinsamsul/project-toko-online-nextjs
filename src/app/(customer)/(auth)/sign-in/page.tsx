// client components
"use client";

import { ActionResult } from "@/types";
import React, { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import SignIn from "../lib/actions";

const initialFormState: ActionResult = {
  error: "",
  success: "",
};

function SumitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
    >
      {pending ? "Loading..." : "Sign In to My Account"}
    </button>
  );
}

export default function SignInPage() {
  const [state, formAction] = useActionState(SignIn, initialFormState);

  // local state untuk kontrol visibilitas error
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (state.error) {
      setErrorMessage(state.error);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false); // fade out
      }, 4000); // mulai fade setelah 4 detik

      const clearMsg = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // clear message setelah 5 detik total

      return () => {
        clearTimeout(timer);
        clearTimeout(clearMsg);
      };
    }
  }, [state.error]);

  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      {/* <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
        <div className="flex shrink-0">
          <img src="./assets/logos/logo.svg" alt="icon" />
        </div>
        <ul className="flex items-center gap-[30px]">
          <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
            <a href="index.html">Shop</a>
          </li>
          <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
            <a href="">Categories</a>
          </li>
          <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
            <a href="">Testimonials</a>
          </li>
          <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
            <a href="">Rewards</a>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <a href="cart.html">
            <div className="w-12 h-12 flex shrink-0">
              <img src="./assets/icons/cart.svg" alt="icon" />
            </div>
          </a>
          <a
            href="signin.html"
            className="p-[12px_20px] bg-white rounded-full font-semibold"
          >
            Sign In
          </a>
          <a
            href="signup.html"
            className="p-[12px_20px] bg-white rounded-full font-semibold"
          >
            Sign Up
          </a>
        </div>
      </nav> */}
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <img src="./assets/logos/logo-black.svg" alt="logo" />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign In</h1>
          {/* cek error state */}
          {errorMessage && (
            <div
              className={`border border-[#FF3B3B] bg-red-50 rounded-md p-3 transition-opacity duration-1000 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <h4 className="font-semibold text-red-600">
                Error
                <p className="text-sm">{errorMessage}</p>
              </h4>
            </div>
          )}

          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <img src="./assets/icons/sms.svg" alt="icon" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your email address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <img src="./assets/icons/lock.svg" alt="icon" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your password"
              />
              {/* <button type="button" className="reveal-password flex shrink-0">
                <img src="./assets/icons/eye.svg" alt="icon" />
              </button> */}
            </div>
            {/* <a
              href=""
              className="text-sm text-[#616369] underline w-fit mr-0 ml-auto"
            >
              Forgot Password
            </a> */}
          </div>
          <div className="flex flex-col gap-3">
            <SumitButton />
            <a
              href="signup.html"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
