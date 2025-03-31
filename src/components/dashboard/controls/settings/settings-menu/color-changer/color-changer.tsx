import React from "react";
import { useSettings } from "@/lib/hooks/useSettings";
import { ColorResult, SketchPicker } from "react-color";
import { useState } from "react";
import { Divider } from "@mui/material";

export const ColorChanger = () => {
  const { settings, setNewSettings } = useSettings();
  const [color, setColor] = useState({ hex: settings.cardColor });

  const handleChange = (color: ColorResult) => {
    setColor(color);
    setNewSettings({ cardColor: `${color.hex}85` });
  };

  return (
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
  );
};
