import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../../constants";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    `${Constants.DOMAIN}/api/integrations/jellyfin/media_count`
  );

  console.log(response);
  const json = await response.json();
  console.log(json);
  return res.json(json);
}
