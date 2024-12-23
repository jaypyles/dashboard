import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { ColorChanger } from "./color-changer";

export type SettingsMenuProps = {
  open: boolean;
  onClose: () => void;
};

export const SettingsMenu = ({ open, onClose }: SettingsMenuProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
      <DialogContent>
        <ColorChanger />
      </DialogContent>
    </Dialog>
  );
};
