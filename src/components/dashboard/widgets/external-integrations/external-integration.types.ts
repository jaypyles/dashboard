import { JellyfinData } from "@/lib/services/external-integrations/jellyfin/jellyfin.types";
import { QbittorrentData } from "@/lib/services/external-integrations/qbittorrent/qbittorrent.types";
import { RadarrData } from "@/lib/services/external-integrations/radarr/radarr.types";
import { SonarrData } from "@/lib/services/external-integrations/sonarr/sonarr.types";
import { UptimeKumaData } from "@/lib/services/external-integrations/uptime-kuma/uptime-kuma.types";
import { ArgoCDData } from "@/lib/services/external-integrations/argocd/integration.types";

export type Integration =
  | "jellyfin"
  | "qbittorrent"
  | "radarr"
  | "sonarr"
  | "kuma"
  | "argocd";

export type IntegrationPropsMap = {
  jellyfin: JellyfinData;
  qbittorrent: QbittorrentData;
  radarr: RadarrData;
  sonarr: SonarrData;
  kuma: UptimeKumaData;
  argocd: ArgoCDData[];
};

export type ExternalIntegrationProps<T extends Integration> = {
  integration: T;
  polling?: boolean;
  url: string;
};
