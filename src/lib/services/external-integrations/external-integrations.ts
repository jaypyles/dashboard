import Jellyfin from "./jellyfin/jellyfin";
import Qbittorrent from "./qbittorrent/qbittorrent";
import Radarr from "./radarr/radarr";
import Sonarr from "./sonarr/sonarr";
import UptimeKuma from "./uptime-kuma/uptime-kuma";
import ArgoCD from "./argocd/argocd";

const externalIntegrations = {
  jellyfin: Jellyfin,
  qbittorrent: Qbittorrent,
  radarr: Radarr,
  sonarr: Sonarr,
  uptimeKuma: UptimeKuma,
  argocd: ArgoCD,
};

export default externalIntegrations;
