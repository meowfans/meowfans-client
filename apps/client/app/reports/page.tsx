'use client';

import { useReports } from '@/hooks/useReports';
import { ReportStatus } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ReportsPage() {
  const [reportStatus, setReportStatus] = useState<ReportStatus>(ReportStatus.Pending);

  const { reports, loading, hasMore, loadMore, refresh } = useReports({
    take: 10,
    skip: 0,
    reportStatus
  });

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-none px-4 py-8 md:px-10 lg:px-12 bg-gradient-to-b from-destructive/5 to-transparent border-b border-white/5">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent italic uppercase">
              Transparency
            </h1>
            <p className="text-xs font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic">
              Monitoring community integrity & reports
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-secondary/20 p-1 rounded-full border border-white/5 flex gap-1">
              {['Pending', 'Resolved'].map((tab) => (
                <Button
                  key={tab}
                  variant={reportStatus === tab.toUpperCase() ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-full px-5 font-black uppercase text-[10px] tracking-widest h-8 transition-all"
                  onClick={() => setReportStatus(tab.toUpperCase() as ReportStatus)}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-y-scroll px-4 md:px-8 py-8 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto">
          <InfiniteScrollManager
            dataLength={reports.length}
            loading={loading}
            hasMore={hasMore}
            useWindowScroll={false}
            onLoadMore={loadMore}
          >
            {reports.length === 0 && !loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-secondary/30 backdrop-blur-md border border-white/5">
                  <ShieldAlert className="h-12 w-12 text-muted-foreground/20" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">System Clear</h2>
                <p className="mt-2 text-muted-foreground max-w-sm mx-auto text-sm font-medium leading-relaxed opacity-60">
                  No active reports found. Your community is thriving in safety.
                </p>
                <Button onClick={refresh} variant="link" className="mt-4 text-primary font-black uppercase tracking-widest text-xs">
                  Reload Logs
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence mode="popLayout">
                  {reports.map((report, idx) => (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link href={`/reports/${report.id}`}>
                        <Card className="group overflow-hidden border-none bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 rounded-[1.5rem] md:rounded-[2rem]">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center">
                              {/* Status Indicator */}
                              <div
                                className={`w-full md:w-2 h-2 md:h-auto self-stretch ${report.status === 'RESOLVED' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              />

                              <div className="flex-1 p-6 md:px-10 flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex flex-col gap-1 flex-1">
                                  <div className="flex items-center gap-3 mb-1">
                                    <Badge
                                      className={`rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-widest ${
                                        report.status === 'RESOLVED'
                                          ? 'bg-emerald-500/10 text-emerald-500'
                                          : 'bg-amber-500/10 text-amber-500'
                                      }`}
                                    >
                                      {report.status}
                                    </Badge>
                                    <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                                      {report.createdAt && formatDistanceToNow(new Date(Number(report.createdAt)), { addSuffix: true })}
                                    </span>
                                  </div>
                                  <h3 className="text-lg font-black tracking-tight text-foreground/90 leading-tight">{report.reason}</h3>
                                  {report.resolveMessage && (
                                    <div className="mt-3 flex items-start gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                                      <Sparkles className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                                      <p className="text-xs font-medium text-emerald-500/80 leading-relaxed italic">
                                        {report.resolveMessage}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-4 shrink-0">
                                  <div className="flex flex-col items-end hidden sm:flex">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 mb-0.5">
                                      Report ID
                                    </span>
                                    <span className="text-[10px] font-bold font-mono opacity-40">{report.id.split('-')[0]}</span>
                                  </div>
                                  <div className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                    <ChevronRight className="h-5 w-5" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {loading && reports.length > 0 && (
              <div className="py-20 flex flex-col items-center gap-4">
                <Loading />
                <p className="text-[10px] font-black italic text-muted-foreground/30 uppercase tracking-[0.4em]">Verifying Integrity...</p>
              </div>
            )}
          </InfiniteScrollManager>
        </div>
      </div>

      <div className="px-12 py-6 border-t border-white/5 bg-secondary/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-muted-foreground/40" />
          <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">End-to-end encrypted moderation logs</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Total Reports</span>
            <span className="text-xs font-black italic">{reports.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
