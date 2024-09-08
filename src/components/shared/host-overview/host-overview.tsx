import React, { useEffect, useState } from "react";
import { fetchAndSet, fetchAndSetWithPayload } from "../../../lib/utils";
import { Typography, Card, CardContent, CardProps } from "@mui/material";
import classes from "./host-overview.module.css";
import LinearProgressWithLabel from "../linear-progress-with-label/linearProgressWithLabel";
import { CommandOutput } from "../../../lib/types";
import { RunningContainers } from "../../dashboard/widgets/running-containers/running-containers";

type HostProps = {
  host: string;
  onClick?: () => void;
};

interface Storage {
  mountedOn: string;
  size: string;
  used: string;
  available: string;
  usePercent: string;
}

interface HostStatistics {
  storage: Storage[];
  usage: string;
  cores: string;
  threads: string;
  uptime: string;
}

const HostOverview = ({
  className,
  onClick,
  host,
  ...rest
}: HostProps & CardProps) => {
  const [statistics, setStatistics] = useState<HostStatistics | null>({
    storage: [],
    usage: "",
    cores: "",
    threads: "",
    uptime: "",
  });

  useEffect(() => {
    fetchAndSetWithPayload(`/api/${host}/stats`, setStatistics, {
      paths: ["/home", "/", "/mnt/nas"],
    });

    const interval = setInterval(() => {
      fetchAndSetWithPayload(`/api/${host}/stats`, setStatistics, {
        paths: ["/home", "/", "/mnt/nas"],
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [host]);

  return (
    <>
      {statistics && (
        <Card className={className} onClick={onClick} {...rest}>
          <CardContent className={classes["host-card"]}>
            <div>
              <Typography variant="h6" component="div">
                {host}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Uptime:</b> {statistics.uptime}
              </Typography>
              <div className="is-row">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  <b>CPU Usage</b>
                </Typography>
                <LinearProgressWithLabel
                  value={Number(statistics.usage.replace("%", ""))}
                ></LinearProgressWithLabel>
              </div>
              {statistics.storage.map((storage) => (
                <div className="is-row">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="p"
                  >
                    <b>{storage.mountedOn}</b>
                  </Typography>
                  <LinearProgressWithLabel
                    value={Number(storage.usePercent.replace("%", ""))}
                  ></LinearProgressWithLabel>
                </div>
              ))}
              <RunningContainers host={host} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HostOverview;
