import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/services/api";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const response = await api.get("/integrations");
  const json = await response.data;

  console.log(json);

  return res.json(json);
}
