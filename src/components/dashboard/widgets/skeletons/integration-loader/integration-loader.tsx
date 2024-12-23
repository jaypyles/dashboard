import React, { useState } from "react";
import classes from "./integration-loader.module.css";
import { Skeleton, Stack } from "@mui/material";
import { useGetSettings } from "@/lib/hooks/useGetSettings";

export const IntegrationLoader = () => {
  const settings = useGetSettings();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={classes.integration}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered
          ? settings.cardColor.slice(0, -2)
          : settings.cardColor,
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </div>
  );
};
