import React from "react";
import { ArgoCDData } from "@/lib/services/external-integrations/argocd/integration.types";
import Integration from "@/components/shared/integration/integration";
import classes from "./argocd-integration.module.css";
import clsx from "clsx";
import { Tooltip, Typography } from "@mui/material";

type ArgoCDIntegrationProps = {
  data: ArgoCDData[];
  url: string;
};

export const ArgoCDIntegration = ({ data, url }: ArgoCDIntegrationProps) => {
  const syncedCount = data.filter(
    (app) => app.status.toLowerCase() === "synced"
  ).length;
  const outOfSyncCount = data.filter(
    (app) => app.status.toLowerCase() === "outofsync"
  ).length;

  return (
    <Integration
      title="argocd"
      icon="/icons/argocd.png"
      link={url}
      data={[`${syncedCount} synced`, `${outOfSyncCount} out of sync`]}
    >
      <Applications applications={data} />
    </Integration>
  );
};

const Applications = ({ applications }: { applications: ArgoCDData[] }) => {
  const syncedApps = applications.filter(
    (app) => app.status.toLowerCase() === "synced"
  );
  const outOfSyncApps = applications.filter(
    (app) => app.status.toLowerCase() === "outofsync"
  );

  return (
    <div className={classes.applicationsContainer}>
      {outOfSyncApps.length > 0 && (
        <div className={classes.statusSection}>
          <Typography variant="caption" className={classes.statusLabel}>
            Out of Sync
          </Typography>
          <div className={classes.applications}>
            {outOfSyncApps.map((application) => (
              <ApplicationCard
                key={application.name}
                application={application}
              />
            ))}
          </div>
        </div>
      )}
      {syncedApps.length > 0 && (
        <div className={classes.statusSection}>
          <Typography variant="caption" className={classes.statusLabel}>
            Synced
          </Typography>
          <div className={classes.applications}>
            {syncedApps.map((application) => (
              <ApplicationCard
                key={application.name}
                application={application}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ApplicationCard = ({ application }: { application: ArgoCDData }) => (
  <Tooltip
    title={`${application.name} - ${application.status}`}
    placement="top"
  >
    <div
      className={clsx(classes.application, {
        [classes.synced as string]:
          application.status.toLowerCase() === "synced",
        [classes.outOfSync as string]:
          application.status.toLowerCase() === "outofsync",
      })}
    >
      <Typography className={classes.applicationName} variant="body2">
        {application.name}
      </Typography>
      <div className={classes.statusIndicator}>
        <div className={classes.statusDot} />
      </div>
    </div>
  </Tooltip>
);
