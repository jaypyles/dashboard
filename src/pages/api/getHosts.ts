import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../constants";

type ResponseData = {
  message: string;
};

const domain = Constants.DOMAIN;

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const response = await fetch(`${domain}/api/hosts`);
  const json = await response.json();
  res.status(200).json(json);
}
