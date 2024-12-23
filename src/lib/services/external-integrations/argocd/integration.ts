import { apiGet } from "@/lib/utils";
import { ArgoCDData } from "./integration.types";

export const getApplications = async () => {
  const applications: ArgoCDData[] = await apiGet(
    "/api/integrations/argocd/applications"
  );

  return applications;
};
