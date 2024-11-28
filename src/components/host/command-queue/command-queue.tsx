import classes from "./command-queue.module.css";
import React, { useState, useEffect } from "react";
import { IconButton, Paper, PaperProps, Typography } from "@mui/material";
import CustomTable from "../../shared/table/table";
import { Button, TableRow, TableCell } from "@mui/material";
import { Command, QueuedCommand } from "../../../lib/types";
import { clsx } from "clsx";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useContextMenu } from "../../../lib/hooks/useContextMenu";
import { deleteJob } from "../../../lib/utils";
import { toast } from "react-toastify";
import ContextMenu from "../../shared/context-menu/context-menu";

interface CommandQueue extends PaperProps {
  commands: QueuedCommand[];
  setViewedResult: (res: string) => void;
  setCommands: (commands: QueuedCommand[]) => void;
  host?: string;
  refreshQueue: (host_name: string) => Promise<void>;
  setOpen: () => void;
}

export const CommandQueue = ({
  commands,
  setViewedResult,
  host,
  setCommands,
  refreshQueue,
  setOpen,
  ...rest
}: CommandQueue): JSX.Element => {
  const { contextMenuState, showContextMenu, hideContextMenu } =
    useContextMenu();
  const [selectedJob, setSelectedJob] = useState<QueuedCommand | null>(null);

  const handleRightClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    command: QueuedCommand
  ) => {
    showContextMenu(event, [
      {
        label: "Delete Job",
        onClick: async () => {
          if (command) {
            setCommands(commands.filter((cmd) => cmd.id !== command.id));
            try {
              const res = await deleteJob(host as string, command.id!);
              if (res.status === "success") {
                toast.success(res.reason);
                setTimeout(() => refreshQueue(host as string), 100);
              } else {
                await refreshQueue(host as string);
                toast.error("Failed to delete the job.");
              }
            } catch (error) {
              await refreshQueue(host as string);
              toast.error("An error occurred while deleting the job.");
            }
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (host) {
      const intervalId = setInterval(() => {
        refreshQueue(host);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [host]);

  return (
    <Paper className={classes.previousCommands} {...rest}>
      <CustomTable
        headers={["name", "command", "time_created", "status", "result"]}
        className="full"
        title="Previously Ran Commands"
      >
        {commands.map((command, index) => (
          <TableRow
            key={index}
            onContextMenu={(event) => handleRightClick(event, command)}
          >
            <TableCell component="th" scope="row">
              {command.commands.map((com) => (
                <p className={classes.name}>{com.name}</p>
              ))}
            </TableCell>
            <TableCell component="th" scope="row">
              {command.commands.map((com) => (
                <p>{com.command}</p>
              ))}
            </TableCell>
            <TableCell component="th" scope="row">
              {command.time_created}
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography
                className={clsx(classes.status, classes[command.status])}
              >
                {command.status}
              </Typography>
            </TableCell>
            <TableCell component="th" scope="row">
              <IconButton
                color="primary"
                disabled={command.status !== "done"}
                onClick={() => {
                  const combinedOutput = Object.values(command.output).reduce(
                    (accumulator, current) => {
                      return (
                        accumulator +
                        current.stdout +
                        "\n" +
                        current.stderr +
                        "\n"
                      );
                    },
                    ""
                  );
                  setViewedResult(combinedOutput);
                  setOpen();
                }}
              >
                <RemoveRedEyeIcon> View</RemoveRedEyeIcon>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
      <ContextMenu
        position={contextMenuState.position}
        options={contextMenuState.options}
        onClose={hideContextMenu}
      />
    </Paper>
  );
};
