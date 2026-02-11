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
        <LoadingComponent key="loading" loadingText={LOADING_TEXTS[currentPath]} />
      ) : isEmpty ? (
        <EmptyComponent key="empty" path={currentPath} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
