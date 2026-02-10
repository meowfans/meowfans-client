'use client';

import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Sparkles, User } from 'lucide-react';

interface ReportDetailStatusProps {
  status: string;
  resolveMessage?: string | null;
  resolvedAt?: string | null;
}

export const ReportDetailStatus = ({ status, resolveMessage, resolvedAt }: ReportDetailStatusProps) => {
  return (
    <AnimatePresence mode="wait">
      {status === 'RESOLVED' ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight italic">Resolution Detail</h2>
          </div>
          <div className="p-8 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/10 shadow-inner">
            <p className="text-base md:text-xl font-medium leading-relaxed text-emerald-500/80">
              {resolveMessage || 'Action taken by automated safety protocol.'}
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-emerald-500/40">
              <Calendar className="h-3 w-3" />
              Resolved {resolvedAt && formatDistanceToNow(new Date(resolvedAt), { addSuffix: true })}
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
  );
};
