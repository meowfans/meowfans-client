'use client';

import useAPI from '@/hooks/useAPI';
import { configService } from '@/util/config';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ApplyTheme } from '@workspace/ui/globals/ApplyTheme';
import { buildSafeUrl } from '@workspace/ui/lib';
import { motion } from 'framer-motion';
import { Clock, Loader2, Mail, ShieldCheck, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function WaitingApprovalView() {
  const router = useRouter();
  const { logout } = useAPI();

  const handleSwitch = () => {
    logout();
    router.push(buildSafeUrl({ host: configService.NEXT_PUBLIC_AUTH_URL }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-12 flex items-center justify-center overflow-x-hidden relative">
      {/* Animated purely decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(220,38,38,0.05),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.05),_transparent_50%)]" />

      <div className="max-w-4xl w-full relative z-10 space-y-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.2em] italic border border-primary/20">
                <ShieldCheck className="h-4 w-4" /> Application Received
              </div>
              <h1 className="text-5xl md:text-6xl  leading-tight">
                Review in <span className="text-primary">Progress</span>
              </h1>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                Your creator application is currently being analyzed by our verification council. We aim for excellence, which takes a
                little time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Estimated Time</p>
                  <p className="text-xl font-bold">24 - 48 Hours</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">Requested</p>
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                className="h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-widest text-xs gap-3"
                onClick={() => router.refresh()}
              >
                Check Status Again
              </Button>
              <Button
                variant="ghost"
                className="h-14 rounded-2xl font-bold uppercase tracking-widest text-xs gap-3 text-muted-foreground hover:text-white"
              >
                <Mail className="h-4 w-4" /> Contact Support
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-none bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl ">While You Wait...</h3>
                  <p className="text-muted-foreground text-sm font-medium">Explore what&apos;s waiting for you inside the domain.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: 'Global Recognition', desc: 'Reach millions of active fans.', icon: Sparkles, color: 'text-yellow-500' },
                    { title: 'Instant Payouts', desc: 'Withdraw earnings in real-time.', icon: Zap, color: 'text-blue-500' },
                    { title: 'Creator Tools', desc: 'Advanced analytics & AI tools.', icon: TrendingUp, color: 'text-primary' }
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors"
                    >
                      <div className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${feature.color}`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-black italic uppercase tracking-tight text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground font-medium">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 italic">Domain Expansion Coming Soon</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
