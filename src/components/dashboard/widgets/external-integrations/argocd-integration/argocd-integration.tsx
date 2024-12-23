import React from "react";
import { ArgoCDData } from "@/lib/services/external-integrations/argocd/integration.types";
import Integration from "@/components/shared/integration/integration";
import classes from "./argocd-integration.module.css";
import clsx from "clsx";
import { Tooltip } from "@mui/material";

type ArgoCDIntegrationProps = {
  data: ArgoCDData[];
  url: string;
};

export const ArgoCDIntegration = ({ data, url }: ArgoCDIntegrationProps) => {
  return (
    <Integration title="argocd" icon="/icons/argocd.png" link={url}>
      <Applications applications={data} />
    </Integration>
  );
};

const Applications = ({ applications }: { applications: ArgoCDData[] }) => {
  return (
    <div className={classes.applications}>
      {applications.map((application) => (
        <Tooltip title={application.status} key={application.name}>
          <div className={classes.application}>
            <span className={classes.applicationName}>{application.name}</span>
            <span
              className={clsx("circle", {
                [classes.synced]: application.status.toLowerCase() === "synced",
                [classes.outOfSync]:
                  application.status.toLowerCase() === "outofsync",
              })}
            ></span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};
