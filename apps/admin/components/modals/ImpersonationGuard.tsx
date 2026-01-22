'use client';

import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

export const ImpersonationReturnGuard = () => {
  const handleReturnToAdmin = () => {
    deleteCookie(creatorCookieKey);
  };

  useEffect(() => {
    handleReturnToAdmin();
  }, []);

  return null;
};
