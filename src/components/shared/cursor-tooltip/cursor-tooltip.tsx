import { Tooltip } from "@mui/material";
import { useState } from "react";

interface CursorTooltipProps {
  title: string;
  children: React.ReactElement;
}

export const CursorTooltip: React.FC<CursorTooltipProps> = ({
  title,
  children,
}) => {
  const [position, setPosition] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({ x: undefined, y: undefined });

  return (
    <Tooltip
      title={title}
      onMouseMove={(e) => setPosition({ x: e.pageX, y: e.pageY - 60 })}
      PopperProps={{
        anchorEl: {
          clientHeight: 0,
          clientWidth: 0,
          getBoundingClientRect: () => ({
            top: position.y ?? 0,
            left: position.x ?? 0,
            right: position.x ?? 0,
            bottom: position.y ?? 0,
            width: 0,
            height: 0,
            x: position.x ?? 0,
            y: position.y ?? 0,
            toJSON: () => ({
              top: position.y ?? 0,
              left: position.x ?? 0,
              right: position.x ?? 0,
              bottom: position.y ?? 0,
              width: 0,
              height: 0,
              x: position.x ?? 0,
              y: position.y ?? 0,
            }),
          }),
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
