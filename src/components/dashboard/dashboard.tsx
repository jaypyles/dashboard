import React, { useState, useEffect } from "react";
import { fetchAndSet } from "@/lib/utils";
import { Container, Grid } from "@mui/material";
import classes from "./dashboard.module.css";
import HostOverview from "@/components/shared/host-overview/host-overview";
import { useRouter } from "next/router";
import {
  ExternalIntegration,
  Integration,
} from "@/components/dashboard/widgets/external-integrations/external-integration";
import useGetIntegrations from "@/lib/hooks/useGetIntegrations";

const Dashboard = () => {
  const router = useRouter();
  const [hosts, setHosts] = useState<string[]>([]);
  const integrations = useGetIntegrations();

  useEffect(() => {
    fetchAndSet("/api/getHosts", setHosts);
  }, []);

  const handleClick = (host: string) => {
    router.push(`/host/${host}`);
  };

  return (
    <>
      <Container maxWidth="lg" className={classes["server-manager-container"]}>
        <div className={classes.servers}>
          {hosts.map((host) => (
            <HostOverview
              key={host}
              host={host}
              onClick={() => handleClick(host)}
              className={classes.overview}
            />
          ))}
        </div>
        <div className={classes.integrations}>
          {Object.values(integrations).map((integration) => (
            <ExternalIntegration
              key={integration.name}
              integration={integration.name as Integration}
              polling={integration.name === "qbittorrent"}
              url={integration.url}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
