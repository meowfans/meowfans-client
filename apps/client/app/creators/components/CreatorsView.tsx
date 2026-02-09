'use client';

import { useCreators } from '@/hooks/useCreators';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { CreatorCard } from './CreatorCard';

export function CreatorsView() {
  const { creators, loadMore, hasMore, loading } = useCreators({});

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loading />
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Ranking Creators</p>
      </div>
    );
  }

  if (!creators.length && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">No Creators Found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex-none p-6 pb-2">
        <h1 className="text-3xl font-bold tracking-tight">Explore Creators</h1>
        <p className="mt-1 text-muted-foreground">Discover and follow the best creators on MeowFans.</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-scroll" id="creators-scroll-wrapper">
        <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
          {creators.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
              <p>No creators found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          )}
          {loading && <Loading />}
        </InfiniteScrollManager>
      </div>
    </div>
  );
}
