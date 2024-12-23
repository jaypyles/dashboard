import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import { SettingsMenu } from "../settings-menu";

export type SettingsControlProps = {
  className?: string;
};

export const SettingsControl = ({ className }: SettingsControlProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={className}>
      <label htmlFor="settings-menu">
        <IconButton component="span" onClick={() => setOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </label>
      <SettingsMenu open={open} onClose={() => setOpen(false)} />
    </div>
  );
};
