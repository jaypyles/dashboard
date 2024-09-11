import type { NextApiRequest, NextApiResponse } from "next";
import { RadarrResponseType } from "./sonarr.types";
import Constants from "../../../../constants";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<RadarrResponseType>
) {
  const response = await fetch(
    `${Constants.DOMAIN}/api/integrations/sonarr/shows`
  );
  const json = await response.json();

  return res.json(json);
}
