import { useState } from "react";

interface ContextMenuOption {
  label: string;
  onClick: () => void;
}

interface ContextMenuState {
  position: { x: number; y: number } | null;
  options: ContextMenuOption[];
}

export const useContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    position: null,
    options: [],
  });

  const showContextMenu = (
    event: React.MouseEvent,
    options: ContextMenuOption[]
  ) => {
    event.preventDefault();
    setContextMenuState({
      position: { x: event.pageX, y: event.pageY },
      options,
    });
  };

  const hideContextMenu = () => {
    setContextMenuState({ position: null, options: [] });
  };

  return {
    contextMenuState,
    showContextMenu,
    hideContextMenu,
  };
};
