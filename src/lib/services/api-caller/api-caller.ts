import externalIntegrations from "../external-integrations/external-integrations";
import { JellyfinData } from "../external-integrations/jellyfin/jellyfin.types";
import { RadarrData } from "../external-integrations/radarr/radarr.types";

const getJellyfinData = async () => {
  const apiKey = process.env.NEXT_PUBLIC_JELLYFIN_API_KEY!;
  const apiUrl = process.env.NEXT_PUBLIC_JELLYFIN_URL;

  const counts = await externalIntegrations.jellyfin.counts(apiKey, apiUrl!);
  const sessions = await externalIntegrations.jellyfin.sessions(
    apiKey,
    apiUrl!
  );

  console.log(counts);
  console.log(sessions);

  const data: JellyfinData = {
    ...counts,
    sessions: sessions,
  };

  return data;
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

export const apiCaller = {
  jellyfin: getJellyfinData,
  qbittorrent: getQbittorrrentData,
  radarr: getRadarrData,
  sonarr: getSonarrData,
};
