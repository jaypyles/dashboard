import React, { useState, useEffect } from "react";
import { fetchAndSet } from "../../lib/utils";
import { Container, Grid, Typography } from "@mui/material";
import classes from "./dashboard.module.css";
import HostOverview from "../shared/host-overview/host-overview";

const Dashboard = () => {
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    fetchAndSet("/api/getHosts", setHosts);
  }, []);

  return (
    <>
      <Container maxWidth="lg" className={classes["server-manager-container"]}>
        <Typography variant="h4" gutterBottom>
          Server Manager
        </Typography>
        <Grid container spacing={3}>
          {hosts.map((host) => (
            <Grid item xs={12} sm={6} md={4} key={host}>
              <HostOverview host={host} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
