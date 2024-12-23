import { useEffect } from "react";

export const usePollingEffect = (
  fn: () => void,
  interval: number,
  deps: any[],
  callOnMount: boolean = true,
  polling: boolean = true
) => {
  useEffect(() => {
    if (callOnMount) {
      fn();

      if (!polling) {
        return;
      }
    }

    const intervalId = setInterval(fn, interval);
    return () => clearInterval(intervalId);
  }, [...deps]);
};
