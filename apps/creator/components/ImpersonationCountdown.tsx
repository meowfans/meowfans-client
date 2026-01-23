'use client';

import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { buildSafeUrl, decodeJwtToken } from '@workspace/ui/lib/helpers';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ImpersonationCountdown = () => {
  const router = useRouter();
  const creatorAuthCookieKey = getCookie(creatorCookieKey) as string;
  const decodedToken = decodeJwtToken(creatorAuthCookieKey);
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    if (!decodedToken?.impersonating || !decodedToken.exp) {
      setRemainingMs(null);
      return;
    }

    const expiresAtMs = decodedToken.exp * 1000;

    const tick = () => {
      const delta = expiresAtMs - Date.now();
      setRemainingMs(delta > 0 ? delta : 0);
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [decodedToken?.impersonating, decodedToken?.exp]);

  useEffect(() => {
    if (remainingMs === 0) {
      toast.warning('Impersonation session has ended');
      window.location.href = buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL });
      deleteCookie(creatorCookieKey, {
        domain: configService.NEXT_PUBLIC_APP_DOMAINS
      });
    }
  }, [remainingMs]);

  if (remainingMs === null) return null;

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  const handleCancelImpersonation = () => {
    deleteCookie(creatorCookieKey, {
      domain: configService.NEXT_PUBLIC_APP_DOMAINS
    });
    window.location.href = buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL });
  };

  return (
    <div className="sticky top-0 z-50 flex flex-row justify-between content-center bg-yellow-100">
      <p className=" text-yellow-900 text-sm px-4 py-2 text-center">
        Impersonation session ends in {minutes}:{seconds.toString().padStart(2, '0')}
      </p>

      <Button className="cursor-pointer m-2" onClick={handleCancelImpersonation}>
        End impersonation
      </Button>
    </div>
  );
};
