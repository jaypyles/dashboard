import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import classes from "./integration.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

type IntegrationProps = {
  icon?: string;
  title: string;
  data: string[];
  link?: string;
};

const Integration = ({ icon, title, data, link }: IntegrationProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(link!);
  };

  return (
    <Paper
      className={clsx(classes.integration, { [classes.link]: link })}
      onClick={() => {
        if (link) {
          handleNavigate();
        }
      }}
    >
      {icon && (
        <Image
          src={icon}
          alt="integration icon"
          className={classes.icon}
          height={64}
          width={64}
          unoptimized
        />
      )}
      <Typography className={classes.title}>{title}</Typography>
      {data.map((item) => (
        <Typography className={classes.data}>{item}</Typography>
      ))}
    </Paper>
  );
};

export default Integration;
