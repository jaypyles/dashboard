import React, { useMemo, useState } from "react";
import {
  createClientSideCacheApi,
  fetchAndSet,
  getHoverBackground,
} from "@/lib/utils";
import { Typography, Card, CardContent, CardProps } from "@mui/material";
import classes from "./host-overview.module.css";
import LinearProgressWithLabel from "@/components/shared/linear-progress-with-label/linearProgressWithLabel";
import { RunningContainers } from "@/components/dashboard/widgets/running-containers/running-containers";
import { clsx } from "clsx";
import { HostLoader } from "@/components/dashboard/widgets/skeletons";
import { RamOverview } from "@/components/dashboard/widgets/ram-overview";
import type { HostStatistics } from "./host-overview.types";
import { useSettings } from "@/lib/hooks/useSettings";
import { usePollingEffect } from "@/lib/hooks/usePollingEffect";

type HostProps = CardProps & {
  host: string;
  onClick?: () => void;
  tagClassName?: string;
};

const HostOverview = ({
  className,
  onClick,
  tagClassName,
  host,
  ...rest
}: HostProps) => {
  const [statistics, setStatistics] = useState<HostStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { settings } = useSettings();

  const cacheApi = useMemo(() => createClientSideCacheApi(), []);

  usePollingEffect(
    () => {
      fetchAndSet(
        `${host}/stats`,
        (data: HostStatistics) => {
          setStatistics(data);
          setIsLoading(false);
        },
        cacheApi
      );
    },
    60000,
    [host]
  );

  if (isLoading) {
    return <HostLoader className={clsx(classes.loader, className)} />;
  }

  return (
    <Card
      className={clsx(classes.card, className)}
      onClick={onClick}
      style={getHoverBackground(isHovered, settings.cardColor)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            <Typography variant="body2" color="text.secondary" component="p">
              <b>CPU Usage</b>
            </Typography>
            <LinearProgressWithLabel value={statistics?.usage ?? 0} />
          </div>

          {statistics?.storage.map((storage) => (
            <div className="is-row" key={storage.mountedOn}>
              <Typography variant="body2" color="text.secondary" component="p">
                <b>{storage.mountedOn}</b>
              </Typography>
              <LinearProgressWithLabel value={storage.usePercent} />
            </div>
          ))}

          <div className={clsx(classes.tags, tagClassName)}>
            <RunningContainers host={host} />
            <RamOverview usage={statistics?.ram_usage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HostOverview;
