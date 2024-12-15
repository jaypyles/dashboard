import type { NextApiRequest, NextApiResponse } from "next";
import { RadarrResponseType } from "./sonarr.types";
import { cacheApi } from "@/lib/services/api";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<RadarrResponseType>
) {
  const response = await cacheApi.get<RadarrResponseType>(
    "/integrations/sonarr/shows"
  );
  res.status(200).json(response.data);
}
