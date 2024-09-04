import { Typography } from "@mui/material";
import { CommandOutput } from "../../../../lib/types";
import React, { useState, useEffect } from "react";
import { fetchAndSet } from "../../../../lib/utils";
import classes from "./running-containers.module.css";

type RunningContainersProps = {
  host: string;
  className?: string;
};

export const RunningContainers = ({
  host,
  className,
}: RunningContainersProps) => {
  const [containerCount, setContainerCount] = useState<CommandOutput>();

  useEffect(() => {
    fetchAndSet(
      `/api/${host}/command/run-command/count-containers`,
      setContainerCount,
    );
  }, [host]);

  return (
    <>
      {containerCount && (
        <div className={`${classes.runningContainers} ${className}`}>
          <Typography variant="body2" color="text.secondary" component="p">
            {containerCount.stdout} running containers
          </Typography>
        </div>
      )}
    </>
  );
};
