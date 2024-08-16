"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ParticlesDemo from "@/components/home/particles";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { LuUpload } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuUploadCloud } from "react-icons/lu";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  // all form data
  const [formData, setFormData] = useState({
    name: "",
    crop: "",
    longtitude: "",
    latitude: "",
    start_month: "",
    end_month: "",
    image: null,
  });

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData({ ...formData, image: file }); // Store the file in formData
    } else {
      setFileName("No file chosen");
      setFormData({ ...formData, image: null }); // Reset the image field if no file is chosen
    }
  };

  // add another crop
  const [cropAndMonths, setCropAndMonths] = useState([
    { crop: "beans", start: "January", end: "December" },
  ]);

  const [newCropData, setNewCropData] = useState([
    { crop: "", start: "January", end: "December" },
  ]);
  const addData = (newCropData: any) => {
    setCropAndMonths((prevCropAndMonths) => [
      ...prevCropAndMonths,
      newCropData,
    ]);
  };

  // validation state
  const [validationState, setValidationState] = useState(false);

  // validate form
  const validate = () => {
    const { name, longtitude, latitude, crop, start_month, end_month } =
      formData;

    name.length > 0 &&
    longtitude.length > 0 &&
    latitude.length > 0 &&
    crop.length > 0 &&
    start_month.length > 0 &&
    end_month.length > 0
      ? setValidationState(true)
      : setValidationState(false);

    console.log(validationState);
  };

  // Run validation on formData change
  useEffect(() => {
    validate();
  }, [formData]);

  // update form data state
  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // dropzone
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="font-poppins text-base pb-12 relative">
      <div className="grid lg:grid-cols-2 relative">
        {/* banner */}

        <div className="h-screen w-1/2 bg-[#F5F0EC] hidden lg:flex items-center lg:fixed inset-0">
          <img src="/cow.png" alt="" className="h-[90%] mx-auto flex" />
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
            <p className="text-lg my-2 capitalize">Farm Registration</p>
            {/* form */}
            <div className="mt-5 text-[15px]">
              <div className="flex w-full justify-between gap-2 text-[15px]">
                <div className="w-full">
                  <label htmlFor="farm_name" className="flex pt-2">
                    Farm Name*
                  </label>
                  {/* farm name */}
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Enter farm name"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* farm co-ordinates */}
              <div className="flex w-full justify-between gap-2 text-[15px]">
                <div className="w-1/2">
                  <label htmlFor="farm_coordinates" className="flex pt-2">
                    Farm Coordinates
                    <span className="italic hidden sm:block"> {"(optional)"}</span>
                  </label>
                  {/* longtitude*/}
                  <input
                    type="text"
                    name="longtitude"
                    onChange={handleChange}
                    placeholder="Longtitude"
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
                {/* latitude */}
                <div className="w-1/2">
                  <label htmlFor="latitude" className="flex pt-2 invisible">
                    Latitude*
                  </label>

                  <input
                    type="text"
                    placeholder="Latitude"
                    name="latitude"
                    onChange={handleChange}
                    className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                  />
                </div>
              </div>

              <p className="text-slate-500">
                Ex: Longitude: 8.6753° E. Latitude: 9.0820° N
              </p>

              {/* crops cultivated and planting season */}
              <p className="mt-3">Crops cultivated and planting season </p>

              {/* card */}
              {cropAndMonths.map((item: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg bg-[#F9FAFB] py-4 px-5 mt-3 relative"
                >
                  <label htmlFor="cultivated_crop">
                    What crop do you cultivate on this farm?
                  </label>
                  {/* Crop cultivated on the farm */}
                  <Select
                    onValueChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        crop: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                      <SelectValue placeholder="select crop" />
                    </SelectTrigger>
                    <SelectContent className="font-custom">
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Beans">Beans</SelectItem>
                      <SelectItem value="Garri">Garri</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* start/end months */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* start month */}
                    <div>
                      <label htmlFor="start_month" className="mt-4 flex ml-1">
                        start month
                      </label>
                      {/* Start month form */}
                      <Select
                        onValueChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            start_month: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent className="font-custom">
                          <SelectItem value="NIN">January</SelectItem>
                          <SelectItem value="voters card">February</SelectItem>
                          <SelectItem value="passport">March</SelectItem>
                          <SelectItem value="passport">April</SelectItem>
                          <SelectItem value="passport">May</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* end month */}
                    <div>
                      <label htmlFor="start_month" className="mt-4 flex ml-1">
                        end month{" "}
                      </label>
                      {/* end month form */}
                      <Select
                        onValueChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            end_month: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent className="font-custom">
                          <SelectItem value="NIN">January</SelectItem>
                          <SelectItem value="voters card">February</SelectItem>
                          <SelectItem value="passport">March</SelectItem>
                          <SelectItem value="passport">April</SelectItem>
                          <SelectItem value="passport">May</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              {/* add another crop */}
              <button
                onClick={addData}
                className="px-4 py-1 bg-[#E7F5F1] rounded-xl border-2 text-[#0A6C52] border-[#90D0BF] flex items-center gap-1 text-sm mt-4"
              >
                <LuPlus className="text-base" /> Add another crop
              </button>

              {/*  */}
              <label htmlFor="start_month" className="mt-4 flex ml-1">
                Upload farm documents
              </label>
              {/* drag and drop file */}
              <div className="rounded-lg border-[#EAECF0] border-2 py-4 px-5 mt-3 relative cursor-pointer">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <div>
                      <LuUploadCloud className="border-2 rounded-lg text-4xl p-1 border-[#d5d7da] flex mx-auto mt-3" />
                      <p className="w-2/3 mx-auto text-center mt-5">
                        <span className="text-[#0E9874]">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="w-2/3 mx-auto text-center text-[14px] text-slate-500">
                        PNG, JPG or PDF {"(max. 10MB)"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* back / submit */}
              <div className="mt-12 gap-x-4 flex">
                <button className="w-1/2 text-center border-2 border-slate-400 rounded-lg py-2 mt-2">
                  Back
                </button>
                {validationState == true ? (
                  <button className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#0E9874]">
                    Add Farm
                  </button>
                ) : (
                  <button className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#90D0BF]">
                    Add Farm
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
