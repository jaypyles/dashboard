import Jellyfin from "./jellyfin/jellyfin";
import Qbittorrent from "./qbittorrent/qbittorrent";
import Radarr from "./radarr/radarr";
import Sonarr from "./sonarr/sonarr";
import UptimeKuma from "./uptime-kuma/uptime-kuma";

const externalIntegrations = {
  jellyfin: Jellyfin,
  qbittorrent: Qbittorrent,
  radarr: Radarr,
  sonarr: Sonarr,
  uptimeKuma: UptimeKuma,
};

export default externalIntegrations;