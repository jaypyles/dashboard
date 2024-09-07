import {
  Movie,
  MovieResponseType,
} from "../../../../pages/api/integrations/radarr/radarr.types";

export const getMovies = async (): Promise<Movie[]> => {
  const response = await fetch("/api/integrations/radarr/movies", {
    method: "GET",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`Failed to fetch transfer info: ${response.status}`);
  }

  const json: MovieResponseType = await response.json();
  return json.movies;
};
