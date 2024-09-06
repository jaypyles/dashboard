import React, { useState, useEffect } from "react";
import { fetchAndSet } from "../../lib/utils";
import { Container, Grid, Typography } from "@mui/material";
import classes from "./dashboard.module.css";
import HostOverview from "../shared/host-overview/host-overview";
import { useRouter } from "next/router";
import { ExternalIntegration } from "./widgets/external-integrations/external-integration";
import externalIntegrations from "../../lib/services/external-integrations/external-integrations";

const Dashboard = () => {
  const router = useRouter();
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    fetchAndSet("/api/getHosts", setHosts);
  }, []);

  const handleClick = (host: string) => {
    router.push(`/host/${host}`);
  };

  const apiCall = async () => {
    const apiKey = process.env.NEXT_PUBLIC_JELLYFIN_API_KEY!;
    const apiUrl = process.env.NEXT_PUBLIC_JELLYFIN_URL;

    const counts = await externalIntegrations.jellyfin.counts(apiKey, apiUrl!);
    const sessions = await externalIntegrations.jellyfin.sessions(
      apiKey,
      apiUrl!
    );

    console.log(counts);
    console.log(sessions);

    const data = {
      ...counts,
      sessions: sessions,
    };

    return data;
  };

  return (
    <>
      <Container maxWidth="lg" className={classes["server-manager-container"]}>
        <Typography variant="h4" gutterBottom>
          Server Manager
        </Typography>
        <Grid container spacing={3}>
          {hosts.map((host) => (
            <Grid item xs={12} sm={6} md={4} key={host}>
              <HostOverview
                host={host}
                onClick={() => handleClick(host)}
                className={classes.overview}
              />
            </Grid>
          ))}
        </Grid>
        <ExternalIntegration integration="jellyfin" callApi={apiCall} />
      </Container>
    </>
  );
};

export default Dashboard;
