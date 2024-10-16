import React from "react";
import classes from "./host-loader.module.css";
import { Skeleton } from "@mui/material";

export const HostLoader = () => {
  return (
    <div className={classes.host}>
      <Skeleton variant="rectangular" className={classes.skeleton} />
    </div>
  );
};
