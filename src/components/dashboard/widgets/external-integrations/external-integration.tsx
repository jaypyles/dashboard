import externalIntegrations from "../../../../lib/services/external-integrations/external-integrations";
import { useState, useEffect } from "react";

export const Page = () => {
  const [data, setData] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_JELLYFIN_URL;
  const apiKey = process.env.NEXT_PUBLIC_JELLYFIN_API_KEY;

  const callJelly = async () => {
    try {
      const j = await externalIntegrations.jellyfin.sessions(apiKey!, apiUrl!);
      return j;
    } catch (error) {
      console.error("Failed to fetch Jellyfin sessions:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await callJelly();
      setData(result);
    };

    fetchData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};
