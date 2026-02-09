'use client';

import { useSingleReport } from '@/hooks/useReports';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Fingerprint, ShieldAlert, Sparkles, User } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { report, loading } = useSingleReport(id);

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Loading />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 animate-pulse">
          Decrypting Moderation Log
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 rounded-[2.5rem] bg-secondary/20 p-8 shadow-2xl">
          <ShieldAlert className="h-12 w-12 text-muted-foreground/30" />
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Report Not Found</h2>
        <p className="mt-2 text-muted-foreground max-w-xs opacity-60 text-sm font-medium">
          This moderation entry may have been archived or deleted from the transparency system.
        </p>
        <Button
          onClick={() => router.push('/reports')}
          variant="link"
          className="mt-6 text-primary font-black uppercase italic tracking-widest text-xs"
        >
          Return to List
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Immersive Backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-b opacity-5 ${
            report.status === 'RESOLVED' ? 'from-emerald-500' : 'from-amber-500'
          } to-transparent`}
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto w-full max-w-3xl px-4 py-8 md:py-12">
          {/* Navigation & Status Header */}
          <div className="mb-10 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-2xl bg-secondary/20 hover:bg-secondary/40 border border-white/5 shadow-xl transition-all active:scale-95"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Badge
              className={`rounded-full px-5 py-2 font-black text-xs uppercase tracking-[0.2em] shadow-lg ${
                report.status === 'RESOLVED'
                  ? 'bg-emerald-500 text-emerald-foreground shadow-emerald-500/20'
                  : 'bg-amber-500 text-amber-foreground shadow-amber-500/20'
              }`}
            >
              {report.status}
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="overflow-hidden border border-white/5 bg-secondary/[0.03] backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2.5rem] md:rounded-[3.5rem]">
              <CardContent className="p-8 md:p-14">
                {/* ID & Date Section */}
                <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-white/5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 flex items-center gap-2">
                      <Fingerprint className="h-3 w-3" /> System ID
                    </span>
                    <span className="text-sm font-bold font-mono text-foreground/80">{report.id}</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/5 hidden md:block" />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 flex items-center gap-2">
                      <Calendar className="h-3 w-3" /> Logged At
                    </span>
                    <span className="text-sm font-bold text-foreground/80">
                      {report.createdAt &&
                        new Date(Number(report.createdAt)).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                    </span>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-destructive/10 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight italic">Incident Report</h2>
                  </div>
                  <div className="p-8 bg-secondary/10 rounded-[2rem] border border-white/5">
                    <p className="text-lg md:text-2xl font-bold leading-relaxed text-foreground/90 italic">&quot;{report.reason}&quot;</p>
                  </div>
                </div>

                {/* Status Specific Section */}
                <AnimatePresence mode="wait">
                  {report.status === 'RESOLVED' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tight italic">Resolution Detail</h2>
                      </div>
                      <div className="p-8 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 shadow-inner">
                        <p className="text-base md:text-xl font-medium leading-relaxed text-emerald-500/80">
                          {report.resolveMessage || 'Action taken by automated safety protocol.'}
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-emerald-500/40">
                          <Calendar className="h-3 w-3" />
                          Resolved {report.resolvedAt && formatDistanceToNow(new Date(report.resolvedAt), { addSuffix: true })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center py-10 text-center gap-4">
                      <div className="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center animate-pulse">
                        <User className="h-8 w-8 text-amber-500/40" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-500/60 uppercase tracking-widest">Pending Review</h3>
                        <p className="text-xs font-medium text-muted-foreground/40 max-w-[280px] mt-2">
                          Our safety team is currently analyzing this incident to ensure platform integrity.
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer System Info */}
      <div className="px-12 py-6 border-t border-white/5 bg-secondary/5 flex items-center justify-center gap-10">
        <div className="flex items-center gap-2 opacity-30">
          <ShieldAlert className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">MeowFans Integrity Network</span>
        </div>
      </div>
    </div>
  );
}
