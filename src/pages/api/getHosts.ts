import type { NextApiRequest, NextApiResponse } from "next";
import { cacheApi } from "@/lib/services/api";

type ResponseData = {
  message: string;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response = await cacheApi.get<ResponseData>("/hosts");
  res.status(200).json(response.data);
}
