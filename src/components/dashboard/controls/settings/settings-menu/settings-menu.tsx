import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { useGetSettings } from "@/lib/hooks/useGetSettings";
import { setSettings } from "@/lib/slices/settings";
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";

export type SettingsMenuProps = {
  open: boolean;
  onClose: () => void;
};

export const SettingsMenu = ({ open, onClose }: SettingsMenuProps) => {
  const settings = useGetSettings();
  const dispatch = useDispatch();
  const [color, setColor] = useState({ hex: settings.cardColor });

  const handleChange = (color: ColorResult) => {
    setColor(color);
    dispatch(setSettings({ cardColor: `${color.hex}85` }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Card Colors</span>
          <Divider />
          <SketchPicker
            className="w-[20rem]"
            color={color.hex}
            onChange={handleChange}
            onChangeComplete={handleChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
