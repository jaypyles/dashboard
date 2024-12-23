import { RootState } from "@/app";
import { useSelector } from "react-redux";
import { setSettings } from "../slices/settings";
import { Settings } from "../types";

export const useGetSettings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  return settings;
};

export const useSetSettings = (settings: Settings) => {
  setSettings(settings);
};
