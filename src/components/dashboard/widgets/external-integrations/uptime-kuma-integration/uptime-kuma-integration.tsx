import React from "react";
import Integration from "@/components/shared/integration/integration";
import { UptimeKumaData } from "@/lib/services/external-integrations/uptime-kuma/uptime-kuma.types";
import { Tooltip, Typography } from "@mui/material";
import classes from "./uptime-kuma-integration.module.css";
import { clsx } from "clsx";

type UptimeKumaIntegrationProps = {
  data: UptimeKumaData;
  url: string;
};

export const UptimeKumaIntegration = ({
  data,
  url,
}: UptimeKumaIntegrationProps) => {
  const Uptimes = () => {
    return Object.keys(data.uptime).map((key) => (
      <Tooltip title={key} placement="top" key={key}>
        <div
          className={clsx(classes.uptime, {
            [classes.up as string]:
              data.uptime[key as string]?.msg.includes("200"),
            [classes.down as string]:
              !data.uptime[key as string]?.msg.includes("200"),
          })}
        >
          <div className={classes.circle}></div>
          <Typography>{data.uptime[key as string]?.ping}ms</Typography>
        </div>
      </Tooltip>
    ));
  };

  return (
    <Integration title="uptime-kuma" icon="/icons/kuma.png" link={url}>
      <Uptimes />
    </Integration>
  );
};
