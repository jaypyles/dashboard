import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../constants";

type ResponseData = {
  message: string;
};

const domain = Constants.DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { host_name } = req.query;
  const response = await fetch(`${domain}/api/${host_name}/stats`);
  const json = await response.json();
  res.status(200).json(json);
}
