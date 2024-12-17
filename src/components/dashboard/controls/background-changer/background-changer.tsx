import { IconButton } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/UploadFile";
import React from "react";

export type BackgroundChangerProps = {
  className?: string;
};

export const BackgroundChanger = ({ className }: BackgroundChangerProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("/api/config/background", {
        method: "POST",
        body: formData,
      }).then(() => window.location.reload());
    }
  };

  return (
    <div className={className}>
      <input
        accept=".png,.jpeg,.jpg"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <IconButton component="span">
          <FileUploadIcon />
        </IconButton>
      </label>
    </div>
  );
};
