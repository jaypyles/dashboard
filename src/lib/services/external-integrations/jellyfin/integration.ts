import { apiGet } from "../../../utils";

export const getSessions = async (
  jellyfinApiKey: string,
  jellyfinUrl: string
) => {
  const data = await apiGet(`${jellyfinUrl}/Sessions`, {
    headers: { "X-Emby-Token": jellyfinApiKey },
  });

  return data;
};
