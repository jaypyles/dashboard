import { TransferInfoResponseType } from "../../../../pages/api/integrations/qbittorrent/qbittorrent.types";

export const getTransferInfo = async (): Promise<TransferInfoResponseType> => {
  const response = await fetch("/api/integrations/qbittorrent/transfer", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transfer info: ${response.status}`);
  }

  return await response.json();
};
