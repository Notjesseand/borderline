"use client";
import React, { useState, useEffect } from "react";
import ParticlesDemo from "@/components/home/particles";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { LuUpload } from "react-icons/lu";
import Link from "next/link";
import axios from "axios";
import { authenticateFarmer } from "@/api/farmerAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const Page = () => {
  const [error, setError] = useState("");
  // all form data
  const [formData, setFormData] = useState({
    userDetails: {
      firstName: "",
      lastName: "",
      credential: "",
      email: "",
      password: "",
      roleName: "farmer",
      gender: "",
      resAddress: "",
      ageGroup: "",
      hasBankAccount: false,
      hasSmartphone: true,
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
    bankDetails: {}, // optional, only send if hasBankAccount is true
    farmDetails: [
      {
        name: "",
        address: "",
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

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData({
        ...formData,
        userDetails: { ...formData.userDetails, profilePic: { url: fileName } },
      }); // Store the file in formData
    } else {
      setFileName("No file chosen");
      setFormData({
        ...formData,
        userDetails: { ...formData.userDetails, profilePic: { url: "null" } },
      }); // Reset the image field if no file is chosen
    }
  };

  // Regular expression to check if there's at least one special character
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = () => {
    const { password } = formData.userDetails;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
    }
  };

  // validate all form fields
  const [validationState, setValidationState] = useState(false);

  // validate form
  const validate = () => {
    const { firstName, lastName, password } = formData.userDetails;

    const isValid =
      firstName.length > 0 &&
      lastName.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0;

    setValidationState(isValid);
  };

  // Run validation on formData change
  useEffect(() => {
    validate();
    validatePassword();
  }, [formData]);

  // update form data state
  // const handleChange = (event: any) => {
  //   const { name, value } = event?.target;
  //   if (name === "siteId") {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       siteId: value,
  //     }));
  //   } else if (name === "idNumber") {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       idUpload: { ...prevData.idUpload, idNumber: value },
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       userDetails: {
  //         ...prevData.userDetails,
  //         [name]: value,
  //       },
  //     }));
  //   }
  // };

  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    if (name === "siteId") {
      setFormData((prevData) => ({
        ...prevData,
        siteId: value,
      }));
    } else if (name === "idNumber") {
      setFormData((prevData) => ({
        ...prevData,
        idUpload: { ...prevData.idUpload, idNumber: value },
      }));
    } else if (name === "resAddress") {
      setFormData((prevData) => ({
        ...prevData,
        userDetails: { ...prevData.userDetails, [name]: value },
        farmDetails: [{ ...prevData.farmDetails[0], address: value }],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        userDetails: {
          ...prevData.userDetails,
          [name]: value,
        },
      }));
    }
  };

  // set formData to storage to enable access in other form pages
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      router.push("/bank");
    }, 2000);
    localStorage.setItem("formData", JSON.stringify(formData));
  };

  // funtion to submit form Data
  // set formData to storage to enable access in other form pages
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   // try {
  //   //   const farmer = await authenticateFarmer(formData);
  //   //   console.log("Farmer authenticated:", farmer);
  //   // } catch (error) {
  //   //   console.log("Error during form submission:", error);
  //   // }

  //   localStorage.setItem("formData", JSON.stringify(formData));
  // };

  return (
    <div className="font-poppins text-base pb-12">
      <div className="grid lg:grid-cols-2 relative">
        {/* banner */}

        <div className="h-screen w-1/2 bg-[#F5F0EC] hidden lg:flex items-center lg:fixed inset-0">
          <img src="/bg-image.png" alt="" className="h-[90%] mx-auto flex" />
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
            <p>
              Already have an account?
              <Link href={""} className="text-[#0A6C52]">
                {" "}
                Log in
              </Link>
            </p>
          </div>

          {/* personal information  */}
          <div className="w-[90%] sm:w-3/4 mx-auto pt-14">
            <p className="capitalize text-2xl font-semibold">create account</p>
            <p className="text-lg my-2 capitalize">personal information</p>
            {/* form */}
            <div className="mt-5 text-[15px]">
              <div className="flex w-full justify-between gap-2 text-[15px]">
                <div className="w-1/2">
                  <label htmlFor="first_name" className="flex pt-2">
                    First Name*
                  </label>
                  {/* first name */}
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
                {/* last name */}
                <div className="w-1/2">
                  <label htmlFor="last_name" className="flex pt-2">
                    Last Name*
                  </label>

                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    onChange={handleChange}
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>
              {/* phone number */}
              <label htmlFor="credential" className="flex pt-3 text-[15px]">
                Phone Number*
              </label>
              <div className="flex w-full justify-between gap-3 text-[15px] mt-1 items-center">
                <div className="w-1/6 mr-5">
                  {/* country code */}
                  <Select>
                    <SelectTrigger className="w-[80px] outline-none ring-0">
                      <SelectValue placeholder="+234" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">+234</SelectItem>
                      <SelectItem value="dark">+1</SelectItem>
                      <SelectItem value="system">+44</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* phone number */}
                <div className="sm:w-full flex flex-grow">
                  <input
                    type="tel"
                    name="credential"
                    onChange={handleChange}
                    placeholder="000 0000 000"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>
              {/* email address */}
              <div className="flex w-full justify-between gap-2 text-[15px]">
                <div className="w-full">
                  <label htmlFor="email" className="flex pt-3">
                    Email address{"(optional)"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>
              {/* age and gender */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="ageGroup" className="flex pt-3">
                    Age*
                  </label>
                  <input
                    type="number"
                    name="ageGroup"
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>

                {/* gender */}
                <div>
                  <label htmlFor="age" className="flex pt-3">
                    Choose Gender*
                  </label>

                  <div className="flex items-center">
                    {/* Male option */}
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                      className="m-1"
                      onChange={handleChange}
                      checked={formData.userDetails.gender === "male"}
                    />
                    <label htmlFor="male">Male</label>

                    {/* Female option */}
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                      className="m-1 ml-3"
                      onChange={handleChange}
                      checked={formData.userDetails.gender === "female"}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>
              {/* residential address */}
              <div className="w-full">
                <label htmlFor="resAddress" className="flex pt-3">
                  Residential Address*
                </label>
                <input
                  type="text"
                  name="resAddress"
                  onChange={handleChange}
                  placeholder="Ex: No 21 Agaro road, Abeokuta."
                  className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                />
              </div>
              {/* site */}
              <div className="w-full">
                <label htmlFor="site" className="flex pt-3">
                  Site*
                </label>
                <input
                  type="text"
                  name="siteId"
                  onChange={handleChange}
                  placeholder="Select site"
                  className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                />
              </div>
              {/* ID type */}
              <label htmlFor="ID type" className="flex pt-3">
                ID Type*
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData((prevData) => ({ ...prevData, idUpload: {...prevData.idUpload, idType: value} }))
                }
              >
                <SelectTrigger className="w-full outline-none ring-0">
                  <SelectValue placeholder="select ID type" />
                </SelectTrigger>
                <SelectContent className="font-custom">
                  <SelectItem value="NIN">National ID card (NIN)</SelectItem>
                  <SelectItem value="voters card">Voters Card</SelectItem>
                  <SelectItem value="passport">
                    International Passport
                  </SelectItem>
                </SelectContent>
              </Select>
              {/* ID number */}
              <label htmlFor="ID Number" className="flex pt-3">
                ID Number*
              </label>
              <input
                type="number"
                name="idNumber"
                onChange={handleChange}
                placeholder="Enter your ID number"
                className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
              />
              {/* upload ID document */}
              <label htmlFor="ID Document" className="flex pt-3">
                Upload ID document*
              </label>
              {/* <input type="file" name="ID" id="" className="py-2" /> */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative inline-block">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer border-2  text- px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-x-1"
                  >
                    <LuUpload />
                    Choose a file
                  </label>

                  <input
                    id="file-upload"
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                </div>
                <span className="text-gray-500 italic">{fileName}</span>
              </div>{" "}
              {/* create password */}
              <label htmlFor="password" className="flex pt-3">
                Create password
              </label>
              <input
                type="password"
                name="password"
                value={formData.userDetails.password}
                onChange={handleChange}
                className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
              />
              {/* confirm password */}
              <label htmlFor="confirm_password" className="flex pt-3">
                Confirm password
              </label>
              {/* <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={confirmPassword}
                className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
              /> */}
              {error && confirmPassword.length > 0 && (
                <p className="text-red-500">{error}</p>
              )}
              {/* password length check */}
              <p
                className="text-sm font-montserrat mt-2 flex items-center gap-2 text-slate-500"
                style={{
                  color:
                    formData.userDetails.password.length === 0
                      ? ""
                      : formData.userDetails.password.length < 8
                      ? "red"
                      : "green",
                }}
              >
                <GrStatusGood className="text-lg" /> must be at least 8
                characters long
              </p>
              {/* password special char check */}
              <p
                className="text-sm font-montserrat mt-2 flex items-center gap-2 text-slate-500"
                style={{
                  color:
                    formData.userDetails.password.length === 0
                      ? ""
                      : specialCharRegex.test(formData.userDetails.password)
                      ? "green"
                      : "red",
                }}
              >
                <GrStatusGood className="text-lg" />
                must contain one special character
              </p>
              {/* upload profile picture */}
              <div className="">
                <div className="">
                  <label htmlFor="password" className="flex pt-3">
                    Upload profile picture{" "}
                    <span className="italic">{"(Optional)"}</span>
                  </label>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="p-1 bg-slate-100 justify-center rounded-full aspect-square items-center h-11 flex border border-slate-300">
                    {formData?.userDetails.profilePic.url ? (
                      <img
                        // @ts-ignore
                        src={formData?.image?.name}
                        alt=""
                        className="rounded-full flex w-full aspect-square"
                      />
                    ) : (
                      <IoPersonOutline className="text-2xl text-slate-700" />
                    )}
                  </div>
                  <div className="relative inline-block">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer border-2  text- px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-x-1"
                    >
                      <LuUpload />
                      Choose a file
                    </label>

                    <input
                      id="file-upload"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                  </div>
                  <span className="text-gray-500 italic">{fileName}</span>
                </div>{" "}
                <p className="mt-2 text-slate-500">PNG or JPG {"(max. 5MB)"}</p>
                {/* {formData.image} */}
                {/* @ts-ignore */}
                {formData.userDetails.image?.name}
              </div>
              {/* back / submit */}
              <div className="mt-12 gap-x-4 flex">
                <button className="w-1/2 text-center border-2 border-slate-400 rounded-lg py-2 mt-2">
                  Back
                </button>
                {validationState == true ? (
                  <button
                    onClick={handleSubmit}
                    className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#0E9874]"
                  >
                    Continue
                  </button>
                ) : (
                  // <button className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#90D0BF]">
                  //   Continue
                  // </button>
                  <button
                    onClick={handleSubmit}
                    className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#0E9874]"
                  >
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
