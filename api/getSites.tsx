import axios from "axios";

export const getAllSites = async () => {
  const url = "https://www.dev.farmwarehouse.ng/api/sites";

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error fetching sites:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
    } else if (error.request) {
      console.error("Error sending request:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};
