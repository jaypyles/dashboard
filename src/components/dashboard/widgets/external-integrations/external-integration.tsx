import React from "react";
import { useState } from "react";
import { JellyfinIntegration } from "./jellyfin-integration/jellyfin-integration";
import { IntegrationLoader } from "@/components/dashboard/widgets/skeletons";
import { apiCaller } from "@/lib/services/api-caller/api-caller";
import { QbittorrentIntegration } from "./qbittorrent-integration/qbittorrent-integration";
import { RadarrIntegration } from "./radarr-integration/radarr-integration";
import { SonarrIntegration } from "./sonarr-integration/sonarr-integration";
import { UptimeKumaIntegration } from "./uptime-kuma-integration/uptime-kuma-integration";
import { ArgoCDIntegration } from "./argocd-integration";
import { usePollingEffect } from "@/lib/hooks/usePollingEffect";
import {
  Integration,
  IntegrationPropsMap,
  ExternalIntegrationProps,
} from "./external-integration.types";

const integrations: {
  [K in Integration]: React.FC<{ data: IntegrationPropsMap[K]; url: string }>;
} = {
  jellyfin: JellyfinIntegration,
  qbittorrent: QbittorrentIntegration,
  radarr: RadarrIntegration,
  sonarr: SonarrIntegration,
  kuma: UptimeKumaIntegration,
  argocd: ArgoCDIntegration,
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
  const [data, setData] = useState<IntegrationPropsMap[T] | null>(null);

  usePollingEffect(
    async () => {
      const data = (await apiCaller[integration]()) as IntegrationPropsMap[T];
      setData(data);
    },
    20000,
    [],
    true,
    polling
  );

  if (!data) {
    return <IntegrationLoader />;
  }

  return <Component data={data} url={url} />;
};
