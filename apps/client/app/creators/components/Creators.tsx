'use client';

import { PageHandler } from '@/components/PageHandler';
import { useCreators } from '@/hooks/useCreators';
import { InfiniteScrollManager } from '@workspace/ui/globals/InfiniteScrollManager';
import { Loading } from '@workspace/ui/globals/Loading';
import { CreatorCard } from './CreatorCard';
import { CreatorsHeader } from './CreatorsHeader';

export function Creators() {
  const { creators, loadMore, hasMore, loading, isEmpty } = useCreators({});

  return (
    <PageHandler isLoading={loading} isEmpty={isEmpty}>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <CreatorsHeader />
        <div className="flex-1 min-h-0 overflow-y-scroll" id="creators-scroll-wrapper">
          <InfiniteScrollManager dataLength={creators.length} loading={loading} hasMore={hasMore} onLoadMore={loadMore} useWindowScroll>
            <div className="grid grid-cols-1 gap-6 p-6 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
            {loading && <Loading />}
          </InfiniteScrollManager>
        </div>
      </div>
    </PageHandler>
  );
}
