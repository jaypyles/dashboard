import React from "react";
import Integration from "../../../../shared/integration/integration";
import { SonarrData } from "../../../../../lib/services/external-integrations/sonarr/sonarr.types";

type SonarrIntegrationProps = {
  data: SonarrData;
};

export const SonarrIntegration = ({ data }: SonarrIntegrationProps) => {
  return (
    <Integration
      title="sonarr"
      data={[`${data.shows?.length} shows`]}
      icon="https://static-00.iconduck.com/assets.00/sonarr-icon-2046x2048-jr5zhoo0.png"
      link={process.env.NEXT_PUBLIC_SONARR_URL}
    />
  );
};
