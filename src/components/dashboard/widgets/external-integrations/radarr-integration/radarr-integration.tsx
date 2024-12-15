import React from "react";
import Integration from "../../../../shared/integration/integration";
import { RadarrData } from "../../../../../lib/services/external-integrations/radarr/radarr.types";

type RadarrIntegrationProps = {
  data: RadarrData;
  url: string;
};

export const RadarrIntegration = ({ data, url }: RadarrIntegrationProps) => {
  return (
    <Integration
      title="radarr"
      data={[`${data.movies?.length} movies`]}
      icon="https://ntfy.sh/_next/static/media/radarr.9df36883.svg"
      link={url}
    />
  );
};
