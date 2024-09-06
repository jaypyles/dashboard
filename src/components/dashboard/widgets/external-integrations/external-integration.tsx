import { JellyfinData } from "../../../../lib/services/external-integrations/jellyfin/jellyfin.types";
import { JellyfinIntegration } from "./jellyfin-integration/jellyfin-integration";

type Integration = "jellyfin";

type IntegrationPropsMap = {
  jellyfin: JellyfinData;
};

type ExternalIntegrationProps<T extends Integration> = {
  integration: T;
  callApi: () => IntegrationPropsMap[T];
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

  const data = callApi();

  return <Component data={data} />;
};
