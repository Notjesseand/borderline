// pages/api/proxy.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const url = "https://www.dev.farmwarehouse.ng/api/users/signup";

  try {
    // Make the request to the external API
    const externalRes = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body), // Pass the request body to the external API
    });

    const data = await externalRes.json();

    // Send back the data from the external API
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
