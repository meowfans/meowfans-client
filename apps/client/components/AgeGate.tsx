'use client';

import { Button } from '@workspace/ui/components/button';
import { ageConfirmationCookieKey } from '@workspace/ui/lib';
import { getCookie, setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isConfirmed = getCookie(ageConfirmationCookieKey);
    if (!isConfirmed) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    setCookie(ageConfirmationCookieKey, 'true', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
    setIsVisible(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="max-w-md w-full bg-secondary/15 border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl space-y-8 text-center"
          >
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-black uppercase italic tracking-tight">Age Verification</h1>
              <p className="text-muted-foreground text-sm uppercase tracking-widest leading-relaxed">
                This website contains adult-oriented content. You must be at least 18 years of age to enter.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={handleConfirm}
                className="rounded-full bg-primary text-white font-black uppercase text-[12px] tracking-widest h-14 w-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                I am 18 or older - Enter
              </Button>
              <Button
                onClick={handleReject}
                variant="ghost"
                className="rounded-full text-muted-foreground font-black uppercase text-[10px] tracking-widest h-12 w-full hover:text-foreground"
              >
                I am under 18 - Exit
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              <AlertTriangle className="h-3 w-3" />
              RTA-5042 Compliance
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
