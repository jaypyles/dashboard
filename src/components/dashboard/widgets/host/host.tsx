import React, { useEffect, useState } from "react";
import { fetchAndSet } from "../../../../lib/utils";

type HostProps = {
  host: string;
};

interface HostStatistics {
  storage: string;
  usage: string;
  cores: string;
  threads: string;
  uptime: string;
}

const HostWidget = ({ host }: HostProps) => {
  const [statistics, setStatistics] = useState<HostStatistics>({
    storage: "",
    usage: "",
    cores: "",
    threads: "",
    uptime: "",
  });

  useEffect(() => {
    fetchAndSet(`/api/${host}/stats`, setStatistics);
  }, [host]);

  return (
    <div>
      <h1>{host}</h1>
      {Object.entries(statistics).map(([key, value]) => (
        <p key={key} style={{ whiteSpace: "pre" }}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default HostWidget;
