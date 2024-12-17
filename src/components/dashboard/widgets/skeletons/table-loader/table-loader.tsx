import React from "react";
import classes from "./table-loader.module.css";
import { Skeleton } from "@mui/material";
import clsx from "clsx";

export type TableLoaderProps = {
  className?: string;
};

export const TableLoader = ({ className }: TableLoaderProps) => {
  return (
    <div className={clsx(classes.host, className)}>
      <Skeleton variant="rectangular" className={classes.skeleton} />
    </div>
  );
};
