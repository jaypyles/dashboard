import { apiGet } from "../../../utils";

const callJellyfinApi = async (
  jellyfinApiKey: string,
  jellyfinUrl: string,
  endpoint: string
) => {
  const data = await apiGet(`${jellyfinUrl}/${endpoint}`, {
    headers: { "X-Emby-Token": jellyfinApiKey },
  });

  return data;
};

export const getSessions = async (
  jellyfinApiKey: string,
  jellyfinUrl: string
) => {
  return await callJellyfinApi(jellyfinApiKey, jellyfinUrl, "Sessions");
};

export const getCounts = async (
  jellyfinApiKey: string,
  jellyfinUrl: string
) => {
  return await callJellyfinApi(jellyfinApiKey, jellyfinUrl, "Items/Counts");
};
