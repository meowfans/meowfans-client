'use client';

import useAPI from '@/hooks/useAPI';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { motion } from 'framer-motion';
import { AlertTriangle, Mail, RefreshCw, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RejectedViewProps {
  reason?: string;
}

export function RejectedView({ reason = 'Your profile did not meet our current community guidelines.' }: RejectedViewProps) {
  const router = useRouter();
  const { logout } = useAPI();

  const handleSwitch = () => {
    logout();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-12 flex items-center justify-center overflow-x-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.1),_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full relative z-10 space-y-6"
      >
        <div className="flex justify-end items-center gap-4">
          <ApplyTheme />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground font-bold uppercase tracking-widest text-[10px]"
            onClick={handleSwitch}
          >
            Switch Account
          </Button>
        </div>
        <Card className="border-none bg-black/60 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-red-500/10 text-center space-y-8">
          <div className="space-y-4">
            <div className="h-20 w-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 mx-auto border border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
              <XCircle className="h-10 w-10" />
            </div>
            <h1 className="text-4xl  leading-none pt-4">
              Access <span className="text-red-500">Denied</span>
            </h1>
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic flex items-center justify-center gap-2">
                <AlertTriangle className="h-3 w-3" /> Rejection Reason
              </p>
              <p className="text-muted-foreground text-sm font-medium italic">&quot;{reason}&quot;</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            Our verification process is rigorous to maintain the highest standard of content and community safety. Unfortunately, your
            current application couldn&apos;t be approved.
          </p>

          <div className="space-y-3 pt-4">
            <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-black italic uppercase tracking-widest gap-3 shadow-xl shadow-white/10">
              <RefreshCw className="h-4 w-4" /> Re-apply with better details
            </Button>
            <Button
              variant="ghost"
              className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs gap-3 text-muted-foreground hover:text-white"
            >
              <Mail className="h-4 w-4" /> Appeal Decision
            </Button>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">MeowFans Verification Council</p>
        </Card>
      </motion.div>
    </div>
  );
}
