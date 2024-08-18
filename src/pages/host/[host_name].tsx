import React from "react";
import { useRouter } from "next/router";
import HostOverview from "../../components/shared/host-overview/host-overview";
import { Grid } from "@mui/material";
import classes from "./host_name.module.css";
import CommandTable from "../../components/shared/command/command-table/command-table";
import Options from "../../components/host/options/options";

const HostManager = () => {
  const router = useRouter();
  const { host_name } = router.query;

  return (
    <>
      {host_name && (
        <div className={`${classes.gridWrapper} is-col`}>
          <div className="is-row">
            <HostOverview host={host_name as string} />
            <Options/>
          </div>
          <CommandTable host={host_name as string} />
        </div>
      )}
    </>
  );
};

export default HostManager;
