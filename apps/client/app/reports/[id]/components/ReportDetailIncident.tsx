'use client';

import { FileText } from 'lucide-react';

interface ReportDetailIncidentProps {
  reason: string;
}

export const ReportDetailIncident = ({ reason }: ReportDetailIncidentProps) => {
  return (
    <div className="space-y-6 mb-12">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-destructive/10 rounded-xl flex items-center justify-center">
          <FileText className="h-5 w-5 text-destructive" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight italic">Incident Report</h2>
      </div>
      <div className="p-8 bg-secondary/10 rounded-[2rem] border border-white/5">
        <p className="text-lg md:text-2xl font-bold leading-relaxed text-foreground/90 italic">&quot;{reason}&quot;</p>
      </div>
    </div>
  );
};
