'use client';

import { PageHandler } from '@/components/PageHandler';
import { useServerVaultObjects } from '@/hooks/server/useServerVaultObjects';
import { GetPublicVaultObjectsOutput, SortBy, SortOrder } from '@workspace/gql/generated/graphql';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { AnimatePresence } from 'framer-motion';
import { Camera, Zap } from 'lucide-react';
import { TrendingPictureCard } from './TrendingPictureCard';

interface TrendingPicturesProps {
  initialVaultObjects: GetPublicVaultObjectsOutput[];
}

export function TrendingPictures({ initialVaultObjects }: TrendingPicturesProps) {
  const { vaultObjects, loadMore, hasMore, loading } = useServerVaultObjects(
    {
      take: 30,
      sortBy: SortBy.VaultObjectLikeCount,
      orderBy: SortOrder.Desc
    },
    initialVaultObjects
  );

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 p-3 md:p-8 pt-4 md:pt-0 max-w-7xl mx-auto w-full pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 w-10 md:h-14 md:w-14 rounded-[0.75rem] md:rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center border border-blue-500/20 rotate-3 flex-shrink-0">
            <Camera className="h-5 w-5 md:h-7 md:w-7 text-blue-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent truncate">
              Trending Gallery
            </h1>
            <p className="text-muted-foreground text-[10px] md:text-sm font-medium uppercase tracking-[0.2em] mt-0.5 md:mt-1 flex items-center gap-2">
              <Zap className="h-3 w-3 text-primary fill-primary flex-shrink-0" />
              <span className="truncate">Most loved captures this week</span>
            </p>
          </div>
        </div>
      </div>

      <PageHandler isEmpty={!vaultObjects.length} isLoading={loading && !initialVaultObjects.length}>
        <InfiniteScrollManager dataLength={vaultObjects.length} loading={loading} hasMore={hasMore} useWindowScroll onLoadMore={loadMore}>
          <div className="columns-1 min-[450px]:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 px-1">
            <AnimatePresence mode="popLayout">
              {vaultObjects.map((item, index) => (
                <TrendingPictureCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-20">
              <Loading />
            </div>
          )}
        </InfiniteScrollManager>
      </PageHandler>
    </div>
  );
}
