import externalIntegrations from "../external-integrations/external-integrations";
import { RadarrData } from "../external-integrations/radarr/radarr.types";

const getJellyfinData = async () => {
  return await externalIntegrations.jellyfin.media();
};

const getQbittorrrentData = async () => {
  return await externalIntegrations.qbittorrent.transfer();
};

const getRadarrData = async () => {
  const movies = await externalIntegrations.radarr.movies();
  const radarrData: RadarrData = { movies: movies };
  return radarrData;
};

const getSonarrData = async () => {
  const sonarrRes = await externalIntegrations.sonarr.shows();
  const sonarrData = { shows: sonarrRes.shows };
  return sonarrData;
};

const getUptimeKumaData = async () => {
  const uptimeRes = await externalIntegrations.uptimeKuma.uptime();
  return uptimeRes;
};

export const apiCaller = {
  jellyfin: getJellyfinData,
  qbittorrent: getQbittorrrentData,
  radarr: getRadarrData,
  sonarr: getSonarrData,
  uptimeKuma: getUptimeKumaData,
};
