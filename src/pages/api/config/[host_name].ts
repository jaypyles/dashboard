import type { NextApiRequest, NextApiResponse } from "next";
import { cacheApi } from "@/lib/services/api";

type ResponseData = {
  message?: string;
  storage?: string;
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { host_name } = req.query;
  try {
    const response = await cacheApi.get<ResponseData>(`/config/${host_name}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
