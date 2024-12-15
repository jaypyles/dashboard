import React from "react";
import Dashboard from "@/components/dashboard/dashboard";
import { store } from "@/app";
import { setIntegrations } from "@/lib/slices/integrations";
import { apiCaller } from "@/lib/services/api-caller";

const Home = () => {
  React.useEffect(() => {
    apiCaller.integrations().then((res) => {
      store.dispatch(setIntegrations(res as string[]));
    });
  }, []);

  return <Dashboard />;
};

export default Home;
