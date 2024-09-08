import { UptimeKumaResponseType } from "../../../../pages/api/integrations/uptime-kuma/uptime-kuma.types";

export const getUptime = async (): Promise<UptimeKumaResponseType> => {
  const response = await fetch("/api/integrations/uptime-kuma/uptime");

  if (!response.ok) {
    throw new Error(`Failed to fetch transfer info: ${response.status}`);
  }

  const json: UptimeKumaResponseType = await response.json();
  return json;
};
