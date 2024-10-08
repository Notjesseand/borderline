import axios from "axios";

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