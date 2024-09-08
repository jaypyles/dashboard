import React, { useState, useEffect } from "react";
import { fetchAndSet } from "../../lib/utils";
import { Container, Grid, Typography } from "@mui/material";
import classes from "./dashboard.module.css";
import HostOverview from "../shared/host-overview/host-overview";
import { useRouter } from "next/router";
import { ExternalIntegration } from "./widgets/external-integrations/external-integration";

const Dashboard = () => {
  const router = useRouter();
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    fetchAndSet("/api/getHosts", setHosts);
  }, []);

  const handleClick = (host: string) => {
    router.push(`/host/${host}`);
  };

  return (
    <>
      <Container maxWidth="lg" className={classes["server-manager-container"]}>
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <div className={classes.servers}>
          <Grid container spacing={3}>
            {hosts.map((host) => (
              <Grid item xs={12} sm={6} md={6} key={host}>
                <HostOverview
                  host={host}
                  onClick={() => handleClick(host)}
                  className={classes.overview}
                />
              </Grid>
            ))}
          </Grid>
        </div>
        <div className={classes.integrations}>
          <ExternalIntegration integration="jellyfin" />
          <ExternalIntegration integration="qbittorrent" polling />
          <ExternalIntegration integration="radarr" />
          <ExternalIntegration integration="sonarr" />
          <ExternalIntegration integration="uptimeKuma" />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
