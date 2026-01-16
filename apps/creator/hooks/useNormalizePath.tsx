'use client';

import { PathNormalizer } from '@/lib/PathNormalizer';
import { usePathname } from 'next/navigation';
import { useCreator } from './context/useCreator';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';

export const useNormalizePath = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const {
    creator: {
      user: { username }
    }
  } = useCreator();
  const isAuthenticatedPath = PathNormalizer.isAuthenticated({ pathname, username });

  return {
    pathname,
    username,
    normalizedPath: PathNormalizer.resolve({ pathname, username }),
    isAuthenticatedPath,
    isMobilePath: isAuthenticatedPath && isMobile
  };
};
