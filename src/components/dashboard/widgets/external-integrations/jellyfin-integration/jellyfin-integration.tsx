import React from "react";
import { JellyfinData } from "../../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import Integration from "../../../../shared/integration/integration";

type JellyfinIntegrationProps = {
  data: JellyfinData;
};

export const JellyfinIntegration = ({ data }: JellyfinIntegrationProps) => {
  return (
    <Integration
      title="jellyfin"
      data={[
        `${data.MovieCount} movies`,
        `${data.SeriesCount} series`,
        `${data.EpisodeCount} episodes`,
      ]}
      icon="https://static-00.iconduck.com/assets.00/jellyfin-icon-2048x2048-tf5ztk6m.png"
      link={process.env.NEXT_PUBLIC_JELLYFIN_URL}
    />
  );
};
