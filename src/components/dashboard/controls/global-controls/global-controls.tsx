import React from "react";
import { SettingsControl } from "../settings/settings-control";
import { BackgroundChanger } from "../background-changer";
import { Files } from "../files";
import classes from "./global-controls.module.css";

export const GlobalControls = () => {
  return (
    <div className={classes.controls}>
      <div className={classes.controlsGroup}>
        <SettingsControl />
        <BackgroundChanger />
        <Files />
      </div>
    </div>
  );
};
