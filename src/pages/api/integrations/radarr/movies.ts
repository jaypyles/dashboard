import type { NextApiRequest, NextApiResponse } from "next";
import { MovieResponseType } from "./radarr.types";
import Constants from "../../../../constants";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<MovieResponseType>
) {
  const response = await fetch(
    `${Constants.DOMAIN}/api/integrations/radarr/movies`
  );
  const json = await response.json();

  return res.json(json);
}
