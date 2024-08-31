import classes from "./terminal.module.css";
import React from "react";
import { Paper, PaperProps } from "@mui/material";
import { Dialog, DialogContent } from "@mui/material";

interface TerminalProps extends PaperProps {
  output: string;
  handleClose: () => void;
  open: boolean;
}

const Terminal = ({
  output,
  handleClose,
  open,
  ...rest
}: TerminalProps): JSX.Element => {
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={true}>
      <DialogContent>
        <Paper {...rest}>
          <div className={classes.terminal}>
            <pre>{output}</pre>
          </div>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default Terminal;
