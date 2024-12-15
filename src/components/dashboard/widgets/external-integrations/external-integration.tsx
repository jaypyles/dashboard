import { useState, useEffect } from "react";
import { JellyfinData } from "../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import { JellyfinIntegration } from "./jellyfin-integration/jellyfin-integration";
import { IntegrationLoader } from "../../widgets/skeletons";
import { apiCaller } from "../../../../lib/services/api-caller/api-caller";
import { QbittorrentData } from "../../../../lib/services/external-integrations/qbittorrent/qbittorrent.types";
import { QbittorrentIntegration } from "./qbittorrent-integration/qbittorrent-integration";
import { RadarrIntegration } from "./radarr-integration/radarr-integration";
import { RadarrData } from "../../../../lib/services/external-integrations/radarr/radarr.types";
import { SonarrData } from "../../../../lib/services/external-integrations/sonarr/sonarr.types";
import { SonarrIntegration } from "./sonarr-integration/sonarr-integration";
import { UptimeKumaData } from "../../../../lib/services/external-integrations/uptime-kuma/uptime-kuma.types";
import { UptimeKumaIntegration } from "./uptime-kuma-integration/uptime-kuma-integration";

export type Integration =
  | "jellyfin"
  | "qbittorrent"
  | "radarr"
  | "sonarr"
  | "kuma";

type IntegrationPropsMap = {
  jellyfin: JellyfinData;
  qbittorrent: QbittorrentData;
  radarr: RadarrData;
  sonarr: SonarrData;
  kuma: UptimeKumaData;
};

type ExternalIntegrationProps<T extends Integration> = {
  integration: T;
  polling?: boolean;
  url: string;
};

const integrations: {
  [K in Integration]: React.FC<{ data: IntegrationPropsMap[K]; url: string }>;
} = {
  jellyfin: JellyfinIntegration,
  qbittorrent: QbittorrentIntegration,
  radarr: RadarrIntegration,
  sonarr: SonarrIntegration,
  kuma: UptimeKumaIntegration,
};

export const ExternalIntegration = <T extends Integration>({
  integration,
  polling = false,
  url,
}: ExternalIntegrationProps<T>) => {
  const Component = integrations[integration] as React.FC<{
    data: IntegrationPropsMap[T];
    url: string;
  }>;
  const [apiData, setApiData] = useState<IntegrationPropsMap[T] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (polling) {
          const data = (await apiCaller[
            integration
          ]()) as IntegrationPropsMap[T];
          setApiData(data);

          const interval = setInterval(async () => {
            const data = (await apiCaller[
              integration
            ]()) as IntegrationPropsMap[T];
            setApiData(data);
          }, 20000);

          return () => clearInterval(interval);
        }

        const data = (await apiCaller[integration]()) as IntegrationPropsMap[T];
        setApiData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, []);

  return apiData ? (
    <Component data={apiData} url={url} />
  ) : (
    <IntegrationLoader />
  );
};
