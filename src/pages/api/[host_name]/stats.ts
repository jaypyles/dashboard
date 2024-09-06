import type { NextApiRequest, NextApiResponse } from "next";
import Constants from "../../../constants";

type ResponseData = {
  message?: string;
  storage?: string;
  [key: string]: any;
};

const domain = Constants.DOMAIN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { host_name } = req.query;
    const data = req.body;

    console.log(`data: ${JSON.stringify(data)}`);

    if (!data?.paths || data.paths.length === 0) {
      return res
        .status(400)
        .json({ message: "No paths provided in the request body" });
    }

    const paths = data.paths;

    const response = await fetch(`${domain}/api/${host_name}/stats`);
    const json = await response.json();

    console.log(json);

    const uptimeRegex = new RegExp(`(\\d+\\s+days,\\s+(?:\\d+:\\d+|\\d+))`);
    const uptimeMatch = json.uptime.match(uptimeRegex);

    json.uptime = `${uptimeMatch[1]} min`;

    let storage: object[] = [];

    paths.forEach((path: string) => {
      const storageSizeRegex = new RegExp(
        `^(\\/\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(${path})$`,
        "m"
      );

      const match = json.storage.match(storageSizeRegex);

      if (match) {
        const storageParts = {
          mountedOn: path,
          size: match[2],
          used: match[3],
          available: match[4],
          usePercent: match[5],
        };

        storage.push(storageParts);
      }
    });

    json.storage = storage;
    console.log(json.storage);

    res.status(200).json(json);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
