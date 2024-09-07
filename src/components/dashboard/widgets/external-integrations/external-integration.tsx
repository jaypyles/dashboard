import { useState, useEffect } from "react";
import { JellyfinData } from "../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import { JellyfinIntegration } from "./jellyfin-integration/jellyfin-integration";
import { apiCaller } from "../../../../lib/services/api-caller/api-caller";
import { QbittorrentData } from "../../../../lib/services/external-integrations/qbittorrent/qbittorrent.types";
import { QbittorrentIntegration } from "./qbittorrent-integration/qbittorrent-integration";
import { RadarrIntegration } from "./radarr-integration/radarr-integration";
import { RadarrData } from "../../../../lib/services/external-integrations/radarr/radarr.types";
import { SonarrData } from "../../../../lib/services/external-integrations/sonarr/sonarr.types";
import { SonarrIntegration } from "./sonarr-integration/sonarr-integration";

type Integration = "jellyfin" | "qbittorrent" | "radarr" | "sonarr";

type IntegrationPropsMap = {
  jellyfin: JellyfinData;
  qbittorrent: QbittorrentData;
  radarr: RadarrData;
  sonarr: SonarrData;
};

type ExternalIntegrationProps<T extends Integration> = {
  integration: T;
};

const integrations: {
  [K in Integration]: React.FC<{ data: IntegrationPropsMap[K] }>;
} = {
  jellyfin: JellyfinIntegration,
  qbittorrent: QbittorrentIntegration,
  radarr: RadarrIntegration,
  sonarr: SonarrIntegration,
};

export const ExternalIntegration = <T extends Integration>({
  integration,
}: ExternalIntegrationProps<T>) => {
  const Component = integrations[integration] as React.FC<{
    data: IntegrationPropsMap[T];
  }>;

  // Initialize state for apiData
  const [apiData, setApiData] = useState<IntegrationPropsMap[T] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = (await apiCaller[integration]()) as IntegrationPropsMap[T];
        setApiData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, []);

  return apiData ? <Component data={apiData} /> : <div>Loading...</div>;
};
