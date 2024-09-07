import { RadarrResponseType } from "../../../../pages/api/integrations/sonarr/sonarr.types";

export const getShows = async (): Promise<RadarrResponseType> => {
  const response = await fetch("/api/integrations/sonarr/shows", {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to fetch transfer info: ${response.status}`);
  }

  const json: RadarrResponseType = await response.json();
  return { shows: json.shows };
};
