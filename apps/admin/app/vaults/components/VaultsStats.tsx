'use client';

import { GetAllObjectsCountOutput } from '@workspace/gql/generated/graphql';
import { CheckCircle2, Clock, ShieldCheck, XCircle } from 'lucide-react';
import React from 'react';

interface VaultsStatsProps {
 objectsCount: GetAllObjectsCountOutput;
}

export function VaultsStats({ objectsCount }: VaultsStatsProps) {
 return (
 <div className="flex flex-wrap gap-2 md:gap-3 shrink-0">
  <StatItem
  label="Pending"
  count={objectsCount.pending || 0}
  icon={<Clock className="h-3.5 w-3.5 text-amber-500"/>}
  className="bg-amber-500/5 border-amber-500/10"
  />
  <StatItem
  label="Processing"
  count={objectsCount.processing || 0}
  icon={<ShieldCheck className="h-3.5 w-3.5 text-blue-500"/>}
  className="bg-blue-500/5 border-blue-500/10"
  />
  <StatItem
  label="Fulfilled"
  count={objectsCount.fulfilled || 0}
  icon={<CheckCircle2 className="h-3.5 w-3.5 text-green-500"/>}
  className="bg-green-500/5 border-green-500/10"
  />
  <StatItem
  label="Rejected"
  count={objectsCount.rejected || 0}
  icon={<XCircle className="h-3.5 w-3.5 text-destructive"/>}
  className="bg-destructive/5 border-destructive/10"
  />
 </div>
 );
}

function StatItem({ label, count, icon, className }: { label: string; count: number; icon: React.ReactNode; className?: string }) {
 return (
 <div className={`flex items-center gap-2 md:gap-3 px-3 py-1.5 rounded-full border transition-all hover:bg-background/50 ${className}`}>
  <div className="shrink-0">{icon}</div>
  <div className="flex items-center gap-2">
  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{label}</span>
  <span className="text-xs md:text-sm font-black font-mono leading-none">{count}</span>
  </div>
 </div>
 );
}
