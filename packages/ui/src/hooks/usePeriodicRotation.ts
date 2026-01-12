import { useEffect, useState } from 'react';

export const usePeriodicRotation = (intervalMs = 5000) => {
  const [rotate, setRotate] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate(true);

      setTimeout(() => setRotate(false), 2000);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return rotate;
};
