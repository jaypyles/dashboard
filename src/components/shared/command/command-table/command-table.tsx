import React, { useEffect, useState } from "react";
import { deleteCommand, fetchAndSet } from "../../../../lib/utils";
import { Command } from "../../../../lib/types";
import CustomTable from "../../table/table";
import { Button, TableRow, TableCell } from "@mui/material";
import classes from "./command-table.module.css";
import ContextMenu from "../../context-menu/context-menu";
import { useContextMenu } from "../../../hooks/useContextMenu";
import { toast } from "react-toastify";
import { useToast } from "../../../hooks/useToast";

interface CommandTableProps {
  host: string;
  refreshQueue: (host_name: string) => Promise<void>;
}

const CommandTable = ({ host, refreshQueue }: CommandTableProps) => {
  const [commands, setCommands] = useState<Command[]>([]);
  const { contextMenuState, showContextMenu, hideContextMenu } =
    useContextMenu();
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { showToast } = useToast();

  const handleRightClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    command: Command
  ) => {
    setSelectedCommand(command);
    showContextMenu(event, [
      {
        label: "Delete Command",
        onClick: async () => {
          if (selectedCommand) {
            const res = await deleteCommand({
              host: host,
              command: selectedCommand,
            });
            setCommands((prevCommands) =>
              prevCommands.filter((cmd) => cmd.name !== selectedCommand.name)
            );
            toast.success(res.reason);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const handleCommandAdded = () => {
      fetchAndSet(`/api/${host}/commands`, setCommands);
    };

    window.addEventListener(
      "commandAdded",
      handleCommandAdded as EventListener
    );

    return () => {
      window.removeEventListener(
        "commandAdded",
        handleCommandAdded as EventListener
      );
    };
  }, [host]);

  useEffect(() => {
    fetchAndSet(`/api/${host}/commands`, setCommands);
  }, [host]);

  const handleCommandRun = async (command_name: string) => {
    await fetch(`/api/${host}/command/${command_name}`);
    await refreshQueue(host);
  };

  return (
    <>
      <CustomTable
        headers={["name", "command", "args", "run"]}
        title="Command Table"
      >
        {commands
          .filter((command) => command.type !== "system")
          .map((command, index) => (
            <TableRow
              key={index}
              onContextMenu={(event) => handleRightClick(event, command)}
            >
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
      <ContextMenu
        position={contextMenuState.position}
        options={contextMenuState.options}
        onClose={hideContextMenu}
      />
    </>
  );
};

export default CommandTable;
