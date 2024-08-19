// export const authenticateFarmer = async (formData: any) => {
//   const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

//   try {
//     // Make the POST request
//     const response = await fetch(url, {
//       method: "POST",
//       mode: "no-cors",
//       credentials: "include",
//       body: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // Check if the response was successful
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Extract and return the data
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.log("Error adding data:", error);
//     throw error;
//   }
// };

import axios from "axios";

export const authenticateFarmer = async (formData: any) => {
  const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

  try {
    const response = await axios.post(url, formData);
    console.log("data added successfully");
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error adding data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error sending request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
  }
};
