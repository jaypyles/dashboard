import * as React from "react";
import Table, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface CustomTableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function CustomTable({
  headers,
  children,
  ...restProps
}: CustomTableProps & TableProps) {
  return (
    <Paper>
      <TableContainer component={Paper} {...restProps} sx={{ maxHeight: 400 }}>
        <Table
          stickyHeader
          aria-label="simple table"
          sx={{ minWidth: 650, tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
