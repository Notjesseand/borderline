// import axios from "axios";

// export const authenticateFarmer = async (formData: any) => {
//   const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

//   try {
//     // Make the POST request
//     // const response = await axios.post(url, formData);

//     const response = await axios.post(
//       "https://www.dev.farmwarehouse.ng/api/users/signup",
//       formData,
//       {
//         withCredentials: true,
//       }
//     );

//     // Extract and return the data
//     const data = response.data;
//     return data.results;
//   } catch (error) {
//     console.log("Error adding data:", error);
//     throw error;
//   }
// };




export const authenticateFarmer = async (formData: any) => {
  const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

  try {
    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      credentials: "include", // equivalent to withCredentials: true
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Extract and return the data
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error adding data:", error);
    throw error;
  }
};





// export const authenticateFarmer = async (formData: any) => {
//   try {
//     // Make the POST request using fetch
//     const response = await fetch("/api/users/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json", // Set the content type to JSON
//       },
//       body: JSON.stringify(formData), // Convert formData to JSON string
//     });

//     // Check if the response status is okay
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Parse the response as JSON
//     const data = await response.json();

//     // Return the desired data
//     return data.results;
//   } catch (error) {
//     console.log("Error adding data:", error);
//     throw error;
//   }
// };
