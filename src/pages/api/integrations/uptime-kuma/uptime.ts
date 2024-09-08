import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../../constants";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`${Constants.DOMAIN}/api/integrations/uptime`);
  const json = await response.json();

  return res.json({ uptime: json });
}
