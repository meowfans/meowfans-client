'use client';

import { ReportStatus } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';

interface ReportsHeaderProps {
  reportStatus: ReportStatus;
  onStatusChange: (status: ReportStatus) => void;
}

export const ReportsHeader = ({ reportStatus, onStatusChange }: ReportsHeaderProps) => {
  return (
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
                onClick={() => onStatusChange(tab.toUpperCase() as ReportStatus)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
