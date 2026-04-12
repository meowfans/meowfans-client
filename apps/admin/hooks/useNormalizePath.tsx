'use client';

import { authenticatedPaths } from '@/lib/constants';
import { PathNormalizer } from '@workspace/ui/hooks/PathNormalizer';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { usePathname } from 'next/navigation';
import { useAdmin } from './context/AdminContextWrapper';

export const useNormalizePath = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const {
    admin: {
      user: { username }
    }
  } = useAdmin();

  PathNormalizer.setAuthenticatedPaths(authenticatedPaths);
  const isAuthenticatedPath = PathNormalizer.isAuthenticated({ pathname, username });

  return {
    pathname,
    username,
    normalizedPath: PathNormalizer.resolve({ pathname, username }),
    isAuthenticatedPath,
    isMobilePath: isAuthenticatedPath && isMobile
  };
};
