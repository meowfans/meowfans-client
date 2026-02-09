'use client';

import { useImpersonationStore } from '@/hooks/store/impersonation.store';
import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { creatorCookieKey } from '@workspace/ui/lib/constants';
import { buildSafeUrl } from '@workspace/ui/lib/helpers';
import { deleteCookie, getCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { Clock, ShieldAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface JwtUser {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
  impersonating: boolean;
}

export function ImpersonationTimer() {
  const { isImpersonating, expirationTime, setIsImpersonating, setExpirationTime } = useImpersonationStore();
  const [timeLeft, setTimeLeft] = useState<string>('');
  const { logout } = useAPI();

  useEffect(() => {
    const token = getCookie(creatorCookieKey);
    if (token) {
      try {
        const decoded = jwtDecode<JwtUser>(token as string);
        if (decoded.impersonating && decoded.exp) {
          setIsImpersonating(true);
          setExpirationTime(decoded.exp * 1000);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, [setIsImpersonating, setExpirationTime]);

  useEffect(() => {
    if (!isImpersonating || !expirationTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expirationTime - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft('00:00');
        logout();
        return;
      }

      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isImpersonating, expirationTime, logout]);

  const handleCancel = () => {
    deleteCookie(creatorCookieKey, { domain: configService.NEXT_PUBLIC_APP_DOMAINS });
    window.location.href = buildSafeUrl({ host: configService.NEXT_PUBLIC_ADMIN_URL });
  };

  if (!isImpersonating) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-amber-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-2 md:gap-3 font-bold border-2 border-white/20 backdrop-blur-md mx-auto"
      >
        <div className="bg-white/20 p-1.5 rounded-full animate-pulse shrink-0">
          <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />
        </div>
        <span className="text-[10px] md:text-xs uppercase tracking-wider hidden sm:inline whitespace-nowrap">Impersonating Session</span>
        <div className="flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-md font-mono shrink-0">
          <Clock className="w-3 h-3" />
          <span className="text-xs md:text-sm">{timeLeft}</span>
        </div>
        <button
          onClick={handleCancel}
          className="bg-white/20 hover:bg-white/30 p-1 rounded-full text-white transition-colors shrink-0 ml-1"
          aria-label="Cancel Impersonation"
        >
          <X className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
