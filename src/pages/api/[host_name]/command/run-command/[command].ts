import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../../../constants";

type ResponseData = {
  message?: string;
  storage?: string;
  [key: string]: any;
};

const domain = Constants.DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { host_name, command } = req.query;

  try {
    const response = await fetch(
      `${domain}/api/${host_name}/run-command/${command}`,
    );
    const json = await response.json();
    res.status(200).json({ stdout: json[0], stderr: json[1] });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
