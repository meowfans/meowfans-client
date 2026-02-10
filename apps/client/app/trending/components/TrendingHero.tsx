'use client';

import { Badge } from '@workspace/ui/components/badge';
import { Flame } from 'lucide-react';

export function TrendingHero() {
  return (
    <div className="relative group overflow-hidden rounded-[3rem] bg-secondary/10 border border-border/50 p-8 md:p-12">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Flame className="h-40 w-40 text-primary rotate-12" />
      </div>
      <div className="relative z-10 space-y-4 max-w-xl">
        <Badge className="bg-primary/10 text-primary border-none text-[10px] px-4 py-1.5 rounded-full ring-1 ring-primary/20">
          Updated 5m ago
        </Badge>
        <h1 className="text-4xl md:text-6xl leading-none">
          Wha&apos;s <span className="text-primary italic">Hot</span> Today
        </h1>
        <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">
          The most engaged creators, viral posts, and exclusive captures trending across the MeowFans universe right now.
        </p>
      </div>
    </div>
  );
}
