import * as React from "react";
import Table, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import classes from "./table.module.css";
import { clsx } from "clsx";

interface CustomTableProps {
  headers: string[];
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function CustomTable({
  headers,
  children,
  title,
  className,
  ...restProps
}: CustomTableProps & TableProps) {
  const label = title ? (
    <Typography className={classes.title}>{title}</Typography>
  ) : undefined;

  return (
    <Paper className={clsx(classes.customTable, className)}>
      {label}
      <TableContainer component={Paper} {...restProps} sx={{ maxHeight: 400 }}>
        <Table
          stickyHeader
          aria-label="simple table"
          className={classes["responsive-table"]}
          sx={{
            tableLayout: "fixed",
            border: "2px solid black",
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} className={classes.header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.map(children, (child) =>
              React.cloneElement(child as React.ReactElement, {
                className: `${classes["zebra-stripe"]} ${classes["hover-row"]}`,
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
