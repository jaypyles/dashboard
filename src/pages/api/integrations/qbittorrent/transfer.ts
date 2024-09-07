import type { NextApiRequest, NextApiResponse } from "next";
import api from "qbittorrent-api-v2";
import { TransferInfoResponseType } from "./qbittorrent.types";

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
  api
    .connect(
      process.env.NEXT_PUBLIC_QB_URL!,
      process.env.QB_USER!,
      process.env.QB_PASS!
    )
    .then((qbt) => {
      qbt
        .transferInfo()
        .then((info) => {
          return res.json({
            transferInfo: {
              uploadSpeed: formatBytes(info.up_info_speed),
              downloadSpeed: formatBytes(info.dl_info_speed),
            },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
