import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HostOverview from "../../components/shared/host-overview/host-overview";
import { Grid, Typography } from "@mui/material";
import classes from "./host_name.module.css";
import CommandTable from "../../components/shared/command/command-table/command-table";
import Terminal from "../../components/host/terminal/terminal";
import { CommandQueue } from "../../components/host/command-queue/command-queue";
import { getCommandQueue } from "../../lib/utils";

const HostManager = () => {
  const router = useRouter();
  const { host_name } = router.query;
  const [commandQueueOutput, setCommandQueueOutput] = useState<[]>([]);
  const [viewedResult, setViewedResult] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const getQueue = async (host_name: string) => {
    const commands = await getCommandQueue(host_name);
    setCommandQueueOutput(commands.reverse());
  };

  useEffect(() => {
    if (host_name) {
      getQueue(host_name as string);
    }
  }, [host_name]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {host_name && (
        <div className={`${classes.gridWrapper} is-col`}>
          <div className="is-row">
            <HostOverview host={host_name as string} />
            <CommandTable host={host_name as string} refreshQueue={getQueue} />
          </div>
          <div className="is-col">
            <CommandQueue
              commands={commandQueueOutput}
              setViewedResult={setViewedResult}
              host={host_name as string}
              refreshQueue={getQueue}
              setOpen={handleOpen}
            />
            <Terminal
              open={open}
              handleClose={handleClose}
              output={viewedResult}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HostManager;
