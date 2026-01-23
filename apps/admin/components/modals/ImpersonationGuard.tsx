'use client';

import { configService } from '@/util/config';
import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

export const ImpersonationReturnGuard = () => {
  const handleReturnToAdmin = () => {
    deleteCookie(creatorCookieKey, {
      domain: configService.NEXT_PUBLIC_APP_DOMAINS
    });
  };

  useEffect(() => {
    handleReturnToAdmin();
  }, []);

  return null;
};
