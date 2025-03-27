import { RootState } from "@/app";
import { useSelector } from "react-redux";
import { AppConfig } from "../services/app-config/app-config.types";
import { setAppConfig } from "../slices/app-config";
import { useDispatch } from "react-redux";

export const useAppConfig = () => {
  const dispatch = useDispatch();
  const appConfig = useSelector((state: RootState) => state.appConfig);

  return {
    appConfig,
    setNewAppConfig: (appConfig: AppConfig) =>
      dispatch(setAppConfig(appConfig)),
  };
};
