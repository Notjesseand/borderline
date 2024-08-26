"use client";
import React, { useState, useEffect, useCallback } from "react";
import { lineSpinner } from "ldrs";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  if (typeof window !== "undefined") {
    lineSpinner.register();
  }

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: any) => {
    setCredential(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://www.dev.farmwarehouse.ng/api/users/login",
        {
          credential,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Login successful, you can redirect the user to a protected route or update the state
        console.log("Login successful!");
        setLoading(false);
        // ...
      } else {
        // Login failed, display an error message
        console.error("Login failed:", response.data.error);
        setLoading(false);

        // ...
      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        setError(error.response.data.message);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error sending request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", error.message);
      }
      setLoading(false);
    }
  };

  return (
    <div className="text-base pb-12 relative">
      <div className="grid lg:grid-cols-2 relative">
        {/* banner */}

        <div className="h-screen w-1/2 bg-[#F5F0EC] hidden lg:flex items-center lg:fixed inset-0">
          <img src="/people.png" alt="" className="h-[90%] mx-auto flex" />
        </div>
        <div className="h-screen w-1/2 bg-[#F5F0EC] inset-0 hidden lg:flex items-center "></div>

        {/* form section*/}
        <section className="w-full">
          {/* head */}
          <div className="flex justify-between px-4  sm:px-12 pt-7 text-sm sm:text-base">
            <p className="flex items-center">
              <IoIosArrowBack className="mr-1" />
              Back Home
            </p>
          </div>

          {/*  */}
          <div className="w-[90%] sm:w-3/4 mx-auto pt-14">
            <p className="capitalize text-2xl font-semibold">Welcome Back!</p>

            <p className="my-2 capitalize">
              Welcome back! please enter your details
            </p>

            <div className="mt-6">
              <label htmlFor="Email">Email Address/Phone Number</label>
              <input
                type="text"
                name="credential"
                onChange={handleEmailChange}
                placeholder="Enter email or phone number"
                className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500 mt-2"
              />
              <p className="text-slate-600 text-sm m-1">
                Phone number must have country code. E.g. +234.
              </p>
              {/* password */}
              <label htmlFor="Email" className="mt-5 flex">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500 mt-2"
              />
              <p className="text-red-600 p-1">{error}</p>
              <div className="mt-3 flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  name="remember-me"
                  value="true"
                />

                <label htmlFor="remember-me" className="ml-2">
                  Remember for 30 days
                </label>
              </div>

              {/* submit */}

              {credential.length > 0 && password.length > 0 ? (
                <button
                  onClick={handleSubmit}
                  className=" bg-[#0E9874]  w-full mt-14 rounded-lg py-3 text-white text-lg"
                >
                  {loading ? (
                    <l-line-spinner
                      size="21"
                      stroke="3"
                      speed="1"
                      color="white"
                    ></l-line-spinner>
                  ) : (
                    "Login"
                  )}
                </button>
              ) : (
                <button className=" bg-[#90D0BF]  w-full mt-14 rounded-lg py-3 text-white text-lg">
                  Login
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
