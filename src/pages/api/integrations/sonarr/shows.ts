import type { NextApiRequest, NextApiResponse } from "next";
import { SonarrResponseType } from "./sonarr.types";
import { cacheApi } from "@/lib/services/api";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<SonarrResponseType>
) {
  const response = await cacheApi.get<SonarrResponseType>(
    "/integrations/sonarr/shows"
  );
  res.status(200).json(response.data);
}
