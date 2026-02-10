'use client';

import { Calendar, Fingerprint } from 'lucide-react';

interface ReportDetailMetaProps {
  id: string;
  createdAt: string;
}

export const ReportDetailMeta = ({ id, createdAt }: ReportDetailMetaProps) => {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-white/5">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 flex items-center gap-2">
          <Fingerprint className="h-3 w-3" /> System ID
        </span>
        <span className="text-sm font-bold font-mono text-foreground/80">{id}</span>
      </div>
      <div className="h-8 w-[1px] bg-white/5 hidden md:block" />
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30 flex items-center gap-2">
          <Calendar className="h-3 w-3" /> Logged At
        </span>
        <span className="text-sm font-bold text-foreground/80">
          {createdAt &&
            new Date(Number(createdAt)).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
        </span>
      </div>
    </div>
  );
};
