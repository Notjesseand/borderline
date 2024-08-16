"use client";
import React, { useState, useEffect } from "react";
import ParticlesDemo from "@/components/home/particles";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { LuUpload } from "react-icons/lu";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  // all form data
  const [formData, setFormData] = useState({
    phone: "",
    account: "",
  });

  // update form data state
  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="font-custom text-base pb-12 ">
      <div className="grid lg:grid-cols-2 relative">
        {/* banner */}

        <div className="h-screen w-1/2 bg-[#F5F0EC] hidden lg:flex items-center lg:fixed inset-0">
          <img src="/bg-2.png" alt="" className="h-[90%] mx-auto flex" />
        </div>
        <div className="h-screen w-1/2 bg-[#F5F0EC] inset-0 hidden lg:flex items-center "></div>

        {/* form section */}
        <section className="w-full">
          {/* head */}
          <div className="flex justify-between px-4  sm:px-12 pt-7 text-sm sm:text-base">
            <p className="flex items-center">
              <IoIosArrowBack className="mr-1" />
              Back Home
            </p>
            <p>
              Already have an account?
              <Link href={""} className="text-[#0A6C52]">
                {" "}
                Log in
              </Link>
            </p>
          </div>
          {/*  */}
          <div className="w-[90%] sm:w-3/4 mx-auto pt-14">
            <p className="capitalize text-2xl font-semibold">create account</p>
            <p className="text-lg my-2 capitalize">Bank Details</p>
            <div className="text-[15px]">
              <label htmlFor="smartphone" className="flex pt-3">
                Do you have a Smartphone
              </label>

              <div className="flex items-center">
                {/* yes option */}
                <input
                  type="radio"
                  name="phone"
                  value="yes"
                  id="phone-yes"
                  className="m-1"
                  onChange={handleChange}
                  checked={formData.phone === "yes"}
                />
                <label htmlFor="phone-yes">Yes</label>

                {/* no option */}
                <input
                  type="radio"
                  name="phone"
                  value="no"
                  id="phone-no"
                  className="m-1 ml-4"
                  onChange={handleChange}
                  checked={formData.phone === "no"}
                />
                <label htmlFor="phone-no">No</label>
              </div>

              {/* Bank Account */}
              {/* Bank Account */}
              <label htmlFor="account" className="flex pt-3">
                Do you have a Bank Account?
              </label>

              <div className="flex items-center">
                {/* yes option */}
                <input
                  type="radio"
                  name="account"
                  value="yes"
                  id="account-yes"
                  className="m-1"
                  onChange={handleChange}
                  checked={formData.account === "yes"}
                />
                <label htmlFor="account-yes">Yes</label>

                {/* no option */}
                <input
                  type="radio"
                  name="account"
                  value="no"
                  id="account-no"
                  className="m-1 ml-4"
                  onChange={handleChange}
                  checked={formData.account === "no"}
                />
                <label htmlFor="account-no">No</label>
              </div>

              {/* bank name */}
              <label htmlFor="ID type" className="flex pt-3 pb-1">
                Bank Name*
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, id_type: value }))
                }
              >
                <SelectTrigger className="w-full outline-none focus:outline-none">
                  <SelectValue placeholder="select Bank" />
                </SelectTrigger>
                <SelectContent className="font-custom">
                  <SelectItem value="GTB">Guarantee Trust Bank</SelectItem>
                  <SelectItem value="Kuda">Kuda MFB</SelectItem>
                  <SelectItem value="Zenith">Zenith Bank</SelectItem>
                </SelectContent>
              </Select>

              {/* Account Number */}
              <div className="flex w-full justify-between gap-2 text-[15px]">
                <div className="w-full">
                  <label htmlFor="email" className="flex pt-3">
                    Account Number
                  </label>
                  <input
                    type="number"
                    name="account"
                    value={formData.account.slice(0, 8)}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {formData.account.length === 0 ? (
                <p className="text-green-600 ml-1 invisible">i</p>
              ) : formData.account.length > 3 ? (
                <p className="text-green-600 ml-1">Future Hendrix</p>
              ) : (
                <p className="text-red-600 ml-1">
                  {/* Couldn't verify account number */}
                </p>
              )}

              {/* back / submit */}
              <div className="mt-12 gap-x-4 flex">
                <button className="w-1/2 text-center border-2 border-slate-400 rounded-lg py-2 mt-2">
                  Back
                </button>
                {formData.account.length > 0 && formData.phone.length ? (
                  <button className="w-1/2 text-center text-white border-2 border-[#0D8A6A] rounded-lg py-2 mt-2 bg-[#0D8A6A]">
                    Continue
                  </button>
                ) : (
                  <button className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#90D0BF] cursor-not-allowed">
                    Continue
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
