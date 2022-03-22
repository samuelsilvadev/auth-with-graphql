import { useEffect, useState } from "react";

export function useDelayedLoading(loading: boolean) {
  const [delayedLoadingTracker, setDelayedLoadingTracker] = useState(loading);

  useEffect(() => {
    if (loading) {
      setDelayedLoadingTracker(true);
      return;
    }

    const timerId = window.setTimeout(() => {
      setDelayedLoadingTracker(false);
    }, 250);

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
    };
  }, [loading]);

  return delayedLoadingTracker;
}
