'use client';

import { WatchHistoryEntity, WatchHistoryType } from '@workspace/gql/generated/graphql';
import { useMemo } from 'react';
import { TYPE_CONFIG } from './history.config';

interface HistoryStatsProps {
  history: WatchHistoryEntity[];
}

export function HistoryStats({ history }: HistoryStatsProps) {
  const counts = useMemo(() => {
    return Object.values(WatchHistoryType).reduce(
      (acc, type) => {
        acc[type] = history.filter((h) => h.type === type).length;
        return acc;
      },
      {} as Record<WatchHistoryType, number>
    );
  }, [history]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.values(WatchHistoryType).map((type) => {
        const config = TYPE_CONFIG[type];
        const Icon = config.icon;
        return (
          <div
            key={type}
            className="p-5 rounded-2xl bg-secondary/10 border border-border/30 flex flex-col items-center justify-center text-center gap-2"
          >
            <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${config.bg}`}>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{config.label}s</span>
            <span className="text-xl font-black">{counts[type]}</span>
          </div>
        );
      })}
    </div>
  );
}
