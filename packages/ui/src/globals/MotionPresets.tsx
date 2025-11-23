'use client';

import { AnimatePresence, motion, MotionProps } from 'framer-motion';

export type AnimationType = 'SlideLeftToRight' | 'SlideRightToLeft' | 'SlideBottomUp';

interface MotionPresetsProps {
  children: React.ReactNode;
  motionType: AnimationType;
}

interface AwaitedMotionPresetsProps {
  children: React.ReactNode;
  motionType: AnimationType;
  mode?: 'sync' | 'popLayout' | 'wait';
}

export const effects: Record<AnimationType, MotionProps> = {
  SlideBottomUp: {
    initial: { y: '100vh', position: 'fixed' },
    animate: { y: 0, position: 'static' },
    transition: { ease: 'easeIn', duration: 0.3 }
  },
  SlideRightToLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.6 }
  },
  SlideLeftToRight: {
    initial: { x: '-100vw', minHeight: '100vh' },
    animate: { x: 0 },
    transition: { ease: 'easeIn', duration: 0.3 }
  }
};

export const MotionPresets: React.FC<MotionPresetsProps> = ({ children, motionType }) => {
  return <motion.div {...effects[motionType]}>{children}</motion.div>;
};

export const AwaitedMotionPresets: React.FC<AwaitedMotionPresetsProps> = ({ children, motionType, mode }) => {
  return (
    <AnimatePresence mode={mode}>
      <motion.div {...effects[motionType]}>{children}</motion.div>
    </AnimatePresence>
  );
};
