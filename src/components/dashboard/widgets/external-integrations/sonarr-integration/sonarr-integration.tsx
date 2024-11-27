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
      icon="/icons/sonarr.png"
      link={process.env.NEXT_PUBLIC_SONARR_URL}
    />
  );
};
