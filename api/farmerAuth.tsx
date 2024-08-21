import axios from "axios";

// export const authenticateFarmer = async (formData: any) => {
//   const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

//   try {
//     const response = await axios.post(url, formData);
//     console.log("data added successfully");
//   } catch (error: any) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Error adding data:", error.response.data);
//       console.error("Error status:", error.response.status);
//       console.error("Error headers:", error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("Error sending request:", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error setting up request:", error.message);
//     }
//   }
// };

export const authenticateFarmer = async (formData: any) => {
  const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

  try {
    const response = await axios.post(url, formData);
    console.log("data added successfully");
  } catch (error: any) {
    if (error.response) {
      console.error("Error adding data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error sending request:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};