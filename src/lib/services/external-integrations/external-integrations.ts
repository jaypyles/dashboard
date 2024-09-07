import Jellyfin from "./jellyfin/jellyfin";
import Qbittorrent from "./qbittorrent/qbittorrent";
import Radarr from "./radarr/radarr";
import Sonarr from "./sonarr/sonarr";

const externalIntegrations = {
  jellyfin: Jellyfin,
  qbittorrent: Qbittorrent,
  radarr: Radarr,
  sonarr: Sonarr,
};

export default externalIntegrations;
