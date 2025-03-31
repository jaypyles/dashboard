import { useEffect } from "react";

export const usePollingEffect = (
  fn: () => void,
  interval: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[],
  callOnMount = true,
  polling = true
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
