'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerVaults } from '@/hooks/server/useServerVaults';
import { GetPublicVaultsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { Button } from '@workspace/ui/components/button';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { ArrowRight, Box, Trophy } from 'lucide-react';
import Link from 'next/link';
import { TrendingVaultCard } from './TrendingVaultCard';

interface TrendingVaultsProps {
  initialVaults: GetPublicVaultsOutput[];
}

export function TrendingVaults({ initialVaults }: TrendingVaultsProps) {
  const { vaults, loadMore, hasMore, loading } = useServerVaults(
    {
      take: 30,
      sortBy: SortBy.VaultViewCount,
      orderBy: SortOrder.Desc
    },
    initialVaults
  );

  return (
    <div className="flex flex-1 flex-col gap-8 p-3 md:p-12 pt-6 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-8 md:pb-12 px-1">
        <div className="space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/20">
            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Global Leaderboard</span>
          </div>
          <h1 className="text-3xl md:text-7xl leading-none truncate">
            Trending <span className="text-muted-foreground/30 italic">Vaults</span>
          </h1>
          <p className="text-muted-foreground max-w-lg font-medium leading-relaxed text-xs md:text-base">
            Exclusive collections curating the highest engagement from our creators.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
            <Box className="h-3 w-3 md:h-4 md:w-4" /> 2,492 Total Collections
          </div>
          <Button
            asChild
            className="w-full md:w-auto rounded-full bg-foreground text-background font-black text-[10px] md:text-xs uppercase tracking-widest px-6 md:px-8 group h-9 md:h-11"
          >
            <Link href={'/vaults'}>
              Explore All <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <PageHandler isEmpty={!vaults.length} isLoading={loading && !initialVaults.length}>
        <InfiniteScrollManager dataLength={vaults.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-1">
            <AnimatePresence mode="popLayout">
              {vaults.map((vault, index) => (
                <TrendingVaultCard key={vault.id} vault={vault} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
