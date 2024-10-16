import React from "react";
import classes from "./integration-loader.module.css";
import { Skeleton, Stack } from "@mui/material";

export const IntegrationLoader = () => {
  return (
    <div className={classes.integration}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </div>
  );
};
