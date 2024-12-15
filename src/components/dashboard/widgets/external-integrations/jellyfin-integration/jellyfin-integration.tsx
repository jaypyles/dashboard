import React from "react";
import { JellyfinData } from "../../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import Integration from "../../../../shared/integration/integration";

type JellyfinIntegrationProps = {
  data: JellyfinData;
  url: string;
};

export const JellyfinIntegration = ({
  data,
  url,
}: JellyfinIntegrationProps) => {
  return (
    <Integration
      title="jellyfin"
      data={[
        `${data.MovieCount} movies`,
        `${data.SeriesCount} series`,
        `${data.EpisodeCount} episodes`,
      ]}
      icon="/icons/jellyfin.png"
      link={url}
    />
  );
};
