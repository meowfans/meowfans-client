'use client';

import { APP_PATHS } from '@/lib/constants/feature-paths';
import { LOADING_TEXTS } from '@/lib/constants/loading-texts';
import { resolvePathName } from '@workspace/ui/lib/helpers';
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
  if (isLoading) {
    return <LoadingComponent loadingText={LOADING_TEXTS[path || resolvePathName(pathname) as APP_PATHS]} />;
  }

  if (isEmpty) {
    return <EmptyComponent path={path || resolvePathName(pathname) as APP_PATHS} />;
  }
  return <>{children}</>;
};
