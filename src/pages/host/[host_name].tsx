import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import HostOverview from "../../components/shared/host-overview/host-overview";
import classes from "./host_name.module.css";
import CommandTable from "../../components/shared/command/command-table/command-table";
import Terminal from "../../components/host/terminal/terminal";
import { CommandQueue } from "../../components/host/command-queue/command-queue";
import { getCommandQueue } from "../../lib/utils";
import Config from "../../components/host/config/config";
import { Button, IconButton, Paper } from "@mui/material";
import AddCommand from "../../components/host/add-command/add-command";
import { QueuedCommand } from "../../lib/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { clsx } from "clsx";

const HostManager = () => {
  const router = useRouter();
  const { host_name } = router.query;
  const [commandQueueOutput, setCommandQueueOutput] = useState<QueuedCommand[]>(
    []
  );
  const [viewedResult, setViewedResult] = useState<string>("");
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [configOpen, setConfigOpen] = useState<boolean>(false);
  const [commandOpen, setCommandOpen] = useState<boolean>(false);

  const getQueue = async (host_name: string) => {
    const commands = await getCommandQueue(host_name);
    setCommandQueueOutput(commands.reverse());
  };

  useEffect(() => {
    if (host_name) {
      getQueue(host_name as string);
    }
  }, [host_name]);

  const handleTerminalClose = () => {
    setTerminalOpen(false);
  };

  const handleTerminalOpen = () => {
    setTerminalOpen(true);
  };

  const handleConfigClose = () => {
    setConfigOpen(false);
  };

  const handleConfigOpen = () => {
    setConfigOpen(true);
  };

  return (
    <>
      {host_name && (
        <div className={`${classes.gridWrapper} is-col`}>
          <div className={classes.topRow}>
            <Paper className={clsx(classes.overview, "h-full w-full")}>
              <div>
                <IconButton
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <HostOverview
                host={host_name as string}
                className={classes.hostOverview}
                tagClassName={classes.tags}
              />
              <div className={classes.buttons}>
                <Button onClick={handleConfigOpen}>Open Config</Button>
                <Button
                  onClick={() => {
                    setCommandOpen(true);
                  }}
                >
                  Add Command
                </Button>
              </div>
              <Config
                host={host_name as string}
                open={configOpen}
                handleClose={handleConfigClose}
              />
              <AddCommand
                host={host_name as string}
                open={commandOpen}
                handleClose={() => {
                  setCommandOpen(false);
                }}
              />
            </Paper>
            <CommandTable
              host={host_name as string}
              refreshQueue={getQueue}
              className={classes.commandTable}
            />
          </div>
          <div className={classes.commandQueue}>
            <CommandQueue
              commands={commandQueueOutput}
              setViewedResult={setViewedResult}
              host={host_name as string}
              refreshQueue={getQueue}
              setOpen={handleTerminalOpen}
              setCommands={setCommandQueueOutput}
              className={classes.commandQueue}
            />
            <Terminal
              open={terminalOpen}
              handleClose={handleTerminalClose}
              output={viewedResult}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HostManager;
