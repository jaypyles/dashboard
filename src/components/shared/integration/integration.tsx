import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import classes from "./integration.module.css";
import Image from "next/image";
import { clsx } from "clsx";
import { useSettings } from "@/lib/hooks/useSettings";
import { hexToRgba } from "@/lib/utils";

type IntegrationProps = {
  icon?: string;
  title: string;
  data?: string[];
  link?: string;
  children?: React.ReactNode;
};

const Integration = ({
  icon,
  title,
  data,
  link,
  children,
}: IntegrationProps) => {
  const { settings } = useSettings();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const cardColor = hexToRgba(settings.cardColor, 0.75);
  const hoverCardColor = hexToRgba(settings.cardColor, 1);

  return (
    <Paper
      className={clsx(classes.integration, {
        [classes.link as string]: link,
      })}
      onClick={handleClick}
      style={{
        backgroundColor: isHovered ? hoverCardColor : cardColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {data &&
        data.map((item, index) => (
          <Typography key={index} className={classes.data}>
            {item}
          </Typography>
        ))}
      {children}
    </Paper>
  );
};

export default Integration;
