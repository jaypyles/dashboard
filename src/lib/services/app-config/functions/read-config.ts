import { apiGet } from "@/lib/utils";
import { ServerAppConfig } from "../app-config.types";

const parseAppConfig = (appConfig: ServerAppConfig) => {
  return {
    filesUrl: appConfig.files_url,
  };
};

export const getAppConfig = async () => {
  const appConfig: ServerAppConfig = await apiGet("/api/app-config");

  return parseAppConfig(appConfig);
};
