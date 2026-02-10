'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReportDetailHeaderProps {
  status: string;
}

export const ReportDetailHeader = ({ status }: ReportDetailHeaderProps) => {
  const router = useRouter();

  return (
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
          status === 'RESOLVED'
            ? 'bg-emerald-500 text-emerald-foreground shadow-emerald-500/20'
            : 'bg-amber-500 text-amber-foreground shadow-amber-500/20'
        }`}
      >
        {status}
      </Badge>
    </div>
  );
};
