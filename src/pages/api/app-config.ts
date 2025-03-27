import type { NextApiRequest, NextApiResponse } from "next";
import { cacheApi } from "@/lib/services/api";
import { ServerAppConfig } from "@/lib/services/app-config/app-config.types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ServerAppConfig>
) {
  const response = await cacheApi.get<ServerAppConfig>("/app-config");
  res.status(200).json(response.data);
}
