'use client';

import { authenticatedPaths } from '@/lib/constants';
import { PathNormalizer } from '@workspace/ui/hooks/PathNormalizer';
import { useIsMobile } from '@workspace/ui/hooks/useIsMobile';
import { useParams, usePathname } from 'next/navigation';
import { useCreator } from './context/useCreator';

export const useNormalizePath = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const {
    creator: {
      user: { username }
    }
  } = useCreator();

  PathNormalizer.setAuthenticatedPaths(authenticatedPaths);
  const isAuthenticatedPath = PathNormalizer.isAuthenticated({ pathname, username });

  return {
    pathname,
    username,
    normalizedPath: PathNormalizer.resolve({ pathname, username }),
    isAuthenticatedPath,
    isMobilePath: isAuthenticatedPath && isMobile && !pathname.startsWith(`/channels/${channelId}`)
  };
};
