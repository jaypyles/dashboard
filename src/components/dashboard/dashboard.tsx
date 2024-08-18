import React, { useState, useEffect } from "react";
import { fetchAndSet } from "../../lib/utils";
import HostWidget from "./widgets/host/host";

const Dashboard = () => {
  const [hosts, setHosts] = useState<string[]>([]);

  useEffect(() => {
    fetchAndSet("/api/getHosts", setHosts);
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {hosts.map((host, key) => (
        <HostWidget host={host} key={key} />
      ))}
    </>
  );
};

export default Dashboard;
