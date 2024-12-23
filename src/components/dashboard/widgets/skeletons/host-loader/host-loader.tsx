import React, { useState } from "react";
import classes from "./host-loader.module.css";
import { Skeleton } from "@mui/material";
import clsx from "clsx";
import { useGetSettings } from "@/lib/hooks/useGetSettings";

export type HostLoaderProps = {
  className?: string;
};

export const HostLoader = ({ className }: HostLoaderProps) => {
  const settings = useGetSettings();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={clsx(classes.host, className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered
          ? settings.cardColor.slice(0, -2)
          : settings.cardColor,
      }}
    >
      <Skeleton variant="rectangular" className={classes.skeleton} />
    </div>
  );
};
