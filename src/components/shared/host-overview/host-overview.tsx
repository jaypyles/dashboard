import React, { useEffect, useState } from "react";
import { fetchAndSetWithPayload } from "../../../lib/utils";
import { Typography, Card, CardContent, CardProps } from "@mui/material";
import classes from "./host-overview.module.css";
import LinearProgressWithLabel from "../linear-progress-with-label/linearProgressWithLabel";
import { RunningContainers } from "../../dashboard/widgets/running-containers/running-containers";
import { clsx } from "clsx";
import { HostLoader } from "../../dashboard/widgets/skeletons";
import { RamOverview } from "../../dashboard/widgets/ram-overview";

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
  ram_usage: string;
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
    ram_usage: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetWithPayload(
      `/api/${host}/stats`,
      (data) => {
        setStatistics(data);
        setIsLoading(false);
      },
      {
        paths: ["/home", "/", "/mnt/nas"],
      }
    );

    const interval = setInterval(() => {
      fetchAndSetWithPayload(
        `/api/${host}/stats`,
        (data) => {
          setStatistics(data);
          setIsLoading(false);
        },
        {
          paths: ["/home", "/", "/mnt/nas"],
        }
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [host]);

  return (
    <>
      {isLoading ? (
        <HostLoader />
      ) : (
        <Card
          className={clsx(classes.card, className)}
          onClick={onClick}
          {...rest}
        >
          <CardContent className={classes["host-card"]}>
            <div>
              <Typography variant="h6" component="div">
                {host}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Uptime:</b> {statistics?.uptime}
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
                  value={Number(statistics?.usage.replace("%", ""))}
                ></LinearProgressWithLabel>
              </div>
              {statistics?.storage.map((storage) => (
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
              <div className={classes.tags}>
                <RunningContainers host={host} />
                <RamOverview usage={statistics?.ram_usage} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HostOverview;
