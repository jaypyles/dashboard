import type { NextApiRequest, NextApiResponse } from "next";
import { RadarrResponseType } from "./sonarr.types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<RadarrResponseType>
) {
  const showResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SONARR_URL!}/api/v3/series?apikey=${
      process.env.SONARR_KEY
    }`
  );

  const showJson = await showResponse.json();

  return res.json({ shows: showJson });
}
