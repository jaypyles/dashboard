import { Typography } from "@mui/material";
import { CommandOutput } from "@/lib/types";
import React, { useState, useEffect, useMemo } from "react";
import { createClientSideCacheApi, fetchAndSet } from "@/lib/utils";
import classes from "./running-containers.module.css";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

type RunningContainersProps = {
  host: string;
  className?: string;
};

export const RunningContainers = ({
  host,
  className,
}: RunningContainersProps) => {
  const [containerCount, setContainerCount] = useState<CommandOutput>();

  const cacheApi = useMemo(() => {
    return createClientSideCacheApi();
  }, []);

  useEffect(() => {
    fetchAndSet(
      `/${host}/command/run-command/count-containers`,
      setContainerCount,
      cacheApi
    );
  }, [host]);

  if (containerCount?.stderr || containerCount?.stdout === "0") {
    return null;
  }

  return (
    containerCount && (
      <div className={`${classes.runningContainers} ${className}`}>
        <Typography
          variant="body2"
          color="text.secondary"
          component="p"
          className={classes.containerCount}
          display="inline"
        >
          <DirectionsBoatIcon fontSize="inherit" className={classes.shipIcon} />
          {containerCount.stdout}
        </Typography>
      </div>
    )
  );
};
