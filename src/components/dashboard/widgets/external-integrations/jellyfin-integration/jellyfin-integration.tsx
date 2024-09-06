import React from "react";
import { JellyfinData } from "../../../../../lib/services/external-integrations/jellyfin/jellyfin.types";

type JellyfinIntegrationProps = {
  data: JellyfinData;
};

export const JellyfinIntegration = ({ data }: JellyfinIntegrationProps) => {
  console.log(data);
  return <p>{JSON.stringify(data)}</p>;
};
