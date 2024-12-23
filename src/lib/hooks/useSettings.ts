import { RootState } from "@/app";
import { useSelector } from "react-redux";
import { Settings } from "../types";
import { setSettings } from "../slices/settings";
import { useDispatch } from "react-redux";

export const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);

  return {
    settings,
    setNewSettings: (settings: Settings) => dispatch(setSettings(settings)),
  };
};
