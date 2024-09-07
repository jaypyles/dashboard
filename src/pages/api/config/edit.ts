import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../constants";

type ResponseData = {
  message?: string;
  storage?: string;
  [key: string]: any;
};

const domain = Constants.DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const body = JSON.parse(req.body);
    const response = await fetch(`${domain}/api/config`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: body.host.name,
        config: body,
      }),
    });

    const json = await response.json();
    res.status(200).json(json);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}