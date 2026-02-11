'use client';

import { useServerSingleReport } from '@/hooks/server/useServerSingleReport';
import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Loading } from '@workspace/ui/globals/Loading';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReportDetailHeader } from './ReportDetailHeader';
import { ReportDetailIncident } from './ReportDetailIncident';
import { ReportDetailMeta } from './ReportDetailMeta';
import { ReportDetailStatus } from './ReportDetailStatus';

interface ReportDetailProps {
  initialReport: ReportsEntity | null;
}

export function ReportDetail({ initialReport }: ReportDetailProps) {
  const router = useRouter();
  const { report, loading } = useServerSingleReport(initialReport?.id as string, initialReport);

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
          <ReportDetailHeader status={report.status} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="overflow-hidden border border-white/5 bg-secondary/[0.03] backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2.5rem] md:rounded-[3.5rem]">
              <CardContent className="p-8 md:p-14">
                <ReportDetailMeta id={report.id} createdAt={report.createdAt} />
                <ReportDetailIncident reason={report.reason} />
                <ReportDetailStatus status={report.status} resolveMessage={report.resolveMessage} resolvedAt={report.resolvedAt} />
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
