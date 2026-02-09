'use client';

import { cn } from '@workspace/ui/lib/utils';
import { motion, useAnimation, Variants } from 'framer-motion';
import * as React from 'react';
import { useEffect } from 'react';

export interface AnimatedLogoProps extends React.ComponentProps<'svg'> {
  loop?: boolean;
}

export function AnimatedLogo({ className, loop = true, ...props }: AnimatedLogoProps) {
  const controls = useAnimation();
  const [isRunning, setIsRunning] = React.useState(false);

  useEffect(() => {
    let isMounted = true;

    const sequence = async () => {
      if (!isMounted) return;

      while (isMounted && (loop || !isRunning)) {
        // Reset to start position (off-screen left)
        await controls.set('trainStart');

        // Run the "train" across to the middle
        await controls.start('trainRun');

        if (!isMounted) break;

        // Morph into Logo
        await controls.start('morphToLogo');

        if (!isMounted) break;

        // Hold Logo state
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (!isMounted) break;

        if (!loop) {
          setIsRunning(true);
          break;
        }

        // Fade out to restart
        await controls.start({ opacity: 0, transition: { duration: 0.5 } });

        if (!isMounted) break;
      }
    };

    // Start animation after component has mounted
    const timer = setTimeout(() => {
      if (isMounted) {
        sequence();
      }
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, loop]);

  const defs = (
    <defs>
      <linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="18" y1="20" x2="18" y2="80">
        <stop offset="0%" stopColor="#FF3131" />
        <stop offset="100%" stopColor="#FF914D" />
      </linearGradient>
      <linearGradient id="g2" gradientUnits="userSpaceOnUse" x1="18" y1="35" x2="50" y2="65">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <linearGradient id="g3" gradientUnits="userSpaceOnUse" x1="50" y1="65" x2="82" y2="35">
        <stop offset="0%" stopColor="#FF3131" />
        <stop offset="100%" stopColor="#FF914D" />
      </linearGradient>
      <linearGradient id="g4" gradientUnits="userSpaceOnUse" x1="82" y1="20" x2="82" y2="80">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
  );

  // -- ANIMATION VARIANTS --

  // The 4 main strokes act as the "Body" of the train
  const bodyVariants: Variants = {
    trainStart: (i: number) => {
      // Starting positions (off-screen left)
      // i=0: Smokestack (Tall vertical)
      // i=1: Engine Top (Horizontal)
      // i=2: Engine Bottom (Horizontal)
      // i=3: Cabin (Boxy vertical)
      const offset = -120;
      const shapes = [
        `M ${offset + 20} 50 L ${offset + 20} 30`, // Stack
        `M ${offset + 20} 40 L ${offset + 50} 40`, // Top
        `M ${offset + 20} 50 L ${offset + 60} 50`, // Bottom
        `M ${offset + 60} 55 L ${offset + 60} 30` // Cabin Back
      ];
      return {
        d: shapes[i],
        opacity: 1,
        transition: { duration: 0 }
      };
    },
    trainRun: (i: number) => {
      // Moving to center, keeping "Train" shape
      // Center approx x=50
      const center = 20;
      const shapes = [
        `M ${center + 20} 50 L ${center + 20} 30`, // Stack vertical
        `M ${center + 20} 40 L ${center + 50} 40`, // Engine Top horizontal
        `M ${center + 20} 50 L ${center + 60} 50`, // Engine Bottom horizontal
        `M ${center + 60} 55 L ${center + 60} 30` // Cabin Back vertical
      ];
      return {
        d: shapes[i],
        transition: {
          duration: 2,
          ease: 'easeInOut',
          times: [0, 1]
        }
      };
    },
    morphToLogo: (i: number) => {
      const paths = [
        'M 18 80 L 18 35', // Left Vertical
        'M 18 35 L 50 65', // Left Diagonal
        'M 50 65 L 82 35', // Right Diagonal
        'M 82 35 L 82 80' // Right Vertical
      ];
      return {
        d: paths[i],
        transition: { duration: 0.8, type: 'spring', bounce: 0.2 }
      };
    }
  };

  // Extra elements: Wheels & Smoke
  // These disappear during Logo state
  const extraVariants: Variants = {
    trainStart: {
      opacity: 0,
      x: -120
    },
    trainRun: {
      opacity: 1,
      x: 20, // Move with train to center
      transition: { duration: 2, ease: 'easeInOut' }
    },
    morphToLogo: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Rotating wheels animation
  const wheelSpin: Variants = {
    trainStart: { rotate: 0 },
    trainRun: {
      rotate: 720,
      transition: { duration: 2, ease: 'linear' }
    },
    morphToLogo: { rotate: 720 }
  };

  // Smoke puffs
  const smokeVariants: Variants = {
    trainStart: { opacity: 0, scale: 0.5, y: 0, x: -100 },
    trainRun: {
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 1.5],
      y: -30, // Rise up
      x: 30, // Move with train approx
      transition: {
        duration: 1.5,
        repeat: Infinity,
        times: [0, 0.2, 1]
      }
    },
    morphToLogo: { opacity: 0 }
  };

  // Ticks (Logo parts)
  const tickVariants: Variants = {
    trainStart: { opacity: 0, scale: 0, pathLength: 0 },
    trainRun: { opacity: 0, scale: 0 },
    morphToLogo: {
      opacity: 1,
      scale: 1,
      pathLength: 1,
      transition: { delay: 0.5, duration: 0.5 }
    }
  };

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn('h-10 w-10', className)} {...props}>
      {defs}

      {/* --- EXTRA TRAIN PARTS (Wheels & Smoke) --- */}
      <motion.g variants={extraVariants} animate={controls}>
        {/* Wheels - Using Circles */}
        <motion.circle cx="30" cy="55" r="5" stroke="url(#g1)" strokeWidth="3" variants={wheelSpin} />
        <motion.circle cx="50" cy="55" r="5" stroke="url(#g4)" strokeWidth="3" variants={wheelSpin} />

        {/* Smoke */}
        <motion.circle
          cx="20"
          cy="25"
          r="3"
          fill="#ccc"
          variants={{ ...smokeVariants, trainRun: { ...smokeVariants.trainRun, transition: { duration: 1, repeat: 2, delay: 0.5 } } }}
        />
      </motion.g>

      {/* --- MAIN BODY PARTS (Morphing Lines) --- */}
      {/* 0: Smokestack -> Left Vert */}
      <motion.path
        custom={0}
        variants={bodyVariants}
        animate={controls}
        stroke="url(#g1)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 1: Top Body -> Left Diag */}
      <motion.path
        custom={1}
        variants={bodyVariants}
        animate={controls}
        stroke="url(#g2)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2: Bottom Body -> Right Diag */}
      <motion.path
        custom={2}
        variants={bodyVariants}
        animate={controls}
        stroke="url(#g3)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3: Cabin Back -> Right Vert */}
      <motion.path
        custom={3}
        variants={bodyVariants}
        animate={controls}
        stroke="url(#g4)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* --- DECORATION TICKS --- */}
      <motion.path
        d="M18 35 L 18 20 L 40 35"
        variants={tickVariants}
        animate={controls}
        stroke="url(#g1)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M82 35 L 82 20 L 60 35"
        variants={tickVariants}
        animate={controls}
        stroke="url(#g4)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
