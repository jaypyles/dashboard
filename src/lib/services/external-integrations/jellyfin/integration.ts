import { apiGet } from "../../../utils";

export const getMedia = async () => {
  const media = await apiGet("/api/integrations/jellyfin/media_count");

  return {
    MovieCount: media.MovieCount,
    SeriesCount: media.SeriesCount,
    EpisodeCount: media.EpisodeCount,
  };
};
