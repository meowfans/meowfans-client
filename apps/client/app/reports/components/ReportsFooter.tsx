'use client';

import { AlertCircle } from 'lucide-react';

interface ReportsFooterProps {
  totalCount: number;
}

export const ReportsFooter = ({ totalCount }: ReportsFooterProps) => {
  return (
    <div className="px-12 py-6 border-t border-white/5 bg-secondary/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-muted-foreground/40" />
        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">End-to-end encrypted moderation logs</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">Total Reports</span>
          <span className="text-xs font-black italic">{totalCount}</span>
        </div>
      </div>
    </div>
  );
};
