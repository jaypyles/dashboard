import React from "react";
import classes from "./host-loader.module.css";
import { Skeleton } from "@mui/material";
import clsx from "clsx";

export type HostLoaderProps = {
  className?: string;
};

export const HostLoader = ({ className }: HostLoaderProps) => {
  return (
    <div className={clsx(classes.host, className)}>
      <Skeleton variant="rectangular" className={classes.skeleton} />
    </div>
  );
};
