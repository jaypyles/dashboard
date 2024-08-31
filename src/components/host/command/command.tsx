import classes from "./command.module.css";
import React from "react";
import { Paper, PaperProps } from "@mui/material";

interface CommandProps extends PaperProps {
  commandOutput?: string;
}

const Options = ({ commandOutput, ...rest }: CommandProps): JSX.Element => {
  return (
    <Paper {...rest}>
      <div className={classes.terminal}>
        <pre>{commandOutput}</pre>
      </div>
    </Paper>
  );
};

export default Options;
