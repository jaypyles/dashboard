import { apiGet } from "@/lib/utils";
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

const getIntegrationsData = async () => {
  const data = await apiGet("/api/integrations");
  console.log(data);
  return data;
};

const getArgoCDData = async () => {
  const data = await externalIntegrations.argocd.applications();
  return data;
};

export const apiCaller = {
  jellyfin: getJellyfinData,
  qbittorrent: getQbittorrrentData,
  radarr: getRadarrData,
  sonarr: getSonarrData,
  kuma: getUptimeKumaData,
  integrations: getIntegrationsData,
  argocd: getArgoCDData,
};
