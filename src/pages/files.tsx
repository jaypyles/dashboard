"use client";

import React from "react";
import { useAppConfig } from "@/lib/hooks/use-app-config";

const IframeComponent = () => {
  const { appConfig } = useAppConfig();

  if (!appConfig.filesUrl) {
    return null;
  }

  return (
    <iframe
      src={appConfig.filesUrl}
      style={{ width: "100%", height: "100%", border: "none" }}
      title="Files"
    />
  );
};

export default IframeComponent;
