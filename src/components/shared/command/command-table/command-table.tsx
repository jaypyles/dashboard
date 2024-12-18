import React, { useEffect, useState } from "react";
import { deleteCommand, fetchAndSet } from "@/lib/utils";
import { Command } from "@/lib/types";
import CustomTable from "../../table/table";
import { TableRow, TableCell } from "@mui/material";
import classes from "./command-table.module.css";
import ContextMenu from "../../context-menu/context-menu";
import { useContextMenu } from "@/lib/hooks/useContextMenu";
import { useToast } from "@/lib/hooks/useToast";
import CursorTooltip from "@/components/shared/cursor-tooltip";
import { TableLoader } from "@/components/dashboard/widgets/skeletons/table-loader";

interface CommandTableProps {
  host: string;
  className?: string;
  refreshQueue: (host_name: string) => Promise<void>;
}

const CommandTable = ({ host, refreshQueue, className }: CommandTableProps) => {
  const toast = useToast();
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const { contextMenuState, showContextMenu, hideContextMenu } =
    useContextMenu();

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
            toast.showToast(res.reason, "success");
          }
        },
      },
    ]);
  };

  const handleCommandRun = async (command_name: string) => {
    await fetch(`/api/${host}/command/${command_name}`);
    await refreshQueue(host);
    toast.showToast("Command added to queue successfully", "success");
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

    setLoading(false);
  }, [host]);

  if (loading && commands.length === 0) {
    return <TableLoader className={classes.loader} />;
  }

  return (
    <>
      <CustomTable headers={["name", "command", "args"]} className={className}>
        {commands
          .filter((command) => command.type !== "system")
          .map((command, index) => (
            <CursorTooltip title="Run Command" key={`${command.name}-${index}`}>
              <TableRow
                key={index}
                onContextMenu={(event) => handleRightClick(event, command)}
                className={classes.row}
                onClick={() => handleCommandRun(command.name)}
              >
                <TableCell component="th" scope="row" className={classes.name}>
                  <a
                    className={classes.command}
                    onClick={() => handleCommandRun(command.name)}
                  >
                    {command.name}
                  </a>
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
              </TableRow>
            </CursorTooltip>
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
