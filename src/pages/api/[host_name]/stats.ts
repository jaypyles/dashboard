import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/services/api";

type ResponseData = {
  message?: string;
  storage?: string | object[];
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { host_name } = req.query;

    const response = await api.get<ResponseData>(`/${host_name}/stats`);
    const json = await response.data;
    const paths = json.storage_paths || [];
    const uptimeRegex = new RegExp(`(\\d+\\s+days,\\s+(?:\\d+:\\d+|\\d+))`);

    if (json.uptime) {
      const uptimeMatch = json.uptime.match(uptimeRegex);

      if (uptimeMatch) {
        json.uptime = `${uptimeMatch[1]} min`;
      }
    }

    const storage: object[] = [];

    paths.forEach((path: string) => {
      const storageSizeRegex = new RegExp(
        `^(\\/\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(\\S+)\\s+(${path})$`,
        "m"
      );

      if (typeof json.storage === "string") {
        const match = json.storage.match(storageSizeRegex);

        if (match) {
          const storageParts = {
            mountedOn: path,
            size: match[2],
            used: match[3],
            available: match[4],
            usePercent: Number(match[5]?.replace("%", "")),
          };

          storage.push(storageParts);
        }
      }
    });

    json.storage = storage;

    const ramParts = json.ram_usage.split("\n");
    json.ram_usage = `${(
      (Number(ramParts[0]) / Number(ramParts[1])) *
      100
    ).toFixed(2)}%`;
    json.usage = Number(json.usage.replace("%", ""));

    res.status(200).json(json);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
