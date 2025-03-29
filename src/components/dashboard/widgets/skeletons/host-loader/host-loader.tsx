import React, { useState } from "react";
import classes from "./host-loader.module.css";
import { Skeleton } from "@mui/material";
import clsx from "clsx";
import { useSettings } from "@/lib/hooks/useSettings";

export type HostLoaderProps = {
  className?: string;
};

export const HostLoader = ({ className }: HostLoaderProps) => {
  const { settings } = useSettings();
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
      <div>
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
        <div style={{ marginTop: "0.5rem" }}>
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton
            variant="rectangular"
            height={20}
            style={{ marginTop: "0.25rem" }}
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton
            variant="rectangular"
            height={20}
            style={{ marginTop: "0.25rem" }}
          />
        </div>
        <div className={classes.tags}>
          <Skeleton variant="text" width={80} height={20} />
        </div>
      </div>
    </div>
  );
};
