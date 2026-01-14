'use client';

import { useCreator } from '@/hooks/context/useCreator';
import { GenericCard } from '@workspace/ui/globals/GenericCard';
import { formatText } from '@workspace/ui/lib/helpers';
import { BarChart3 } from 'lucide-react';

export const Overview = () => {
  const { creator } = useCreator();

  const stats = [
    { label: formatText(creator.totalSubscriber, 'Subscriber'), value: creator.totalSubscriber },
    { label: formatText(creator.followersCount, 'Follower'), value: creator.followersCount },
    { label: formatText(creator.totalPost, 'Total post'), value: creator.totalPost },
    { label: formatText(creator.totalPublicPost, 'Public post'), value: creator.totalPublicPost },
    { label: formatText(creator.totalExclusivePost, 'Exclusive post'), value: creator.totalExclusivePost },
    { label: formatText(creator.assetCount ?? 0, 'Asset'), value: creator.assetCount }
  ];

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
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
            <div className="text-xl font-semibold tabular-nums">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </GenericCard>
  );
};
