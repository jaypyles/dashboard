import React, { useEffect, useState } from "react";
import { fetchAndSetWithPayload } from "../../../../lib/utils";
import { Typography, Button, Card, CardContent } from "@mui/material";
import classes from "./host.module.css";
import LinearProgressWithLabel from "../../../shared/linear-progress-with-label/linearProgressWithLabel";
import { HostLoader } from "../skeletons";

type HostProps = {
  host: string;
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

const HostWidget = ({ host }: HostProps) => {
  const [statistics, setStatistics] = useState<HostStatistics>({
    storage: [],
    usage: "",
    cores: "",
    threads: "",
    uptime: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAndSetWithPayload(`/api/${host}/stats`, setStatistics, {
      paths: ["/home", "/", "/mnt/nas"],
    });
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <HostLoader />
      ) : (
        <Card className={classes["host-card"]}>
          <CardContent>
            <div>
              <Typography variant="h6" component="div">
                {host}
              </Typography>
              <div className="is-row">
                <Typography color="text.secondary" component="p">
                  CPU Usage
                </Typography>
                <LinearProgressWithLabel
                  value={Number(statistics.usage.replace("%", ""))}
                ></LinearProgressWithLabel>
              </div>
              <Typography variant="body2" color="text.secondary">
                Uptime: {statistics.uptime}
              </Typography>
              {statistics.storage.map((storage) => (
                <div className="is-row">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="p"
                  >
                    {storage.mountedOn}
                  </Typography>
                  <LinearProgressWithLabel
                    value={Number(storage.usePercent.replace("%", ""))}
                  ></LinearProgressWithLabel>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                className={classes["manage-button"]}
              >
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HostWidget;
