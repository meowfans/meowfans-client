'use client';

import { APP_PATHS } from '@/lib/constants/feature-paths';
import { LOADING_TEXTS } from '@/lib/constants/loading-texts';
import { resolvePathName } from '@workspace/ui/lib/helpers';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { EmptyComponent } from './EmptyComponent';
import { LoadingComponent } from './LoadingComponent';

interface PageHandlerProps {
  children: React.ReactNode;
  isLoading: boolean;
  isEmpty: boolean;
  path?: APP_PATHS;
}

export const PageHandler = ({ children, isLoading, isEmpty, path }: PageHandlerProps) => {
  const pathname = usePathname();
  const currentPath = path || (resolvePathName(pathname) as APP_PATHS);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingComponent key="loading" loadingText={LOADING_TEXTS[currentPath] || 'Loading...'} />
      ) : isEmpty ? (
        <EmptyComponent key={`empty-${currentPath}`} path={currentPath} />
      ) : (
        <motion.div
          key={`content-${currentPath}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
