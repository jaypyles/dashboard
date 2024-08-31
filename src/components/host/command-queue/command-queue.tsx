import classes from "./command-queue.module.css";
import React, { useEffect } from "react";
import { IconButton, Paper, PaperProps, Typography } from "@mui/material";
import CustomTable from "../../shared/table/table";
import { Button, TableRow, TableCell } from "@mui/material";
import { Command, QueuedCommand } from "../../../lib/types";
import { clsx } from "clsx";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface CommandQueue extends PaperProps {
  commands: QueuedCommand[];
  setViewedResult: (res: string) => void;
  host?: string;
  refreshQueue: (host_name: string) => Promise<void>;
  setOpen: () => void;
}

export const CommandQueue = ({
  commands,
  setViewedResult,
  host,
  refreshQueue,
  setOpen,
  ...rest
}: CommandQueue): JSX.Element => {
  useEffect(() => {
    if (host) {
      const intervalId = setInterval(() => {
        refreshQueue(host);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [host]);

  return (
    <Paper {...rest}>
      <CustomTable
        headers={["name", "command", "time_created", "status", "result"]}
        className="full"
      >
        {commands.map((command, index) => (
          <TableRow key={index}>
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
    </Paper>
  );
};
