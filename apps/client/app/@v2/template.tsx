'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
