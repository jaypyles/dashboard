import React from "react";
import classes from "./table-loader.module.css";
import { Skeleton } from "@mui/material";
import clsx from "clsx";
import { useSettings } from "@/lib/hooks/useSettings";

export type TableLoaderProps = {
  className?: string;
};

export const TableLoader = ({ className }: TableLoaderProps) => {
  const { settings } = useSettings();

  return (
    <div
      className={clsx(classes.host, className)}
      style={{ backgroundColor: settings.cardColor }}
    >
      <Skeleton variant="rectangular" className={classes.skeleton} />
    </div>
  );
};
