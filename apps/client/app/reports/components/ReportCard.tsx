'use client';

import { ReportsEntity } from '@workspace/gql/generated/graphql';
import { Badge } from '@workspace/ui/components/badge';
import { Card, CardContent } from '@workspace/ui/components/card';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ReportCardProps {
  report: ReportsEntity;
  index: number;
}

export const ReportCard = ({ report, index }: ReportCardProps) => {
  return (
    <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
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
                        report.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
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
                      <p className="text-xs font-medium text-emerald-500/80 leading-relaxed italic">{report.resolveMessage}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30 mb-0.5">Report ID</span>
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
  );
};
