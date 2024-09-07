import type { NextApiRequest, NextApiResponse } from "next";
import { MovieResponseType } from "./radarr.types";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<MovieResponseType>
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RADARR_URL!}/api/v3/movie?apikey=${
      process.env.RADARR_KEY
    }`
  );

  const json = await response.json();
  return res.json({ movies: json });
}
