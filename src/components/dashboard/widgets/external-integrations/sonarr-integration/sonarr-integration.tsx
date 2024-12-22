import React from "react";
import Integration from "@/components/shared/integration/integration";
import { SonarrData } from "@/lib/services/external-integrations/sonarr/sonarr.types";

type SonarrIntegrationProps = {
  data: SonarrData;
  url: string;
};

export const SonarrIntegration = ({ data, url }: SonarrIntegrationProps) => {
  return (
    <Integration
      title="sonarr"
      data={[`${data.shows?.length} shows`]}
      icon="/icons/sonarr.png"
      link={url}
    />
  );
};
