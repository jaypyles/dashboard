import type { NextApiRequest, NextApiResponse } from "next";
import { MovieResponseType } from "./radarr.types";
import { cacheApi } from "@/lib/services/api";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<MovieResponseType>
) {
  const response = await cacheApi.get<MovieResponseType>(
    "/integrations/radarr/movies"
  );

  res.status(200).json(response.data);
}
