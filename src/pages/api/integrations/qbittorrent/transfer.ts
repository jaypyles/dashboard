import type { NextApiRequest, NextApiResponse } from "next";
import api from "qbittorrent-api-v2";
import { TransferInfoResponseType } from "./qbittorrent.types";
import Constants from "../../../../constants";

function formatBytes(bytes: number) {
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
  if (bytes === 0) return "0 B/s";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<TransferInfoResponseType>
) {
  const response = await fetch(
    `${Constants.DOMAIN}/api/integrations/transfer_info`
  );
  const json = await response.json();
  return res.json({
    transferInfo: {
      uploadSpeed: formatBytes(json.up_info_speed),
      downloadSpeed: formatBytes(json.dl_info_speed),
    },
  });
}
