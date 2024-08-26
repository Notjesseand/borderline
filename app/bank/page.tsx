"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { lineSpinner } from "ldrs";

const Page = () => {
  if (typeof window !== "undefined") {
    lineSpinner.register();
  }

  const [formData, setFormData] = useState({
    userDetails: {
      firstName: "",
      lastName: "",
      credential: "",
      email: "",
      password: "",
      roleName: "Farmer",
      gender: "",
      resAddress: "",
      ageGroup: "",
      hasBankAccount: false,
      hasSmartphone: false,
      profilePic: {
        url: "img.jpg",
      },
    },
    siteId: "",
    idUpload: {
      idType: "",
      idNumber: "",
      url: "",
    },
    // optional, only send if hasBankAccount is true
    bankDetails: {
      accountNumber: "666666666666",
      bankName: "Kuda", // Move bankName inside bankDetails
    },
    farmDetails: [
      {
        name: "",
        address: "adress",
        long: 0,
        lat: 0,
        docUploads: [
          {
            url: "img.jpg",
          },
        ],
        crops: [
          {
            cropId: "",
            farmSeasonStart: "",
            farmSeasonEnd: "",
          },
        ],
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setLoading(!loading);
  };

  const [hasSmartphone, setHasSmartphone] = useState<boolean | null>(null);
  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const data = localStorage.getItem("formData");
    let parsedFormData: any = {};
    if (data) {
      parsedFormData = JSON.parse(data);
    }
    setFormData(parsedFormData);
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    let newValue;

    if (value === "true") {
      newValue = true;
    } else if (value === "false") {
      newValue = false;
    } else {
      newValue = value;
    }

    if (
      name === "bankName" ||
      name === "accountNumber" ||
      name === " hasSmartphone"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        bankDetails: {
          ...prevData.bankDetails,
          [name]: newValue,
        },
      }));
    } else if (name === "hasBankAccount") {
      setFormData((prevData) => ({
        ...prevData,
        userDetails: { ...prevData.userDetails, hasSmartphone: newValue },
      }));
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true";
    setHasSmartphone(value);
    handleChange(event);
    checkBankExistense;
  };

  // check for bank account
  const [bank, setBank] = useState<true | false>();
  const checkBankExistense = () => {
    setBank(true);
  };
  const setBankFalse = () => {
    setBank(false);
  };

  // set formData to storage to enable access in other form pages
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/farm");
    }, 2000);
    localStorage.setItem("formData", JSON.stringify(formData));
    toggle();
  };

  return (
    <div className="text-base pb-12 ">
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
              <Link href={"/login"} className="text-[#0A6C52]">
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
                  name="hasSmartphone"
                  value="true"
                  id="phone-yes"
                  className="m-1"
                  onChange={handleRadioChange}
                />
                <label htmlFor="phone-yes">Yes</label>

                {/* no option */}
                <input
                  type="radio"
                  name="hasSmartphone"
                  value="false"
                  id="phone-no"
                  className="m-1 ml-4"
                  onChange={handleRadioChange}
                />
                <label htmlFor="phone-no">No</label>
              </div>

              {/* Bank Account */}
              <label htmlFor="account" className="flex pt-3">
                Do you have a Bank Account?
              </label>

              <div className="flex items-center">
                {/* yes option */}
                <input
                  type="radio"
                  name="hasBankAccount"
                  // @ts-ignore
                  value="true"
                  id="account-yes"
                  className="m-1"
                  onChange={(e) => {
                    handleRadioChange(e);
                    checkBankExistense();
                  }}
                />
                <label htmlFor="account-yes">Yes</label>

                {/* no option */}
                <input
                  type="radio"
                  name="hasBankAccount"
                  // @ts-ignore
                  value="false"
                  id="account-no"
                  className="m-1 ml-4"
                  onChange={(e) => {
                    handleRadioChange(e);
                    setBankFalse();
                  }}
                />
                <label htmlFor="account-no">No</label>
              </div>
              {bank === true && (
                <div>
                  {/* bank name */}
                  <label htmlFor="ID type" className="flex pt-3 pb-1">
                    Bank Name*
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        bankDetails: {
                          ...prevData?.bankDetails,
                          bankName: value,
                        },
                      }))
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
                        name="accountNumber"
                        // value={formData.account.slice(0, 8)}
                        onChange={handleChange}
                        placeholder="Enter account number"
                        className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.bankDetails?.accountNumber?.length === 0 ? (
                <p className="text-green-600 ml-1 invisible">i</p>
              ) : formData.bankDetails?.accountNumber?.length > 3 ? (
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
                {formData.bankDetails?.accountNumber?.length > 0 || bank === false ? (
                  <button
                    onClick={handleSubmit}
                    className="w-1/2 text-center text-white border-2 border-[#0D8A6A] rounded-lg py-2 mt-2 bg-[#0D8A6A]"
                  >
                    {loading ? (
                      <l-line-spinner
                        size="21"
                        stroke="3"
                        speed="1"
                        color="white"
                      ></l-line-spinner>
                    ) : (
                      "Continue"
                    )}
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
