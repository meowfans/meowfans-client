'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerCreators } from '@/hooks/server/useServerCreators';
import { GetDefaultCreatorsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import { TrendingCreatorCard } from './TrendingCreatorCard';

interface TrendingCreatorsProps {
  initialCreators: GetDefaultCreatorsOutput[];
}

export function TrendingCreators({ initialCreators }: TrendingCreatorsProps) {
  const { creators, loadMore, hasMore, loading } = useServerCreators(
    {
      take: 40,
      sortBy: SortBy.VaultCount,
      orderBy: SortOrder.Desc
    },
    initialCreators
  );

  return (
    <div className="flex flex-1 flex-col gap-6 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-6xl mx-auto w-full pb-20">
      <div className="flex flex-col gap-4 px-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
            <Crown className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic truncate">Creator Rankings</h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] truncate">
              Engagement and fan growth
            </p>
          </div>
        </div>
      </div>
      <PageHandler isEmpty={!creators.length} isLoading={loading && !initialCreators.length}>
        <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {creators.map((creator, index) => (
                <TrendingCreatorCard key={creator.id} creator={creator} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
