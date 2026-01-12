'use client';

import { useEffect } from 'react';
import { useAnimationControls } from 'framer-motion';

export const useMotionLoader = (intervalMs = 5000) => {
  const controls = useAnimationControls();

  useEffect(() => {
    const runLoader = async () => {
      await controls.start({
        rotate: 360,
        transition: {
          duration: 1,
          ease: 'linear',
          repeat: 5 // 1s × 5 = 5 seconds
        }
      });

      // Reset rotation
      controls.set({ rotate: 0 });
    };

    runLoader();

    const interval = setInterval(runLoader, intervalMs);
    return () => clearInterval(interval);
  }, [controls, intervalMs]);

  return controls;
};
