import React from "react";
import { JellyfinData } from "../../../../../lib/services/external-integrations/jellyfin/jellyfin.types";

type JellyfinIntegrationProps = {
  data: JellyfinData;
};

export const JellyfinIntegration = ({ data }: JellyfinIntegrationProps) => {
  return <h1>Jellyfin</h1>;
};
