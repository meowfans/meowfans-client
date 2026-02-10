'use client';

import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';

interface LoadingComponentProps {
  loadingText: string;
}

export const LoadingComponent = ({ loadingText }: LoadingComponentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4"
    >
      <div className="relative">
        <Loading />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
        />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 animate-pulse">
          {loadingText || 'Loading...'}
        </p>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="h-1 w-1 rounded-full bg-primary/40"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
