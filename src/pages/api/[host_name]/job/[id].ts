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
  const { host_name, id } = req.query;
  try {
    const response = await api.delete<ResponseData>(`/${host_name}/job/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
