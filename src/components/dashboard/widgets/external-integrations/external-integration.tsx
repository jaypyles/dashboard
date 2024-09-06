import { useState, useEffect } from "react";
import { JellyfinData } from "../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import { JellyfinIntegration } from "./jellyfin-integration/jellyfin-integration";

type Integration = "jellyfin";

type IntegrationPropsMap = {
  jellyfin: JellyfinData;
};

type ExternalIntegrationProps<T extends Integration> = {
  integration: T;
  callApi: () => Promise<IntegrationPropsMap[T]>;
};

const integrations: {
  [K in Integration]: React.FC<{ data: IntegrationPropsMap[K] }>;
} = {
  jellyfin: JellyfinIntegration,
};

export const ExternalIntegration = <T extends Integration>({
  integration,
  callApi,
}: ExternalIntegrationProps<T>) => {
  const Component = integrations[integration] as React.FC<{
    data: IntegrationPropsMap[T];
  }>;

  // Initialize state for apiData
  const [apiData, setApiData] = useState<IntegrationPropsMap[T] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await callApi();
        setApiData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    getData();
  }, [callApi]);

  return apiData ? <Component data={apiData} /> : <div>Loading...</div>;
};
