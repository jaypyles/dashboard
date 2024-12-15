import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/services/api";
import { TransferInfoResponseType } from "./qbittorrent.types";

function formatBytes(bytes: number) {
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
  if (bytes === 0) return "0 B/s";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

export type ApiTransferInfoResponseType = {
  up_info_speed: number;
  dl_info_speed: number;
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<TransferInfoResponseType>
) {
  const response = await api.get<ApiTransferInfoResponseType>(
    "/integrations/transfer_info"
  );
  res.status(200).json({
    transferInfo: {
      uploadSpeed: formatBytes(response.data.up_info_speed),
      downloadSpeed: formatBytes(response.data.dl_info_speed),
    },
  });
}
