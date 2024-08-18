import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchAndSetWithPayload } from "../../../lib/utils";
import { Typography, Button, Card, CardContent } from "@mui/material";
import classes from "./host-overview.module.css";
import LinearProgressWithLabel from "../linear-progress-with-label/linearProgressWithLabel";
import { usePathname } from "next/navigation";

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

const HostOverview = ({ host }: HostProps) => {
  const [statistics, setStatistics] = useState<HostStatistics | null>({
    storage: [],
    usage: "",
    cores: "",
    threads: "",
    uptime: "",
  });

  const router = useRouter();
  const pathname = usePathname();
  const isHostPage = pathname.includes("host");

  useEffect(() => {
    fetchAndSetWithPayload(`/api/${host}/stats`, setStatistics, {
      paths: ["/home", "/", "/mnt/nas"],
    });
  }, [host]);

  useEffect(() => {
    console.log(statistics);
    console.log(isHostPage);
  }, [statistics, isHostPage]);

  return (
    <>
      {statistics && (
        <Card>
          <CardContent className={classes["host-card"]}>
            <div>
              <Typography variant="h6" component="div">
                {host}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uptime: {statistics.uptime}
              </Typography>
              <div className="is-row">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="p"
                >
                  CPU Usage
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
                    {storage.mountedOn}
                  </Typography>
                  <LinearProgressWithLabel
                    value={Number(storage.usePercent.replace("%", ""))}
                  ></LinearProgressWithLabel>
                </div>
              ))}
              {!isHostPage && (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes["manage-button"]}
                  onClick={() => router.push(`/host/${host}`)}
                >
                  Manage
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default HostOverview;
