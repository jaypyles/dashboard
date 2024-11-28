import { RootState } from "@/app";

import { useSelector } from "react-redux";

export const useGetIntegrations = () => {
  const integrations = useSelector(
    (state: RootState) => state.integrations.integrations
  );
  return integrations;
};

export default useGetIntegrations;
