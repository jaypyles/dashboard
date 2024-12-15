import React from "react";
import Integration from "@/components/shared/integration/integration";
import { UptimeKumaData } from "@/lib/services/external-integrations/uptime-kuma/uptime-kuma.types";
import { Tooltip, Typography } from "@mui/material";
import classes from "./uptime-kuma-integration.module.css";
import { clsx } from "clsx";

type UptimeKumaIntegrationProps = {
  data: UptimeKumaData;
};

export const UptimeKumaIntegration = ({ data }: UptimeKumaIntegrationProps) => {
  const Uptimes = () => {
    return (
      <>
        {Object.keys(data.uptime).map((key) => (
          <Tooltip title={key} placement="top" key={key}>
            <div
              className={clsx(classes.uptime, {
                [classes.up]: data.uptime[key].msg.includes("200"),
                [classes.down]: !data.uptime[key].msg.includes("200"),
              })}
            >
              <div className={classes.circle}></div>
              <Typography>{data.uptime[key].ping}ms</Typography>
            </div>
          </Tooltip>
        ))}
      </>
    );
  };

  return (
    <Integration
      title="uptime-kuma"
      icon="/icons/kuma.png"
      link={process.env.NEXT_PUBLIC_UPTIME_KUMA_URL}
    >
      <Uptimes />
    </Integration>
  );
};
