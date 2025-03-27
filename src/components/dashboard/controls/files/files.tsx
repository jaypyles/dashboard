"use client";

import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import { useRouter } from "next/navigation";
import { useAppConfig } from "@/lib/hooks/use-app-config";

export type FilesProps = {
  className?: string;
};

export const Files = ({ className }: FilesProps) => {
  const router = useRouter();
  const { appConfig } = useAppConfig();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return appConfig.filesUrl ? (
    <div className={className}>
      <IconButton component="span" onClick={() => router.push("/files")}>
        <FindInPageIcon />
      </IconButton>
    </div>
  ) : null;
};
