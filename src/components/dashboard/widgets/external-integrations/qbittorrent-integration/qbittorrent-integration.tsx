import React from "react";
import Integration from "../../../../shared/integration/integration";
import { TransferInfoResponseType } from "../../../../../pages/api/integrations/qbittorrent/qbittorrent.types";

type QbittorrentIntegrationProps = {
  data: TransferInfoResponseType;
  url: string;
};

export const QbittorrentIntegration = ({
  data,
  url,
}: QbittorrentIntegrationProps) => {
  return (
    <Integration
      title="qbittorrent"
      data={[
        `Upload: ${data.transferInfo?.uploadSpeed}`,
        `Download: ${data.transferInfo?.downloadSpeed}`,
      ]}
      icon="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/New_qBittorrent_Logo.svg/1200px-New_qBittorrent_Logo.svg.png"
      link={url}
    />
  );
};
