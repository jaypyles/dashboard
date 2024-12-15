import React from "react";
import Dashboard from "@/components/dashboard/dashboard";
import { store } from "@/app";
import { setIntegrations } from "@/lib/slices/integrations";
import { apiCaller } from "@/lib/services/api-caller";
import { Integration } from "@/lib/types";

const Home = () => {
  React.useEffect(() => {
    apiCaller.integrations().then((res) => {
      store.dispatch(setIntegrations(res as Integration[]));
    });
  }, []);

  return <Dashboard />;
};

export default Home;
