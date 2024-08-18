import classes from "./options.module.css";
import React from "react";
import { Paper, PaperProps } from "@mui/material";

interface OptionsProps extends PaperProps {}

const Options = ({ ...rest }: OptionsProps): JSX.Element => {
  return <Paper {...rest}>Options go here</Paper>;
};

export default Options;
