import type { NextApiRequest, NextApiResponse } from "next";
import { cacheApi } from "@/lib/services/api";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const response = await cacheApi.get("/integrations/uptime");
  res.status(200).json({ uptime: response.data });
}
