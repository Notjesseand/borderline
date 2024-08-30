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
import { authenticateFarmer } from "@/api/farmerAuth";
import { lineSpinner } from "ldrs";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useDialog } from "@/hooks/useDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { AlertDialogDemo } from "@/components/alert";

const Page = () => {
  if (typeof window !== "undefined") {
    lineSpinner.register();
  }

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
      bankName: "Kuda",
    },
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

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const data = localStorage.getItem("formData");
    let parsedFormData: any = {};
    if (data) {
      parsedFormData = JSON.parse(data);
    }
    setFormData(parsedFormData);
  }, []);

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event: any, index: number) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFormData((prevData) => {
        const updatedFarmDetails = prevData.farmDetails.map(
          (farmDetail, farmIndex) => {
            if (farmIndex === index) {
              const newDocUpload = { url: fileName };
              farmDetail.docUploads = [...farmDetail.docUploads, newDocUpload];
              return farmDetail;
            }
            return farmDetail;
          }
        );
        return { ...prevData, farmDetails: updatedFarmDetails };
      });
    } else {
      setFileName("No file chosen");
      setFormData((prevData) => {
        const updatedFarmDetails = prevData.farmDetails.map(
          (farmDetail, farmIndex) => {
            if (farmIndex === index) {
              farmDetail.docUploads = [
                ...farmDetail.docUploads,
                { url: "null" },
              ];
              return farmDetail;
            }
            return farmDetail;
          }
        );
        return { ...prevData, farmDetails: updatedFarmDetails };
      });
    }
  };

  const [cropAndMonths, setCropAndMonths] = useState([
    {
      cropId: "beans",
      farmSeasonStart: "January",
      farmSeasonEnd: "December",
    },
  ]);

  const handleAddCrop = () => {
    setCropAndMonths((prevCropAndMonths) => [
      ...prevCropAndMonths,
      {
        cropId: "",
        farmSeasonStart: "",
        farmSeasonEnd: "",
      },
    ]);
  };

  const handleCropChange = (index: number, cropId: string) => {
    setFormData((prevData: any) => {
      const updatedFarmDetails = prevData?.farmDetails?.map(
        (farmDetail: any, farmIndex: any) => {
          if (farmIndex === index) {
            const updatedCrops = [...farmDetail.crops, { name: cropId }];
            return { ...farmDetail, crops: updatedCrops };
          }
          return farmDetail;
        }
      );
      return { ...prevData, farmDetails: updatedFarmDetails };
    });
  };

  const handleStartMonthChange = (index: number, startMonth: string) => {
    setCropAndMonths((prevCropAndMonths) => {
      const updatedCropAndMonths = [...prevCropAndMonths];
      updatedCropAndMonths[index].farmSeasonStart = startMonth;
      return updatedCropAndMonths;
    });
  };

  const handleEndMonthChange = (index: number, endMonth: string) => {
    setCropAndMonths((prevCropAndMonths) => {
      const updatedCropAndMonths = [...prevCropAndMonths];
      updatedCropAndMonths[index].farmSeasonEnd = endMonth;
      return updatedCropAndMonths;
    });
  };

  // validation state
  const [validationState, setValidationState] = useState(false);

  // validate form
  const validate = () => {
    if (Array.isArray(formData?.farmDetails)) {
      let isValid = true;
      formData.farmDetails.forEach((farmDetail) => {
        const { name, long, lat, crops } = farmDetail;

        if (
          !name ||
          !long ||
          !lat ||
          !crops ||
          name.length === 0 ||
          long.toString().length === 0 ||
          lat.toString().length === 0 ||
          crops.toString().length === 0
        ) {
          isValid = false;
        }
      });

      setValidationState(isValid);
    } else {
      console.error("formData.farmDetails is not an array");
    }
  };

  // Run validation on formData change
  useEffect(() => {
    validate();
  }, [formData]);

  // update form data state
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    validate();

    let newValue;

    if (value === "true") {
      newValue = true;
    } else if (value === "false") {
      newValue = false;
    } else {
      newValue = value;
    }

    if (
      name === "name" ||
      name === "address" ||
      name === "long" ||
      name === "lat" ||
      name === "docUploads" ||
      name === "crops"
    ) {
      setFormData((prevData) => {
        const updatedFarmDetails = prevData?.farmDetails?.map((farmDetail) => {
          return { ...farmDetail, [name]: newValue };
        });
        return { ...prevData, farmDetails: updatedFarmDetails };
      });
    }
    if (name === "crops") {
      setFormData((prevFormData) => {
        const updatedFarmDetails = prevFormData.farmDetails.map(
          (farmDetail) => {
            return {
              ...farmDetail,
              crops: cropAndMonths,
            };
          }
        );
        return { ...prevFormData, farmDetails: updatedFarmDetails };
      });
      // } else {
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     [name]: newValue,
      //   }));
    }
  };

  interface Crops {
    _id: string;
    name: string;
  }

  // fetching crop IDs from the endpoint
  const [cropId, setCropId] = useState<Crops[]>([]);
  const getAllCrops = async () => {
    try {
      const response = await axios.get(
        "https://www.dev.farmwarehouse.ng/api/crops"
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getCrops = async () => {
    const data = await getAllCrops();
    setCropId(data.data.crops);
  };

  console.log(cropAndMonths)

  useEffect(() => {
    getCrops();
  }, []);

  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setLoading(true);
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { onOpen } = useDialog();
  // useEffect(() => {
  //   onOpen();
  // }, []);
  // funtion to submit form Data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toggle();
    // localStorage.removeItem("formData");
    localStorage.setItem("formData", JSON.stringify(formData));

    try {
      const farmer = await authenticateFarmer(formData);
      console.log("Farmer authenticated:", farmer);

      setLoading(false);
      setIsAuthenticated(true);
      // show alert when the user is authenticated
      onOpen();
    } catch (error) {
      console.log("Error during form submission:", error);
    }
  };

  // dropzone
  const onDrop = useCallback((acceptedFiles: any) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="text-base pb-12 relative">
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
              <Link href={"/login"} className="text-[#0A6C52]">
                {" "}
                Log in
              </Link>
            </p>
          </div>

          <div className="flex">
            <div className="w-10 mt-12 ml-8">
              <img
                src="Progress-3.png"
                alt=""
                className="flex justify-center h-auto w-auto"
              />
            </div>

            {/* personal information  */}
            <div className="w-[90%] sm:w-3/4 mx-auto pt-14">
              <p className="capitalize text-2xl font-semibold">
                create account
              </p>

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
                      <span className="italic hidden sm:block">
                        {" "}
                        {"(optional)"}
                      </span>
                    </label>
                    {/* longtitude*/}
                    <input
                      type="text"
                      name="long"
                      onChange={handleChange}
                      placeholder="Longtitude"
                      className="outline-none border-2 rounded-lg py-2 w-full px-1.5 placeholder:text-slate-500"
                    />
                  </div>
                  {/* latitude */}
                  <div className="w-1/2">
                    <label htmlFor="lat" className="flex pt-2 invisible">
                      Latitude*
                    </label>

                    <input
                      type="text"
                      placeholder="Latitude"
                      name="lat"
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
                      onValueChange={(value) => {
                        setFormData((prevData: any) => {
                          if (prevData.farmDetails) {
                            const updatedFarmDetails = [
                              ...prevData.farmDetails,
                            ];
                            const farmDetail = updatedFarmDetails[0]; // Access the first farmDetail object
                            if (!farmDetail?.crops) {
                              farmDetail.crops = [];
                            }
                            const lastCropIndex = farmDetail?.crops.length - 1;
                            if (lastCropIndex === -1) {
                              farmDetail?.crops.push({
                                cropId: value,
                                farmSeasonStart: "",
                                farmSeasonEnd: "",
                              });
                            } else {
                              farmDetail.crops[lastCropIndex].cropId = value;
                            }
                            return {
                              ...prevData,
                              farmDetails: updatedFarmDetails,
                            };
                          }
                        });
                      }}
                    >
                      <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                        <SelectValue placeholder="select crop" />
                      </SelectTrigger>
                      <SelectContent className="">
                        {cropId.map((crop, index) => (
                          <SelectItem key={index} value={crop._id}>
                            {crop.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* start/end months */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* start month */}
                      <div>
                        <label
                          htmlFor="farmSeasonStart"
                          className="mt-4 flex ml-1"
                        >
                          start month
                        </label>
                        {/* Start month form */}
                        <Select
                          onValueChange={(value) => {
                            setFormData((prevData: any) => {
                              if (prevData === null || prevData === undefined) {
                                // Handle the case where prevData is null or undefined
                                return {
                                  farmDetails: [
                                    { crops: [{ farmSeasonStart: value }] },
                                  ],
                                };
                              } else if (prevData.farmDetails) {
                                const updatedFarmDetails = [
                                  ...prevData.farmDetails,
                                ];
                                const farmDetail = updatedFarmDetails[0];
                                const lastCropIndex =
                                  farmDetail.crops.length - 1;
                                farmDetail.crops[
                                  lastCropIndex
                                ].farmSeasonStart = value;
                                return {
                                  ...prevData,
                                  farmDetails: updatedFarmDetails,
                                };
                              } else {
                                // Handle the case where farmDetails is undefined or null
                                return prevData;
                              }
                            });
                          }}
                        >
                          <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectItem value="January">January</SelectItem>
                            <SelectItem value="February">February</SelectItem>
                            <SelectItem value="March">March</SelectItem>
                            <SelectItem value="April">April</SelectItem>
                            <SelectItem value="May">May</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* end month */}
                      <div>
                        <label
                          htmlFor="farmSeasonEnd"
                          className="mt-4 flex ml-1"
                        >
                          end month{" "}
                        </label>
                        {/* end month form */}
                        <Select
                          onValueChange={(value) => {
                            setFormData((prevData: any) => {
                              if (prevData === null || prevData === undefined) {
                                // Handle the case where prevData is null or undefined
                                return {
                                  farmDetails: [
                                    { crops: [{ farmSeasonEnd: value }] },
                                  ],
                                };
                              } else if (prevData.farmDetails) {
                                const updatedFarmDetails = [
                                  ...prevData.farmDetails,
                                ];
                                const farmDetail = updatedFarmDetails[0];
                                if (farmDetail.crops) {
                                  const lastCropIndex =
                                    farmDetail.crops.length - 1;
                                  farmDetail.crops[
                                    lastCropIndex
                                  ].farmSeasonEnd = value;
                                } else {
                                  // Handle the case where farmDetail.crops is undefined or null
                                  farmDetail.crops = [{ farmSeasonEnd: value }];
                                }
                                return {
                                  ...prevData,
                                  farmDetails: updatedFarmDetails,
                                };
                              } else {
                                // Handle the case where farmDetails is undefined or null
                                return {
                                  ...prevData,
                                  farmDetails: [
                                    { crops: [{ farmSeasonEnd: value }] },
                                  ],
                                };
                              }
                            });
                          }}
                        >
                          <SelectTrigger className="w-full outline-none focus:outline-none ring-0 focus:ring-0">
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectItem value="January">January</SelectItem>
                            <SelectItem value="February">February</SelectItem>
                            <SelectItem value="March">March</SelectItem>
                            <SelectItem value="April">April</SelectItem>
                            <SelectItem value="May">May</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}

                {/* add another crop */}
                <button
                  onClick={handleAddCrop}
                  className="px-4 py-1 bg-[#E7F5F1] rounded-xl border-2 text-[#0A6C52] border-[#90D0BF] flex items-center gap-1 text-sm mt-4"
                >
                  <LuPlus className="text-base" /> Add another crop
                </button>

                {/*  */}
                <label htmlFor="drop" className="mt-4 flex ml-1">
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
                          <span className="text-[#0E9874]">
                            Click to upload
                          </span>{" "}
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
                    <button
                      onClick={handleSubmit}
                      className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#0E9874]"
                    >
                      {loading ? (
                        <l-line-spinner
                          size="21"
                          stroke="3"
                          speed="1"
                          color="white"
                        ></l-line-spinner>
                      ) : (
                        "Add Farm"
                      )}
                    </button>
                  ) : (
                    <button className="w-1/2 text-center text-white border-2 border-slate-400 rounded-lg py-2 mt-2 bg-[#90D0BF]">
                      Add Farm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <AlertDialogDemo />
      </div>
    </div>
  );
};

export default Page;
