'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { BarChart3 } from 'lucide-react';

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
};

export const Stats = () => {
  const { creator } = useCreator();
  return (
    <GenericCard
      title="Overview"
      description="Your profile performance at a glance"
      icon={BarChart3}
      iconClassName="bg-primary/10 text-primary"
      contentClassName="space-y-0"
      animationDelay={0.15}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.totalSubscriber)}</div>
          <div className="text-xs text-muted-foreground">Subscribers</div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.followersCount)}</div>
          <div className="text-xs text-muted-foreground">Followers</div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.totalPost)}</div>
          <div className="text-xs text-muted-foreground">Total Posts</div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.totalPublicPost)}</div>
          <div className="text-xs text-muted-foreground">Public Posts</div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.totalExclusivePost)}</div>
          <div className="text-xs text-muted-foreground">Exclusive Posts</div>
        </div>
        <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
          <div className="text-xl font-semibold tabular-nums">{formatNumber(creator.assetCount ?? 0)}</div>
          <div className="text-xs text-muted-foreground">Assets</div>
        </div>
      </div>
    </GenericCard>
  );
};
