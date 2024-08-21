import React, { useState } from "react";

// const useFormStorage = () => {
//   // const [formData, setFormData] = React.useState({});

//   const [formData, setFormData] = useState({
//     userDetails: {
//       firstName: "",
//       lastName: "",
//       credential: "",
//       email: "",
//       password: "",
//       roleName: "farmer",
//       gender: "",
//       resAddress: "",
//       ageGroup: "",
//       hasBankAccount: false,
//       hasSmartphone: true,
//       profilePic: {
//         url: "img.jpg",
//       },
//     },
//     siteId: "",
//     idUpload: {
//       idType: "",
//       idNumber: "", // <--- Move this property here
//       url: "",
//     },
//     bankDetails: {}, // optional, only send if hasBankAccount is true
//     farmDetails: [
//       {
//         name: "",
//         address: "",
//         long: 0,
//         lat: 0,
//         docUploads: [
//           {
//             url: "",
//           },
//         ],
//         crops: [
//           {
//             cropId: "",
//             farmSeasonStart: "",
//             farmSeasonEnd: "",
//           },
//         ],
//       },
//     ],
//   });

//   const updateFormData = (newData) => {
//     setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
//     localStorage.setItem(
//       "formData",
//       JSON.stringify({ ...prevFormData, ...newData })
//     );
//   };

//   React.useEffect(() => {
//     const storedFormData = localStorage.getItem("formData");
//     if (storedFormData) {
//       setFormData(JSON.parse(storedFormData));
//     }
//   }, []);

//   const clearFormData = () => {
//     setFormData({});
//     localStorage.removeItem("formData");
//   };

//   return [formData, updateFormData, clearFormData, setFormData];
// };

// export default useFormStorage;

const useFormStorage = () => {
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
      idNumber: "", // <--- Move this property here
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
            url: "",
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

  const updateFormData = (newData:any) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...prevFormData, ...newData })
    );
  };

  React.useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const clearFormData = () => {
    setFormData({});
    localStorage.removeItem("formData");
  };

  return [formData, updateFormData, clearFormData, setFormData];
};

export default useFormStorage;
