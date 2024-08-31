import React, { useEffect, useState } from "react";
import { fetchAndSet } from "../../../../lib/utils";
import { Command } from "../../../../lib/types";
import CustomTable from "../../table/table";
import { Button, TableRow, TableCell } from "@mui/material";
import classes from "./command-table.module.css";

interface CommandTableProps {
  host: string;
  refreshQueue: (host_name: string) => Promise<void>;
}

const CommandTable = ({ host, refreshQueue }: CommandTableProps) => {
  const [commands, setCommands] = useState<Command[]>([]);
  useEffect(() => {
    fetchAndSet(`/api/${host}/commands`, setCommands);
  }, [host]);

  const handleCommandRun = async (command_name: string) => {
    const response = await fetch(`/api/${host}/command/${command_name}`);
    const json = await response.json();

    await refreshQueue(host);
  };

  return (
    <CustomTable
      headers={["name", "command", "args", "run"]}
      title="Command Table"
    >
      {commands
        .filter((command) => command.type !== "system")
        .map((command, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row" className={classes.name}>
              {command.name}
            </TableCell>
            <TableCell component="th" scope="row">
              {command.command}
            </TableCell>
            <TableCell component="th" scope="row">
              {command.args.map((arg) => (
                <>
                  <p>{arg.flag}</p>
                  <p>{arg.value}</p>
                </>
              ))}
            </TableCell>
            <TableCell component="th" scope="row">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCommandRun(command.name)}
              >
                Run
              </Button>
            </TableCell>
          </TableRow>
        ))}
    </CustomTable>
  );
};

export default CommandTable;
