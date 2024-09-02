import React from "react";

interface ContextMenuProps {
  position: { x: number; y: number } | null;
  options: { label: string; onClick: () => void }[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  options,
  onClose,
}) => {
  if (!position) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.y}px`,
        left: `${position.x}px`,
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
      onClick={onClose}
      onMouseLeave={onClose}
    >
      <ul style={{ margin: 0, padding: "10px", listStyleType: "none" }}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              option.onClick();
              onClose();
            }}
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
