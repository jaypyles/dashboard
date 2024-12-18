import classes from "./command-queue.module.css";
import React, { useEffect, useState } from "react";
import { Paper, PaperProps, Typography } from "@mui/material";
import CustomTable from "@/components/shared/table/table";
import { TableRow, TableCell } from "@mui/material";
import { QueuedCommand } from "@/lib/types";
import { clsx } from "clsx";
import { useContextMenu } from "@/lib/hooks/useContextMenu";
import { deleteJob } from "@/lib/utils";
import { toast } from "react-toastify";
import ContextMenu from "@/components/shared/context-menu/context-menu";
import CursorTooltip from "@/components/shared/cursor-tooltip";
import { TableLoader } from "@/components/dashboard/widgets/skeletons/table-loader";

interface CommandQueue extends PaperProps {
  commands: QueuedCommand[];
  setViewedResult: (res: string) => void;
  setCommands: (commands: QueuedCommand[]) => void;
  host?: string;
  className?: string;
  refreshQueue: (host_name: string) => Promise<void>;
  setOpen: () => void;
  loading: boolean;
}

export const CommandQueue = ({
  commands,
  setViewedResult,
  host,
  setCommands,
  className,
  refreshQueue,
  setOpen,
  loading,
  ...rest
}: CommandQueue) => {
  const { contextMenuState, showContextMenu, hideContextMenu } =
    useContextMenu();

  const handleShowOutput = (command: QueuedCommand) => {
    let combinedOutput = Object.values(command.output).reduce(
      (accumulator, current) => {
        return accumulator + current.stdout + "\n" + current.stderr + "\n";
      },
      ""
    );

    combinedOutput = `$ ${command.commands[0].command}\n${combinedOutput}`;
    setViewedResult(combinedOutput);
    setOpen();
  };

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

  if (loading && commands.length === 0) {
    return <TableLoader className={classes.loader} />;
  }

  if (commands.length === 0) {
    return null;
  }

  return (
    <Paper className={classes.previousCommands} {...rest}>
      <CustomTable
        headers={["name", "command", "time_created", "status"]}
        className={clsx(classes.table, className)}
      >
        {commands.map((command, index) => (
          <CursorTooltip
            title="View Output"
            key={`${command.commands[0].name}-${index}`}
          >
            <TableRow
              key={index}
              className={classes.row}
              onContextMenu={(event) => handleRightClick(event, command)}
              onClick={() => handleShowOutput(command)}
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
            </TableRow>
          </CursorTooltip>
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
