import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/services/api";

type ResponseData = {
  message?: string;
  storage?: string;
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const body = JSON.parse(req.body);
    const response = await api.post<ResponseData>(
      `/config`,
      {
        filename: body.host.name,
        config: body,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
