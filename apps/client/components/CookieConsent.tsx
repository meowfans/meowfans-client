'use client';

import { Button } from '@workspace/ui/components/button';
import { cookieConsentCookieKey } from '@workspace/ui/lib';
import { getCookie, setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = getCookie(cookieConsentCookieKey);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie(cookieConsentCookieKey, 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/'
    });
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Even if declined, we store it to stop showing the banner,
    // but in a real app, you might disable non-essential cookies.
    setCookie(cookieConsentCookieKey, 'false', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/'
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[90] flex justify-center pointer-events-none"
        >
          <div className="max-w-4xl w-full bg-background/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-6">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Cookie className="h-7 w-7 text-primary" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-lg font-black uppercase italic tracking-tight">Cookie Consent</h3>
              <p className="text-muted-foreground text-xs uppercase tracking-widest leading-relaxed max-w-2xl">
                We use cookies to enhance your experience, analyze our traffic, and for security purposes. By clicking &quot;Accept
                All&quot;, you consent to our use of cookies. Read our{' '}
                <Link href="/legal/privacy" className="text-primary hover:underline underline-offset-4">
                  Privacy Policy
                </Link>{' '}
                for more details.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Button
                variant="ghost"
                onClick={handleDecline}
                className="rounded-full text-muted-foreground font-black uppercase text-[10px] tracking-widest h-12 flex-1 md:flex-none px-6 hover:text-foreground"
              >
                Decline
              </Button>
              <Button
                onClick={handleAccept}
                className="rounded-full bg-primary text-white font-black uppercase text-[10px] tracking-widest h-12 flex-1 md:flex-none px-8 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Accept All
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors md:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
